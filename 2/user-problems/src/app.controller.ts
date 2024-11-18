import {Controller, Patch} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

@Patch()
  updateProblems(){
    const result = this.appService.updateProblems();
    return result;
}

}
