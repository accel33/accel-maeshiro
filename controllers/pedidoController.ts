import { Request, Response } from 'express';
import { Pedido } from '../entities/Pedido';
import asyncHandler from 'express-async-handler';
import { PedidoDto } from '../dto/PedidoDto';
import { validatorDto } from '../dto/ValidatorDto';
// import { AppDataSource } from '../config/data-source';
// const pedidoRepository = AppDataSource.getRepository(Pedido);

// @desc Obtener todo los Pedidos
// @ruta GET /pedidos
// @acceso Privado
const obtenerTodosLosPedidos = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const pedidos = await Pedido.find();
    if (!pedidos?.length) {
      return res.status(400).json({ message: 'Pedidos no encontrados' });
    }
    res.json(pedidos);
  }
);

// @desc Crear un Pedido
// @ruta POST /pedidos
// @acceso Privado
const crearPedido = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    console.log('Crear Pedido');
    console.log('body', req.body);
    const { productos } = req.body;

    const err = await validatorDto(PedidoDto, req.body);
    if (err) {
      return res.json({
        message: `Error de validacion: ${err}`,
      });
    }

    const nuevoPedido = {
      // fecha_recepcion: '28-10-1990',
      // fecha_despacho: '28-10-1990',
      // fecha_entrega: '28-10-1990',
      // vendedor: 'Gabriel',
      // repartidor: 'Gabriel',
      fecha_pedido: new Date().getTime(),
      estado: 'Por atender',
      productos,
    };

    const guardarPedido = await Pedido.create(nuevoPedido);
    const result = await Pedido.save(guardarPedido);

    res.json({ message: 'Pedido creado' });
  }
);

// @desc Obtener un Pedidos
// @ruta GET /pedidos/:id
// @acceso Privado
const obtenerPedido = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    console.log('Obtener Pedido');
    console.log('called');
    console.log(req.params.id);

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
// @ruta PATCH /pedidos/:id
// @acceso Privado
const actualizarPedido = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    console.log('Actualizar Pedido');
    const {
      fecha_despacho,
      fecha_entrega,
      fecha_pedido,
      fecha_recepcion,
      estado,
      vendedor,
      repartidor,
      productos,
    } = req.body;

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
    console.log(pedido);

    pedido.fecha_despacho = fecha_despacho;
    pedido.fecha_entrega = fecha_entrega;
    pedido.fecha_pedido = fecha_pedido;
    pedido.fecha_recepcion = fecha_recepcion;
    pedido.estado = estado;
    pedido.vendedor = vendedor;
    pedido.repartidor = repartidor;
    pedido.productos = productos;

    const result = await Pedido.save(pedido);
    if (!result) {
      return res.status(400).json({ message: 'Pedido no actualizado' });
    }
    console.log(result);

    res.json({ message: 'Pedido actualizado' });
  }
);

// @desc Borrar un Pedido
// @ruta DELETE /pedidos/:id
// @acceso Privado
const borrarPedido = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    console.log('Borrar pedido');

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
