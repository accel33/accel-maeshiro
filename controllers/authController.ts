import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Usuario } from '../entities/Usuario';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    // Verificacion de Usuario y Contraseña
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Debe ingresar todos los campos' });
    }
    const usuario = await Usuario.findOneBy({
      email: email,
    });

    const match = await bcrypt.compare(password, usuario?.password!);
    if (!match) {
      return res.status(401).json({ message: 'Error con la contraseña' });
    }

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: usuario?.nombre,
          roles: usuario?.rol,
        },
      },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: '20s' }
    );
    const refreshToken = jwt.sign(
      { username: usuario?.nombre },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: '1m' }
    );
    // Crea cookie segura con el refresh token
    res.cookie('jwt', refreshToken, {
      httpOnly: true, // accesible solo por servidor web
      secure: true, // https
      sameSite: 'none', // cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiracion: igual que el del refresh token
    });
    // Envia access token conteniendo username y roles
    res.json({ accessToken });

    res.status(200).json({ message: 'Usuario autorizado' });
  }
);

// @desc Refresh
// @route POST /auth/refresh
// @access Public
const refresher = async (req: Request, res: Response): Promise<any> => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(401).json({ message: 'No Autorizado' });
  }
  const refreshToken = cookies.jwt;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET!,
    async (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ message: 'Prohibido' });
      }

      const usuarioEncontrado = await Usuario.findOneBy({
        email: decoded.email,
      });
      if (!usuarioEncontrado) {
        return res
          .status(401)
          .json({ message: 'Error con el nombre de usuario' });
      }

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: usuarioEncontrado.username,
            roles: usuarioEncontrado.rol,
          },
        },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: '1m' }
      );
      res.json({ accessToken });
    }
  );
};

// @desc Logout
// @route POST /auth/logout
// @access Public - Solo para liberar la Cookie si existe
const logout = async (req: Request, res: Response): Promise<any> => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // Sin contenido
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
  res.json({ message: 'Cookie liberada' });
};

export { login, logout, refresher };
