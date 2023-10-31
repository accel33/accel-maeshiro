import { Request, Response } from 'express';
import { EstadoEnum, Pedido } from '../entities/Pedido';
import asyncHandler from 'express-async-handler';
import { PedidoDto } from '../dto/PedidoDto';
import { validatorDto } from '../dto/ValidatorDto';
import moment from 'moment-timezone';
import { obtenerFechaActual } from '../utils/obtenerFechaActual';
// import { AppDataSource } from '../config/data-source';
// const pedidoRepository = AppDataSource.getRepository(Pedido);

// @desc Obtener todo los Pedidos
// @ruta GET /pedido
// @acceso Privado
const obtenerTodosLosPedidos = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const pedidos = await Pedido.find({
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
    const { sku } = req.body;
    const err = await validatorDto(PedidoDto, req.body);
    if (err) {
      return res.json({
        message: `Error de validacion: ${err}`,
      });
    }

    // Asegurar que producto no exista dentro del arreglo de objetos
    // Hay efectos secundarios si no se utiiliza esta validacion aqui
    const producto = await Pedido.findOneBy({
      productos: { sku: sku },
    });
    if (producto) {
      return res
        .status(404)
        .json({ message: 'Error de restriccion: Producto ya existe' });
    }

    // Obtener la fecha con zona horaria Peru, para asignarla en los
    // pedidos basado en la actualizacion del estado del pedido
    const obtenerFechaActual = (): Date => {
      const limaTime = moment.tz('America/Lima');
      const offsetMinutes = limaTime.utcOffset();
      const jsDate = new Date(limaTime.format());
      jsDate.setMinutes(jsDate.getMinutes() + offsetMinutes);
      return jsDate;
    };

    const guardarPedido = await Pedido.create(req.body);
    guardarPedido.fecha_pedido = obtenerFechaActual();

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
      numeroPedido: req.params.id,
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
    const { estado } = req.body;

    const err = await validatorDto(PedidoDto, req.body);
    if (err) {
      return res.json({
        message: `Error de validacion: ${err}`,
      });
    }

    const pedido = await Pedido.findOneBy({
      numeroPedido: req.params.id,
    });
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    // Validar que el nuevo estado sea válido
    const estadosValidos = [
      EstadoEnum.POR_ATENDER,
      EstadoEnum.EN_PROCESO,
      EstadoEnum.DELIVERY,
      EstadoEnum.RECIBIDO,
    ];

    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ message: 'Estado no válido' });
    }

    // Definir el cambio de estado jerárquico
    if (
      estadosValidos.indexOf(pedido.estado) > estadosValidos.indexOf(estado)
    ) {
      return res
        .status(400)
        .json({ message: 'No puedes cambiar a un estado anterior.' });
    }

    switch (estado) {
      case EstadoEnum.POR_ATENDER:
        pedido.fechaPedido = obtenerFechaActual();
        break;
      case EstadoEnum.EN_PROCESO:
        pedido.fechaRecepcion = obtenerFechaActual();
        break;
      case EstadoEnum.DELIVERY:
        pedido.fechaDespacho = obtenerFechaActual();
        break;
      case EstadoEnum.RECIBIDO:
        pedido.fechaEntrega = obtenerFechaActual();
        break;
    }

    pedido.estado = estado !== '' ? estado : pedido.estado;
    console.log('pedido');
    console.log(pedido);

    const result = await Pedido.save(pedido);
    if (!result) {
      return res.status(400).json({ message: 'Pedido no actualizado' });
    }
    console.log('result');
    console.log(result);

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
