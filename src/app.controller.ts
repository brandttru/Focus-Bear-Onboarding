import { Controller, Get, Post, Body, Put, Delete, Param, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PinoLogger } from 'nestjs-pino';
import { Roles, Role } from './auth/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt.guard';
import { RolesGuard } from './auth/roles.guard';

//@UseGuards(JwtAuthGuard, RolesGuard)      unless i can get a front end working with auth, this is pointless, front end will take too long
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly logger: PinoLogger) {}

  @Get()
  getHello(): string {
    this.logger.info('getHello called');
    return this.appService.getHello();
  }

  @Get('admin')
  //@Roles(Role.ADMIN)
  getAdmin(): string {
    return this.appService.getAdmin();
  }

  @Post('tasks')
  async createTask(@Body() body: { name: string }) {
    return this.appService.addTask(body.name);
  }

  @Get('users')
  async getAllUsers() {
    this.logger.info('getAllUsers called');
    return this.appService.getAllUsers();
  }

  @Get('users/:id')
  async getUser(@Param('id') id: string) {
    return this.appService.getUser(id);
  }

  @Post('users')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() body: CreateUserDto) {
    return this.appService.addUser(body.name, body.socialSecurityNumber, body.creditCardNumber);
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

  @Get('error')
  throwError() {
    throw new NotFoundException('Test error');
  }

  @Get('todo/:id')
  async getTodo(@Param('id') id: string) {
    return this.appService.getTodo(parseInt(id));
  }
}