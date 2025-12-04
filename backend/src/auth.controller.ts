import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('private')
export class PrivateController {
  @Get()
  @UseGuards(AuthGuard('jwt'))
  getPrivate() {
    return { message: 'This is a protected route' };
  }
}