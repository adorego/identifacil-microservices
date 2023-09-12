import {body, validationResult} from 'express-validator';
import express, {Request, Response} from 'express';

import { DataBaseConnectionError } from '../../errors/database-connection-error';
import { RequestValidationError } from '../../errors/request-validation-error';

const router = express.Router();

router.post('/api/users/registrarse',[
  body('nombre')
    .trim()
    .isLength({min: 4})
    .withMessage('El nombre no es válido'),
  body('apellido')
    .trim()
    .isLength({min: 4})
    .withMessage('El apellido no es valido'),
  body('ci')
    .trim()
    .isLength({min: 2})
    .withMessage('La cedula no es válida'),
    body('clave')
      .trim()
      .isLength({min: 6, max: 12})
      .withMessage('La clave no es válida')
    


],(req:Request,res:Response) =>{
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    throw new RequestValidationError(errors.array());
  }
  const {nombre,apellido,ci,clave} = req.body;

  throw new DataBaseConnectionError();
  // console.log("Creando usuario");

  res.send({});
  
})


export {router as registrarseRouter};