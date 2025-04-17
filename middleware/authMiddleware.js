import { jwtVerify } from 'jose';

module.exports = async function (req, res, next) { // Adicionado 'async'
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'Sem token, acesso negado' });

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const { payload } = await jwtVerify(token, secret, {
      algorithms: ['HS256'],
    });
    
    req.user = payload;
    next(); // Adicionado para passar o controle
  } catch (error) {
    return res.status(401).json({ msg: 'Token inválido' }); // Tratamento de erro
  }
};