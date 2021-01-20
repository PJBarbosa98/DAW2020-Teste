var batismo = require('../models/batismo');

module.exports.listar = () => {
	return batismo
		.find({}, { _id: 1, date: 1, title: 1, ref: 1 })
		.sort({ date: 1 })
		.exec();
};

module.exports.batismo_por_id = ( bid ) => {
	return batismo
		.find({ _id: bid })
		.exec();
};

module.exports.progenitores = () => {
	return batismo
		.find({}, { _id: 1, pai: 1, mae: 1 })
		.sort()
		.exec();
};

module.exports.por_ano = ( ano ) => {
	return batismo
		.find(
			{ date: { $regex: '.*' + ano + '*.' } },
			{ _id: 1, date: 1, title: 1, ref: 1 }
		)
		.sort({ date: 1 })
		.exec();
};
