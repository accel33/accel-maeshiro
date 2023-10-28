import { Request, Response } from 'express';

import { Usuario } from '../entities/Usuario';
import { Pedido } from '../entities/Pedido';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';

// @desc Obtener todo los Usuarios
// @ruta GET /usuarios
// @acceso Privado
const obtenerTodosLosUsuarios = asyncHandler(async (req: any, res: any) => {
  const usuarios = await Usuario.find();
  if (!usuarios?.length) {
    return res.status(400).json({ message: 'Usuarios no encontrados' });
  }
  res.json(usuarios);
});

// @desc Obtener un Usuarios
// @ruta GET /usuarios/:id
// @acceso Privado
const obtenerUsuario = asyncHandler(async (req: any, res: any) => {
  const usuarios = await Usuario.find();
  if (!usuarios?.length) {
    return res.status(400).json({ message: 'Usuarios no encontrados' });
  }
  res.json(usuarios);
});

// @desc Crear un Usuario
// @ruta POST /usuarios
// @acceso Privado
const crearUsuario = asyncHandler(async (req: any, res: any) => {
  console.log('Crear Usuario');
});

// @desc Actualizar un Usuario
// @ruta PATCH /usuarios/:id
// @acceso Privado
const actualizarUsuario = asyncHandler(async (req: Request, res: Response) => {
  console.log('Actualizar Usuario');
});

// @desc Borrar un Usuario
// @ruta DELETE /usuarios/:id
// @acceso Privado
const borrarUsuario = asyncHandler(async (req: Request, res: Response) => {
  console.log('Borrar usuario');
});

export {
  obtenerTodosLosUsuarios,
  actualizarUsuario,
  crearUsuario,
  borrarUsuario,
};
