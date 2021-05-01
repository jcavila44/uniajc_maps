import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn() usu_id: number;

  @Column({ length: 50, nullable: false })
  usu_correo: string;

  @Column({ length: 25, nullable: false })
  usu_nombre: string;

  @Column({ length: 50, nullable: false })
  usu_psw: string;
}
