import jwt from 'jsonwebtoken';

export default function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'Token ausente, acesso negado' });

  try {
    const decodificado = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodificado;
    next();
  } catch {
    res.status(400).json({ msg: 'Token inválido' });
  }
}