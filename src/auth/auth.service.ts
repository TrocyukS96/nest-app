import { Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user-dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import { User } from "../users/users.model";

@Injectable()
export class AuthService {

  constructor(private userService:UsersService,
              private jwtService:JwtService) {
  }

 async login(userDto:CreateUserDto){
    const user = this.validateUser(userDto)
   return user;
  }

 async registration(userDto:CreateUserDto){
    //проверяем есть ли такой пользователь в БД
    const candidate = await this.userService.getUserByEmail(userDto.email)
   if(candidate){
     throw new HttpException('Пользователь с таким email существует',HttpStatus.BAD_REQUEST)
   }
   const hashPassword = await bcrypt.hash(userDto.password,5);
   //сразу создаем пользователя, но пороль перезаписываем на хэшированный
   const user = await this.userService.createUser({...userDto,password:hashPassword})
   return this.generateToken(user)
  }

  private  async generateToken(user:User){
    //создадим обьект, который мы будем добавлять внутрь токена
    const payload = {
      email:user.email,
      id:user.id,
      roles:user.roles
    }
    //возвращаем сгенерированный токен с помощью сервиса jwtService
    return {
      token:this.jwtService.sign(payload)
    }
  }

  private async validateUser(userDto:CreateUserDto){
    const user = await this.userService.getUserByEmail(userDto.email)
    //делаем проверку:совпадает ли пороль который пришел с клиента с поролем из БД
    const passwordEquals = await bcrypt.compare(userDto.password,user.password)
    if(user && passwordEquals){
      return user
    }
    throw new UnauthorizedException({message:'Неккоректный email или пороль'})
  }
}
