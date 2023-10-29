import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

/**
 *
 * Validar la carga util que va a ser enviada o recibida, asegurar que la data es adecuada
 *
 * @param dto El objeto DTO a validar
 * @param obj El objeto recibido del body del request
 *
 * @example
 * ```ts
 *  await validatorDto(EmployeeDTO, response.data.employee);
 * ```
 */
export const validatorDto = async <T extends ClassConstructor<any>>(
  dto: T,
  obj: Object
) => {
  // tranform the literal object to class object
  const objInstance = plainToClass(dto, obj);

  // validating and check the errors, throw the errors if exist
  const errors = await validate(objInstance);

  // errors is an array of validation errors
  if (errors.length > 0) {
    return Object.values(errors[0].constraints!)[0];
  }
};
