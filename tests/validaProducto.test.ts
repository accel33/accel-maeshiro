import { ProductoDto } from '../dto/ProductoDto';
import { validatorDto } from '../dto/ValidatorDto';

const requestBody = {
  nombre: 'radio',
  tipo: 'electro-domestico',
  etiquetas: 'tech',
  precio: 100.0,
  unidadMedida: 'rm',
};

describe('Nombre', () => {
  it('Deberia validar el campo nombre vacio', async () => {
    const { nombre, ...body } = requestBody;
    const err = await validatorDto(ProductoDto, body);
    expect(err).toContain('nombre es requerido');
  });
  it('Deberia validar el campo nombre sea string', async () => {
    const body = { ...requestBody };
    body.nombre = 32 as any;
    const err = await validatorDto(ProductoDto, body);
    expect(err).toContain('nombre debe ingresar caracteres');
  });
});

describe('Tipo', () => {
  it('Deberia validar el campo tipo vacio', async () => {
    const { tipo, ...body } = requestBody;
    const err = await validatorDto(ProductoDto, body);
    expect(err).toContain('tipo es requerido');
  });
  it('Deberia validar el campo tipo sea string', async () => {
    const body = { ...requestBody };
    body.tipo = 32 as any;
    const err = await validatorDto(ProductoDto, body);
    expect(err).toContain('tipo debe ingresar caracteres');
  });
});

describe('Etiquetas', () => {
  it('Deberia validar el campo etiquetas vacio', async () => {
    const { etiquetas, ...body } = requestBody;
    const err = await validatorDto(ProductoDto, body);
    expect(err).toContain('etiquetas es requerido');
  });
  it('Deberia validar el campo etiquetas sea string', async () => {
    const body = { ...requestBody };
    body.etiquetas = 32 as any;
    const err = await validatorDto(ProductoDto, body);
    expect(err).toContain('etiquetas debe ingresar caracteres');
  });
});

describe('Precio', () => {
  it('Deberia validar el campo precio vacio', async () => {
    const { precio, ...body } = requestBody;
    const err = await validatorDto(ProductoDto, body);
    expect(err).toContain('precio es requerido');
  });
  it('Deberia validar el campo precio sea number', async () => {
    const body = { ...requestBody };
    body.precio = '32' as any;
    const err = await validatorDto(ProductoDto, body);
    expect(err).toContain('precio debe ingresar numeros');
  });
});

describe('UnidadMedida', () => {
  it('Deberia validar el campo unidadMedida vacio', async () => {
    const { unidadMedida, ...body } = requestBody;
    const err = await validatorDto(ProductoDto, body);
    expect(err).toContain('unidadMedida es requerido');
  });
  it('Deberia validar el campo unidadMedida sea string', async () => {
    const body = { ...requestBody };
    body.unidadMedida = 32 as any;
    const err = await validatorDto(ProductoDto, body);
    expect(err).toContain('unidadMedida debe ingresar caracteres');
  });
});
