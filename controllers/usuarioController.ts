import { Request, Response } from 'express';
import { Usuario } from '../entities/Usuario';
import asyncHandler from 'express-async-handler';
import { UsuarioDto } from '../dto/UsuarioDto';
import { validatorDto } from '../dto/ValidatorDto';
// import { AppDataSource } from '../config/data-source';
// const usuarioRepository = AppDataSource.getRepository(Usuario);

// @desc Obtener todo los Usuarios
// @ruta GET /usuarios
// @acceso Privado
const obtenerTodosLosUsuarios = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const usuarios = await Usuario.find();
    if (!usuarios?.length) {
      return res.status(400).json({ message: 'Usuarios no encontrados' });
    }
    res.json(usuarios);
  }
);

// @desc Crear un Usuario
// @ruta POST /usuarios
// @acceso Privado
const crearUsuario = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    console.log('Crear Usuario');
    console.log('body', req.body);

    const err = await validatorDto(UsuarioDto, req.body);
    if (err) {
      return res.json({
        message: `Error de validacion: ${err}`,
      });
    }
    const nuevoUsuario = await Usuario.create(req.body);
    const result = await Usuario.save(nuevoUsuario);

    res.json({
      message: 'success',
      payload: result,
    });
  }
);

// @desc Obtener un Usuarios
// @ruta GET /usuarios/:id
// @acceso Privado
const obtenerUsuario = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    console.log('Obtener Usuario');
    console.log('called');
    console.log(req.params.id);

    const usuario = await Usuario.findOneBy({
      codigo_de_trabajador: req.params.id,
    });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({
      message: 'success',
      payload: usuario,
    });
  }
);

// @desc Actualizar un Usuario
// @ruta PATCH /usuarios/:id
// @acceso Privado
const actualizarUsuario = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    console.log('Actualizar Usuario');

    const err = await validatorDto(UsuarioDto, req.body);
    if (err) {
      return res.json({
        message: `Error de validacion: ${err}`,
      });
    }

    const usuario = await Usuario.findOneBy({
      codigo_de_trabajador: req.params.id,
    });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const result = await Usuario.save(usuario);
    if (!result) {
      return res.status(400).json({ message: 'Usuario no actualizado' });
    }

    res.json({
      message: 'success',
      payload: result,
    });
  }
);

// @desc Borrar un Usuario
// @ruta DELETE /usuarios/:id
// @acceso Privado
const borrarUsuario = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    console.log('Borrar usuario');

    const usuario = await Usuario.delete(req.params.id);
    if (!usuario) {
      return res.status(400).json({ message: 'Usuario no guardado' });
    }

    res.json({
      message: 'success',
    });
  }
);

export {
  obtenerTodosLosUsuarios,
  actualizarUsuario,
  crearUsuario,
  borrarUsuario,
  obtenerUsuario,
};
