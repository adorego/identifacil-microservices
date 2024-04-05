
enum Niveles_de_Gravedad{
    leve,
    grave,
    muy_grave

}
export class Sancion{
    id:number;
    nombre:string;
    nivel_de_gravedad:Niveles_de_Gravedad;
}