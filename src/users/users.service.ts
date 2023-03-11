import { Injectable } from "@nestjs/common";
import { User } from "./users.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user-dto";
import { RolesService } from "../roles/roles.service";

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User,private roleService:RolesService) {
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('ADMIN');
    //тут необходимо указать что эта роль принадлежит пользователю
    //метод $set позволяет перезаписать какое-то поле и обновить сразу внутри БД
    await user.$set('roles',[role.id])
    //Добавляем роль пользователю напрямую
    user.roles = [role]
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({include:{all:true}});
    return users
  }

  //проверяем есть ли пользователь в БД
  async getUserByEmail(email:string){
    const user = await this.userRepository.findOne({where:{email},include:{all:true}})
    return user;
  }
}
