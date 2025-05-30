import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "clients",
  timestamps: true,
  underscored: true,
})
class Client extends Model {
  @Column({
    type: DataType.STRING(50),
  })
  nombre: string;

  @Column({
    type: DataType.STRING(50),
  })
  apellido: string;

  @Column({
    type: DataType.STRING(50),
  })
  telefono: string;

  @Column({
    type: DataType.STRING(50),
  })
  placas: string;

  @Column({
    type: DataType.STRING(50),
  })
  auto: string;

  @Column({
    type: DataType.STRING(50),
  })
  color: string;
}

export default Client;