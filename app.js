// app.js
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import helmet from 'helmet';
import cors from 'cors';
import rateLimiter from './middleware/rateLimiter.js';

import usuarioRoutes from './routes/usuarioRoutes.js';
import treinadorRoutes from './routes/treinadorRoutes.js';
import exercicioRoutes from './routes/exerciciosRoutes.js';
import treinoRoutes from './routes/treinoRoutes.js';
import alimentoRoutes from './routes/alimentoRoutes.js';
import dietaRoutes from './routes/dietaRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch(err => console.error('❌ Erro ao conectar ao MongoDB:', err));

app.use(helmet());
app.use(cors());
app.use(rateLimiter);
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/treinadores', treinadorRoutes);
app.use('/api/exercicios', exercicioRoutes);
app.use('/api/treinos', treinoRoutes);
app.use('/api/alimentos', alimentoRoutes);
app.use('/api/dietas', dietaRoutes);

app.get('/', (req, res) => {
  res.send('IronTrack API rodando 🚀');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
