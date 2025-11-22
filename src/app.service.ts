import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './app.entity';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService implements OnModuleInit{
  constructor(
    @InjectQueue('tasks') private taskQueue: Queue,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly http: HttpService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  getAdmin(): string {
    return 'Hello Admin!';
  }

  async addTask(name: string) {
    // Add to BullMQ
    const job = await this.taskQueue.add('process-task', { name });

    return { jobId: job.id };
  }
  
  async addUser(name: string, socialSecurityNumber: string, creditCardNumber: string) {
    const user = this.userRepo.create({name, socialSecurityNumber, creditCardNumber});
    return await this.userRepo.save(user);
  }

  async getAllUsers() {
    return await this.userRepo.find();
  }

  async getUser(id: string) {
    const user = await this.userRepo.findOne({ where: { id: parseInt(id) } });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return user;
  }

  async updateUser(id: string, updates: { name?: string, socialSecurityNumber?: string, creditCardNumber?: string }) {
    const user = await this.getUser(id); // This will throw NotFoundException if not found
    
    if (updates.name !== undefined) {
      user.name = updates.name;
    }
    
    const updatedUser = await this.userRepo.save(user);
    
    // Optionally add to queue for processing
    await this.taskQueue.add('update-user', { userId: user.id, updates });
    
    return updatedUser;
  }

  async deleteUser(id: string) {
    const user = await this.getUser(id); // This will throw NotFoundException if not found
    
    await this.userRepo.remove(user);
    
    // Optionally add to queue for cleanup tasks
    await this.taskQueue.add('delete-user', { userId: id });
  }

  async onModuleInit() {
    await this.seedUsers();
  }

  async seedUsers() {
    const existingUsers = await this.userRepo.count();

    if (existingUsers > 0) {
      console.log('Users already seeded');
      return;
    }

    const users = [
      { name: 'Alice'},
      { name: 'Bob'},
    ];

    await this.userRepo.save(users);
    console.log('Seeded users');
  }

  async getTodo(id: number) {
    const response = await lastValueFrom(
      this.http.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
    );

    return response.data;
  }
}