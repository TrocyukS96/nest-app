import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller('/api')
export  class AppController{
  constructor(private appService:AppService) {
  }

  @Get('/users')
  getUsers(){
    return this.appService.getUsers()
  }
}

//команды для установки зависимостей через seqilize для postgre
//1) npm install --save @nestjs/sequelize sequelize sequelize-typescript
//2) npm install --save pg pg-hstore
//3) npm install --save-dev @types/sequelize
//полезные ссылки на эту тему: https://sequelize.org/docs/v6/getting-started/
//полезные ссылки на эту тему: https://docs.nestjs.com/techniques/database#sequelize-integration