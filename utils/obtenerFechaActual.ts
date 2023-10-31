import moment from 'moment';

export const obtenerFechaActual = (): Date => {
  const limaTime = moment.tz('America/Lima');
  const offsetMinutes = limaTime.utcOffset();
  const jsDate = new Date(limaTime.format());
  jsDate.setMinutes(jsDate.getMinutes() + offsetMinutes);
  return jsDate;
};
