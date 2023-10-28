import { Request, Response } from 'express';
import { Usuario } from '../entities/Usuario';
import asyncHandler from 'express-async-handler';
import { AppDataSource } from '../config/data-source';
const usuarioRepository = AppDataSource.getRepository(Usuario);

// @desc Obtener todo los Usuarios
// @ruta GET /usuarios
// @acceso Privado
const obtenerTodosLosUsuarios = asyncHandler(async (req: any, res: any) => {
  const usuarios = await usuarioRepository.find();
  if (!usuarios?.length) {
    return res.status(400).json({ message: 'Usuarios no encontrados' });
  }
  res.json(usuarios);
});

// @desc Obtener un Usuarios
// @ruta GET /usuarios/:id
// @acceso Privado
const obtenerUsuario = asyncHandler(async (req: any, res: any) => {
  console.log('Obtener Usuario');
  console.log('called');
  console.log(req.params.id);
  // const id = req.params.id;
  const user = await usuarioRepository.findOne({
    where: { codigo_de_trabajador: req.params.id },
  });
  res.json({
    message: 'success',
    payload: user,
  });
});

// @desc Crear un Usuario
// @ruta POST /usuarios
// @acceso Privado
const crearUsuario = asyncHandler(async (req: any, res: any) => {
  console.log('Crear Usuario');
  console.log('body', req.body);
  const user = await usuarioRepository.create(req.body);
  const results = await usuarioRepository.save(user);

  res.json({
    message: 'success',
    payload: results,
  });
});

// @desc Actualizar un Usuario
// @ruta PATCH /usuarios/:id
// @acceso Privado
const actualizarUsuario = asyncHandler(async (req: Request, res: Response) => {
  console.log('Actualizar Usuario');
  // const user = await usuarioRepository.findOne(req.params.id);
  // usuarioRepository.merge(user, req.body);
  // const result = await usuarioRepository.save(user);
  // res.json({
  //   message: 'success',
  //   payload: result,
  // });
});

// @desc Borrar un Usuario
// @ruta DELETE /usuarios/:id
// @acceso Privado
const borrarUsuario = asyncHandler(async (req: Request, res: Response) => {
  console.log('Borrar usuario');
  const user = await usuarioRepository.delete(req.params.id);
  res.json({
    message: 'success',
  });
});

export {
  obtenerTodosLosUsuarios,
  actualizarUsuario,
  crearUsuario,
  borrarUsuario,
};
