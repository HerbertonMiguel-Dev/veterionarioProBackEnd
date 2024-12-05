import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
  sub: string;
}

export function addUsuarioIdToQuery(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ error: "Token de autenticação não fornecido." });
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload;
    // Adiciona o usuário autenticado aos query params
    request.query.usuario_id = sub;

    return next();
  } catch (err) {
    return response.status(401).json({ error: "Token de autenticação inválido." });
  }
}
