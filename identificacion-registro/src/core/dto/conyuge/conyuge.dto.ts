
export class ConyugeDTO{
    id_persona:number//id_persona del PPL
    nombres:string;
    apellidos:string;
    tipo_de_identificacion:number;
    numero_de_identificacion:string;
    es_extranjero:boolean;
    fecha_de_nacimiento:string;
    edad:number;
    sexo:number;
    lugar_de_nacimiento:string;
    direccion:string;
    barrio:string;
    compania:string;
    numero_de_contacto:string;
    dias_de_visita:Array<number>//1:Domingo,2:Lunes....7:Sabado


}