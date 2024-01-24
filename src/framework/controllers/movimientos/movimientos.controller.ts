import { Controller } from "@nestjs/common";
import { MovimientosUseCase } from "src/use-cases/movimientos/movimientos-use-case.service";

@Controller(
  'movimientos'
  
  
)
export class MovimientosController{
  constructor(
    movimientosUseCase:MovimientosUseCase
  ){}
}