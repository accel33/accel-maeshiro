import { PedidoDto } from '../dto/PedidoDto';
import { validatorDto } from '../dto/ValidatorDto';

const requestBody = {
  productos: [{ sku: '002' }],
  vendedor: '001',
  repartidor: '002',
};

describe('Productos', () => {
  // it('Deberia validar el campo productos vacio', async () => {
  //   const { productos, ...body } = requestBody;
  //   const err = await validatorDto(PedidoDto, body);
  //   expect(err).toContain('productos es requerido');
  // });
  it('Deberia validar el campo productos sea string', async () => {
    const body = { ...requestBody };
    body.productos = 32 as any;
    const err = await validatorDto(PedidoDto, body);
    expect(err).toContain('productos debe arreglo de strings');
  });
});

describe('Vendedor', () => {
  // it('Deberia validar el campo vendedor vacio', async () => {
  //   const { vendedor, ...body } = requestBody;
  //   const err = await validatorDto(PedidoDto, body);
  //   expect(err).toContain('vendedor es requerido');
  // });
  it('Deberia validar el campo vendedor sea string', async () => {
    const body = { ...requestBody };
    body.vendedor = 32 as any;
    const err = await validatorDto(PedidoDto, body);
    expect(err).toContain('vendedor debe ingresar caracteres');
  });
});

describe('Repartidor', () => {
  // it('Deberia validar el campo repartidor vacio', async () => {
  //   const { repartidor, ...body } = requestBody;
  //   const err = await validatorDto(PedidoDto, body);
  //   expect(err).toContain('repartidor es requerido');
  // });
  it('Deberia validar el campo repartidor sea string', async () => {
    const body = { ...requestBody };
    body.repartidor = 32 as any;
    const err = await validatorDto(PedidoDto, body);
    expect(err).toContain('repartidor debe ingresar caracteres');
  });
});
