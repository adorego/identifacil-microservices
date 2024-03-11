import { Condena } from "src/core/entities/condena.entity";
import { TiempoDeCondena } from "src/core/entities/tiempo_de_condena.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CondenaModel } from "./condena.model";


@Entity({name:"tiempo_de_condena"})
export class TiempoDeCondenaModel extends TiempoDeCondena{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"int2"})
    anhos:number;

    @Column({type:"int2"})
    meses:number;

    @OneToMany(()=>CondenaModel, condena=>condena.tiempo_de_condena)
    condenas_principales: Array<CondenaModel>;

    @OneToMany(()=>CondenaModel, condena=>condena.anhos_extra_por_medida_de_seguridad)
    condenas_secundarias: Array<CondenaModel>;

}