import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PinoLogger } from 'nestjs-pino';
export declare class AppController {
    private readonly appService;
    private readonly logger;
    constructor(appService: AppService, logger: PinoLogger);
    getHello(): string;
    getAdmin(): string;
    createTask(body: {
        name: string;
    }): Promise<{
        jobId: string | undefined;
    }>;
    getAllUsers(): Promise<import("./app.entity").User[]>;
    getUser(id: string): Promise<import("./app.entity").User>;
    createUser(body: CreateUserDto): Promise<import("./app.entity").User>;
    updateUser(id: string, body: UpdateUserDto): Promise<import("./app.entity").User>;
    deleteUser(id: string): Promise<void>;
    throwError(): void;
}
