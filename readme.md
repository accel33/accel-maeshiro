### Reto Delfosti

Se quiere desarrollar un sistema que tiene como actividad principal la venta de productos basicos. Su principal problema es que no realizan un correcto TRACKING al momento de hacer los pedidos de productos para abastecer su stock.

### Diagrama de flujo

1. Usuario se loguea al sistema
2. Usuario encargado atiende el nuevo pedido
3. 

### Pendientes
- [ ] Proyecto requiere Inversion de dependencia
![Alt text](images/InversionDeDependencia.png)
<br>
- [ ] Proyecto requiere Sustitucion de Liskov
![Alt text](images/LiskovSustitution.png)
<br>
- [ ] Necesito una explicacion para este principio
![Alt text](images/AbiertoCerrado.png)
<br>
- [ ] Utilizar el DTO como Request
![Alt text](images/RequestDto.png)
<br>
- [ ] Utilizar el DTO como Request
![Alt text](images/RequestDto.png)
<br>
- [ ] Error con el Enum
![Alt text](images/error-con-el-enum.png)
<br>

### Valores de Estado y Roles

```
Estado De Pedido {
  POR_ATENDER = 0,
  EN_PROCESO = 1,
  DELIVERY = 2,
  RECIBIDO = 3,
}

Rol De Usuario {
  ENCARGADO = 0,
  VENDEDOR = 1,
  DELIVERY = 2,
  REPARTIDOR = 3,
}
```
