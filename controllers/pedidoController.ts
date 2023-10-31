import { Request, Response } from 'express';
import { Pedido } from '../entities/Pedido';
import asyncHandler from 'express-async-handler';
import { PedidoDto } from '../dto/PedidoDto';
import { validatorDto } from '../dto/ValidatorDto';
// import { AppDataSource } from '../config/data-source';
// const pedidoRepository = AppDataSource.getRepository(Pedido);

// @desc Obtener todo los Pedidos
// @ruta GET /pedido
// @acceso Privado
const obtenerTodosLosPedidos = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const pedidos = await Pedido.find({
      // relations: ['vendedor', 'repartidor'],
      relations: ['vendedor', 'repartidor', 'productos'],
    });
    if (!pedidos?.length) {
      return res.status(400).json({ message: 'Pedidos no encontrados' });
    }
    res.json(pedidos);
  }
);

// @desc Crear un Pedido
// @ruta POST /pedido
// @acceso Privado
const crearPedido = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const err = await validatorDto(PedidoDto, req.body);
    if (err) {
      return res.json({
        message: `Error de validacion: ${err}`,
      });
    }

    const guardarPedido = await Pedido.create(req.body);

    const result = await Pedido.save(guardarPedido);
    if (!result) {
      return res.status(400).json({ message: 'Pedido no guardado' });
    }

    res.json({ message: 'Pedido creado' });
  }
);

// @desc Obtener un Pedidos
// @ruta GET /pedido/:id
// @acceso Privado
const obtenerPedido = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const pedido = await Pedido.findOneBy({
      numero_de_pedido: req.params.id,
    });
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    res.json(pedido);
  }
);

// @desc Actualizar un Pedido
// @ruta PATCH /pedido/:id
// @acceso Privado
const actualizarPedido = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    console.log('Actualizar Pedido');

    const err = await validatorDto(PedidoDto, req.body);
    if (err) {
      return res.json({
        message: `Error de validacion: ${err}`,
      });
    }

    const pedido = await Pedido.findOneBy({
      numero_de_pedido: req.params.id,
    });
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    const result = await Pedido.save(pedido);
    if (!result) {
      return res.status(400).json({ message: 'Pedido no actualizado' });
    }

    res.json({ message: 'Pedido actualizado' });
  }
);

// @desc Borrar un Pedido
// @ruta DELETE /pedido/:id
// @acceso Privado
const borrarPedido = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const pedido = await Pedido.delete(req.params.id);
    if (!pedido) {
      return res.status(400).json({ message: 'Pedido no guardado' });
    }

    res.json({ message: 'Pedido borrado' });
  }
);

export {
  obtenerTodosLosPedidos,
  actualizarPedido,
  crearPedido,
  borrarPedido,
  obtenerPedido,
};
