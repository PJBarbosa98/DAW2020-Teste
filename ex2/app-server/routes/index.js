var express = require('express');
var router = express.Router();

var axios = require('axios');

var username = 'daw2020@teste.uminho.pt';
var password = '232';
var base_url = 'http://clav-api.di.uminho.pt/v2/';

router.get('/', (req, res) => {
	res.render('index', { title: 'Ecrã Principal' });
});

router.get('/classes', (req, res) => {
	axios.post(base_url + 'users/login',
		{
			"username": username,
			"password": password
		})
		.then(info => {
			var token = info.data.token;
			axios.get(base_url + 'classes?nivel=1&token=' + token)
				.then(dados => {
					res.render('lista_classes', { title: 'Lista de Classes', lista: dados.data });
				})
				.catch(erro => console.log('Não consegui obter os dados!\n' + erro));
		})
		.catch(erro => {
			console.log('Não foi possível fazer login! ' + erro);
		});
});

router.get('/classes/:id', (req, res) => {
	axios.post(base_url + 'users/login',
		{
			"username": username,
			"password": password
		})
		.then(info => {
			var token = info.data.token;
			// Informação base da Classe
			// Lista dos seus descendentes (caso existam, ou seja, se nivel != 3)
			// Se nivel == 3, lista dos seus termos de índice
			// (por via de uma ligação à página que lista os termos de índice).
			var classe_url = base_url + 'classes/c' + req.params.id;
			axios.all([
					axios.get(classe_url + '?token=' + token),
					axios.get(classe_url + '/descendencia?token=' + token)
				])
				.then(axios.spread((classe, desc) => {
					res.render('classe_ind', {
						title: 'Página de uma classe',
						classe: classe.data,
						desc: desc.data
					});					
				}))
				.catch(err => res.render('error', { error: err }));
		})
		.catch(erro => {
			console.log('Não foi possível fazer login! ' + erro);
		});
});

router.get('/termosInd', (req, res) => {
	axios.post(base_url + 'users/login',
		{
			"username": username,
			"password": password
		})
		.then(info => {
			var token = info.data.token;
			axios.get(base_url + 'termosIndice?token=' + token)
				.then(dados => {
					res.render('lista_ti', {
						title: 'Lista de Termos de Índice',
						lista: dados.data
					});
				})
				.catch(erro => console.log('Não consegui obter os dados!\n' + erro));
		})
		.catch(erro => {
			console.log('Não foi possível fazer login! ' + erro);
		});
});

router.get('/termosInd/:id', (req, res) => {
	axios.post(base_url + 'users/login',
		{
			"username": username,
			"password": password
		})
		.then(info => {
			var token = info.data.token;
			axios.get(base_url + 'termosIndice?token=' + token)
				.then(dados => {
					var termo_ind = dados.data.find(elem => elem.id == req.params.id);
					res.render('ti_ind', {
						title: 'Termo de Índice',
						ti: termo_ind
					});
				})
				.catch(erro => console.log('Não consegui obter os dados!\n' + erro));
		})
		.catch(erro => {
			console.log('Não foi possível fazer login! ' + erro);
		});
});

module.exports = router;
