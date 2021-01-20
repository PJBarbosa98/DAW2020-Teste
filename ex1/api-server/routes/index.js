var express = require('express');
var router = express.Router();

var batismo = require('../controllers/batismo');

router.get('/api/batismos', (req, res) => {
	if (!/\?.+/.test(req.url)) {
		batismo
			.listar()
			.then(data => res.jsonp({ data: data }))
			.catch(err => res.status(500).jsonp({ error: err }));
	}
	else {
		if (req.query.ano) {
			batismo
				.por_ano(req.query.ano)
				.then(data => res.jsonp({ data: data }))
				.catch(err => res.status(500).jsonp({ error: err }));
		}
	}
});

router.get('/api/batismos/batisado', (req, res) => {
	batismo
		.listar()
		.then(data => {
			var nomes = [];
			data.forEach((registo) => {
				var nome = registo.title.split(':')[1].split('.')[0].trim()
				if (!nomes.includes(nome)) {
					nomes.push(nome);
				}
			});
			res.send(nomes.sort(Intl.Collator().compare));
		})
		.catch(err => res.status(500).jsonp({ error: err }));
});

router.get('/api/batismos/progenitores', (req, res) => {
	batismo
		.progenitores()
		.then(data => res.jsonp({ data: data }))
		.catch(err => res.status(500).jsonp({ error: err }));
});

router.get('/api/batismos/stats', (req, res) => {
	batismo
		.listar()
		.then(data => {
			var batismos_por_ano = {};
			data.forEach((registo) => {
				var ano = registo.date.split('/')[0].split('-')[0].trim();
				if (batismos_por_ano[ano] == null) {
					batismos_por_ano[ano] = 1;
				}
				else {
					batismos_por_ano[ano] = batismos_por_ano[ano] + 1; 
				}
			});
			res.jsonp(batismos_por_ano);
		})
		.catch(err => res.status(500).jsonp({ error: err }));
});

router.get('/api/batismos/:id', (req, res) => {
	batismo
		.batismo_por_id(req.params.id)
		.then(data => res.jsonp({ data: data }))
		.catch(err => res.status(500).jsonp({ error: err }));
});

module.exports = router;
