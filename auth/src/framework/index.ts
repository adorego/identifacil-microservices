import 'express-async-error';

import { DataBaseConnectionError } from '../errors/database-connection-error';
import { NotFoundError } from '../errors/notFound-error';
import { errorHandler } from './middleware/error-handler';
import express  from 'express';
import { ingresarRouter } from '../presentation/routers/ingresar';
import { json } from 'body-parser';
import { registrarseRouter } from '../presentation/routers/registrarse';

const app = express();
app.use(json());
app.use(registrarseRouter);
app.use(ingresarRouter);

app.all('*',async () =>{
  throw new NotFoundError();
})
app.use(errorHandler);



app.get('/api/users/test',(req,res) =>{
  console.log('Test de API');
  res.status(200).send({"message":"Hola"});
})



app.listen(3000, () =>{
  console.log("v2.0");
  console.log("Escuchando en el puerto 3000");
})