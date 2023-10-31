import { Request, Response } from 'express';
import { Producto } from '../entities/Producto';
import asyncHandler from 'express-async-handler';
import { ProductoDto } from '../dto/ProductoDto';
import { validatorDto } from '../dto/ValidatorDto';
// import { AppDataSource } from '../config/data-source';
// const productoRepository = AppDataSource.getRepository(Producto);

// @desc Obtener todo los Productos
// @ruta GET /productos
// @acceso Privado
const obtenerTodosLosProductos = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const productos = await Producto.find();

    if (!productos?.length) {
      return res.status(400).json({ message: 'Productos no encontrados' });
    }
    res.json(productos);
  }
);

// @desc Crear un Producto
// @ruta POST /producto
// @acceso Privado
const crearProducto = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const err = await validatorDto(ProductoDto, req.body);
    if (err) {
      return res.json({
        message: `Error de validacion: ${err}`,
      });
    }
    const nuevoProducto = await Producto.create(req.body);
    const result = await Producto.save(nuevoProducto);

    res.json({ message: 'Producto creado' });
  }
);

// @desc Obtener un Productos
// @ruta GET /producto/:id
// @acceso Privado
const obtenerProducto = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const producto = await Producto.findOneBy({
      sku: req.params.id,
    });
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(producto);
  }
);

// @desc Actualizar un Producto
// @ruta PATCH /producto/:id
// @acceso Privado
const actualizarProducto = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { nombre, tipo, etiquetas, precio, unidadMedida } = req.body;

    const err = await validatorDto(ProductoDto, req.body);
    if (err) {
      return res.json({
        message: `Error de validacion: ${err}`,
      });
    }

    const producto = await Producto.findOneBy({
      sku: req.params.id,
    });
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    producto.nombre = nombre;
    producto.tipo = tipo;
    producto.etiquetas = etiquetas;
    producto.precio = precio;
    producto.unidadMedida = unidadMedida;

    const result = await Producto.save(producto);
    if (!result) {
      return res.status(400).json({ message: 'Producto no actualizado' });
    }

    res.json({ message: 'Producto actualizado' });
  }
);

// @desc Borrar un Producto
// @ruta DELETE /producto/:id
// @acceso Privado
const borrarProducto = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const producto = await Producto.delete(req.params.id);
    if (!producto) {
      return res.status(400).json({ message: 'Producto no guardado' });
    }

    res.json({ message: 'Producto borrado' });
  }
);

export {
  obtenerTodosLosProductos,
  actualizarProducto,
  crearProducto,
  borrarProducto,
  obtenerProducto,
};
