import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './app.entity';

@Injectable()
export class AppService implements OnModuleInit{
  constructor(
    @InjectQueue('tasks') private taskQueue: Queue,
    @InjectRepository(User)
    private readonly taskRepo: Repository<User>,
  ) {}


  getHello(): string {
    return 'Hello World!';
  }

  async addTask(name: string) {
    // Save task in DB
    const dbTask = await this.taskRepo.save({ name });

    // Add to BullMQ
    const job = await this.taskQueue.add('process-task', { name });

    return { dbId: dbTask.id, jobId: job.id };
  }

  async onModuleInit() {
    await this.seedUsers();
  }

  async seedUsers() {
    const users = [
      { name: 'Alice'},
      { name: 'Bob'},
    ];

    await this.taskRepo.save(users);
    console.log('Seeded users');
  }
}