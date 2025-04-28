const mongoose = require('mongoose');

const DietaSchema = new mongoose.Schema({
    
      nome: { type: String, required: true },
      data_inicio: { type: Date, required: true },
      descricao: { type: String },
      calorias_totais: { type: Number },
      proteinas_totais: { type: Number },
      carbo_totais: { type: Number },
      gordura_totais: { type: Number },
    
      // Chave estrangeira: id do usuário
      id_usu: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    
      // Chave estrangeira: id do treinador
      id_treinador: { type: mongoose.Schema.Types.ObjectId, ref: 'Treinador' }
    });
    
    module.exports = mongoose.model('Dieta', dietaSchema);
    
;

module.exports = mongoose.model('Dieta', DietaSchema);