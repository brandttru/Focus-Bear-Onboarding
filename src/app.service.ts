import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class AppService {
  constructor(@InjectQueue('tasks') private taskQueue: Queue) {}

  getHello(): string {
    return 'Hello World!';
  }

  async addTask(name: string) {
    const job = await this.taskQueue.add('process-task', { name });
    return { jobId: job.id };
  }
}