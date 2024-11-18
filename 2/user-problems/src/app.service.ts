import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user-model";

@Injectable()
export class AppService {
  constructor(@InjectModel(User) private readonly userRepository: typeof User) {}


  async updateProblems(){
    const batchSize = 10000
    let offset = 0
    let count = 0


    while(true){
      const users = await this.userRepository.findAll({
        where: {problems: true},
        offset,
        limit: batchSize
      })

      if (users.length === 0) {
        break;
      }


      const [affectedCount] = await this.userRepository.update(
          {
            problems: false
          },
          {
            where: {id: users.map((user) => user.id)}
          })

      count += affectedCount
      offset += batchSize

    }

  return {count}

  }



}
