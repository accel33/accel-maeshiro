import { CorsOptions } from 'cors';
import { origenesPermitidos } from './origenesPermitidos';

// CORS, Recursos Compartidos de Origen Multiples
const origenNoEncontrado = -1;
export const opcionesCors: CorsOptions = {
  origin: (origen: string | undefined, callback: any) => {
    // !origen o no-origen es por ejemplo Postman o algun servicio sin origen
    if (origenesPermitidos.indexOf(origen!) !== origenNoEncontrado || !origen) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
