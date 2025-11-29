import { OnModuleInit } from '@nestjs/common';
import { Queue } from 'bullmq';
import { Repository } from 'typeorm';
import { User } from './app.entity';
import { HttpService } from '@nestjs/axios';
export declare class AppService implements OnModuleInit {
    private taskQueue;
    private readonly userRepo;
    private readonly http;
    constructor(taskQueue: Queue, userRepo: Repository<User>, http: HttpService);
    getHello(): string;
    getAdmin(): string;
    addTask(name: string): Promise<{
        jobId: string | undefined;
    }>;
    addUser(name: string, socialSecurityNumber: string, creditCardNumber: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUser(id: string): Promise<User>;
    updateUser(id: string, updates: {
        name?: string;
        socialSecurityNumber?: string;
        creditCardNumber?: string;
    }): Promise<User>;
    deleteUser(id: string): Promise<void>;
    onModuleInit(): Promise<void>;
    seedUsers(): Promise<void>;
    getTodo(id: number): Promise<any>;
}
