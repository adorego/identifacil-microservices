import { MigrationInterface, QueryRunner } from "typeorm"

export class InitialData1699301183350 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO tipo_identificacion (id,tipo) VALUES (1,"cedula");
             INSERT INTO tipo_identificacion (id,tipo) VALUES (2,"pasaporte");`,
            

        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(
        //     `DELETE FROM tipo_identificacion WHERE id=1,
            

        // )
    }

}
