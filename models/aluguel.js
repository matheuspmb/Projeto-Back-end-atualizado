const mongoose = require('mongoose');

const aluguelSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  filme: { type: mongoose.Schema.Types.ObjectId, ref: 'Filme', required: true },
  dataInicio: { type: Date, required: true },
  dataFim: { type: Date, required: true },
});

const Aluguel = mongoose.model('Aluguel', aluguelSchema);

module.exports = Aluguel;
