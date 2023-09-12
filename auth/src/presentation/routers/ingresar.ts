import express from 'express';

const router = express.Router();


router.post('/api/users/ingresar',(req,res) =>{
  console.log("Registrando usuario");
});

export {router as ingresarRouter}