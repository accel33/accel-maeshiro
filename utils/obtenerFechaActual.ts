import moment from 'moment-timezone';

// Obtener la fecha con zona horaria Peru, para asignarla en los
// pedidos basado en la actualizacion del estado del pedido
export const obtenerFechaActual = (): Date => {
  const limaTime = moment.tz('America/Lima');
  const offsetMinutes = limaTime.utcOffset();
  const jsDate = new Date(limaTime.format());
  jsDate.setMinutes(jsDate.getMinutes() + offsetMinutes);
  return jsDate;
};
