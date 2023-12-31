import { Request, Response } from 'express';
import { Usuario } from '../entities/Usuario';
import asyncHandler from 'express-async-handler';
import { UsuarioDto } from '../dto/UsuarioDto';
import { validatorDto } from '../dto/ValidatorDto';
import bcrypt from 'bcrypt';
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
    const { password } = req.body;

    const err = await validatorDto(UsuarioDto, req.body);
    if (err) {
      return res.json({
        message: `Error de validacion: ${err}`,
      });
    }

    const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

    const nuevoUsuario = await Usuario.create(req.body);
    nuevoUsuario.password = hashedPwd;

    const result = await Usuario.save(nuevoUsuario);
    if (!result) {
      return res.status(400).json({ message: 'Usuario no guardado' });
    }

    res.json({ message: 'Usuario creado' });
  }
);

// @desc Obtener un Usuarios
// @ruta GET /usuarios/:id
// @acceso Privado
const obtenerUsuario = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const usuario = await Usuario.findOneBy({
      codigoTrabajador: req.params.id,
    });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuario);
  }
);

// @desc Actualizar un Usuario
// @ruta PATCH /usuarios/:id
// @acceso Privado
const actualizarUsuario = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { nombre, email, password, telefono, rol, puesto } = req.body;

    const err = await validatorDto(UsuarioDto, req.body);
    if (err) {
      return res.json({
        message: `Error de validacion: ${err}`,
      });
    }

    const usuario = await Usuario.findOneBy({
      codigoTrabajador: req.params.id,
    });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    usuario.nombre = nombre;
    usuario.email = email;
    usuario.password = password;
    usuario.telefono = telefono;
    usuario.rol = rol;
    usuario.puesto = puesto;
    if (password) {
      // Hash password
      usuario.password = await bcrypt.hash(password, 10); // salt rounds
    }

    const result = await Usuario.save(usuario);
    if (!result) {
      return res.status(400).json({ message: 'Usuario no actualizado' });
    }

    res.json({ message: 'Usuario actualizado' });
  }
);

// @desc Borrar un Usuario
// @ruta DELETE /usuarios/:id
// @acceso Privado
const borrarUsuario = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const usuario = await Usuario.delete(req.params.id);
    if (!usuario) {
      return res.status(400).json({ message: 'Usuario no guardado' });
    }

    res.json({ message: 'Usuario borrado' });
  }
);

export {
  obtenerTodosLosUsuarios,
  actualizarUsuario,
  crearUsuario,
  borrarUsuario,
  obtenerUsuario,
};
