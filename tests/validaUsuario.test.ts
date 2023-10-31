import { UsuarioDto } from '../dto/UsuarioDto';
import { validatorDto } from '../dto/ValidatorDto';

const requestBody = {
  nombre: 'accel',
  email: 'accel@gmail.com',
  password: '12345',
  telefono: 3453453,
  rol: 'Vendedor',
  puesto: 'empleado',
};

describe('Nombre', () => {
  it('Deberia validar el campo nombre vacio', async () => {
    const { nombre, ...body } = requestBody;
    const err = await validatorDto(UsuarioDto, body);
    expect(err).toContain('nombre es requerido');
  });
  it('Deberia validar el campo nombre sea string', async () => {
    const body = { ...requestBody };
    body.nombre = 32 as any;
    const err = await validatorDto(UsuarioDto, body);
    expect(err).toContain('nombre debe ingresar caracteres');
  });
});

describe('Email', () => {
  it('Deberia validar el campo email vacio', async () => {
    const { email, ...body } = requestBody;
    const err = await validatorDto(UsuarioDto, body);
    expect(err).toContain('email es requerido');
  });
  it('Deberia validar el campo email sea string', async () => {
    const body = { ...requestBody };
    body.email = 32 as any;
    const err = await validatorDto(UsuarioDto, body);
    expect(err).toContain('email debe ingresar caracteres');
  });
});

describe('Password', () => {
  it('Deberia validar el campo password vacio', async () => {
    const { password, ...body } = requestBody;
    const err = await validatorDto(UsuarioDto, body);
    expect(err).toContain('password es requerido');
  });
  it('Deberia validar el campo password sea string', async () => {
    const body = { ...requestBody };
    body.password = 32 as any;
    const err = await validatorDto(UsuarioDto, body);
    expect(err).toContain('password debe ingresar caracteres');
  });
});

describe('Telefono', () => {
  it('Deberia validar el campo telefono vacio', async () => {
    const { telefono, ...body } = requestBody;
    const err = await validatorDto(UsuarioDto, body);
    expect(err).toContain('telefono es requerido');
  });
  it('Deberia validar el campo telefono sea number', async () => {
    const body = { ...requestBody };
    body.telefono = '32' as any;
    const err = await validatorDto(UsuarioDto, body);
    expect(err).toContain('telefono debe ingresar numeros');
  });
});

describe('Rol', () => {
  it('Deberia validar el campo rol vacio', async () => {
    const { rol, ...body } = requestBody;
    const err = await validatorDto(UsuarioDto, body);
    expect(err).toContain('rol es requerido');
  });
  it('Deberia validar el campo rol sea string', async () => {
    const body = { ...requestBody };
    body.rol = 32 as any;
    const err = await validatorDto(UsuarioDto, body);
    expect(err).toContain(
      'rol debe ser Encargado, Vendedor, Delivery o Repartidor'
    );
  });
});

describe('Puesto', () => {
  it('Deberia validar el campo puesto vacio', async () => {
    const { puesto, ...body } = requestBody;
    const err = await validatorDto(UsuarioDto, body);
    expect(err).toContain('puesto es requerido');
  });
  it('Deberia validar el campo puesto sea string', async () => {
    const body = { ...requestBody };
    body.puesto = 32 as any;
    const err = await validatorDto(UsuarioDto, body);
    expect(err).toContain('puesto debe ingresar caracteres');
  });
});
