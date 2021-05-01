import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Personas {
    @PrimaryGeneratedColumn() id: number;
    
    @Column({ length: 25, nullable: true })
    nombre: string;

    @Column({ length: 25, nullable: true })
    apellido: string;

    @Column({nullable:true})
    edad: number;

}