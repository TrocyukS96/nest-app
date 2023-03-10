import { Column, DataType, Table, Model, BelongsToMany } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttr{
  value:string
  description:string
}

@Table({tableName:'roles'})
export class Role extends  Model<Role,RoleCreationAttr>{
  @ApiProperty({example:'1',description:'Уникальный идентификатор'})
  @Column({type:DataType.INTEGER,unique:true,autoIncrement:true,primaryKey:true})
  id:number;

  @ApiProperty({example:'ADMIN',description:'Уникальное значение роли пользователя'})
  @Column({type:DataType.STRING,unique:true,allowNull:false})
  value:string;

  @ApiProperty({example:'Администратор',description:'Описание роли'})
  @Column({type:DataType.STRING,allowNull:false})
  description:string;

  //тут мы указываем, с какой сущностью мы связываем и через какую таблицу мы это делаем
  @BelongsToMany(()=>User,()=>UserRoles)
  users:User[];
}