import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Post, Body } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('tasks')
  async createTask(@Body() body: { name: string }) {
    return this.appService.addTask(body.name);
  }
}
