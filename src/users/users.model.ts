import { Column, DataType, Table,Model } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface UserCreationAttr{
  email:string
  password:string
}

@Table({tableName:'users'})
export class User extends  Model<User,UserCreationAttr>{
  @ApiProperty({example:'1',description:'Уникальный идентификатор'})
  @Column({type:DataType.INTEGER,unique:true,autoIncrement:true,primaryKey:true})
  id:number;

  @ApiProperty({example:'user@email.ru',description:'Почтовый адрес'})
  @Column({type:DataType.STRING,unique:true,allowNull:false})
  email:string;

  @ApiProperty({example:'123',description:'Пороль'})
  @Column({type:DataType.STRING,allowNull:false})
  password:string;

  @ApiProperty({example:'true',description:'Забанен пользователь или нет'})
  @Column({type:DataType.BOOLEAN, defaultValue:false})
  banned:boolean;

  @ApiProperty({example:'за хулиганство',description:'Причина бана'})
  @Column({type:DataType.STRING,allowNull:true})
  banReason:string;
}