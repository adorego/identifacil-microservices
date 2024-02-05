import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"documento_autorizacion"})
export class DocumentoDeAutorizacionModel{

  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"date"})
  fecha:Date;

  @Column({type:"varchar"})
  enlace:string;
}