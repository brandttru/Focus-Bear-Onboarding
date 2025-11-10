import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getDockerMessage(): string {
    return 'Hello from NestJS inside Docker!';
  }
}