import { Controller, Get, Post, Body, Put, Delete, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

class UpdateUserDto {
  name?: string;
}

class CreateUserDto {
  name: string;
}

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

  @Get('users')
  async getAllUsers() {
    return this.appService.getAllUsers();
  }

  @Get('users/:id')
  async getUser(@Param('id') id: string) {
    return this.appService.getUser(id);
  }

  @Post('users')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() body: CreateUserDto) {
    return this.appService.addUser(body.name);
  }

  @Put('users/:id')
  async updateUser(
    @Param('id') id: string, 
    @Body() body: UpdateUserDto
  ) {
    return this.appService.updateUser(id, body);
  }

  @Delete('users/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string) {
    await this.appService.deleteUser(id);
  }
}
