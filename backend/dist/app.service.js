"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const app_entity_1 = require("./app.entity");
let AppService = class AppService {
    taskQueue;
    userRepo;
    constructor(taskQueue, userRepo) {
        this.taskQueue = taskQueue;
        this.userRepo = userRepo;
    }
    getHello() {
        return 'Hello World!';
    }
    getAdmin() {
        return 'Hello Admin!';
    }
    async addTask(name) {
        const job = await this.taskQueue.add('process-task', { name });
        return { jobId: job.id };
    }
    async addUser(name, socialSecurityNumber, creditCardNumber) {
        const user = this.userRepo.create({ name, socialSecurityNumber, creditCardNumber });
        return await this.userRepo.save(user);
    }
    async getAllUsers() {
        return await this.userRepo.find();
    }
    async getUser(id) {
        const user = await this.userRepo.findOne({ where: { id: parseInt(id) } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    async updateUser(id, updates) {
        const user = await this.getUser(id);
        if (updates.name !== undefined) {
            user.name = updates.name;
        }
        const updatedUser = await this.userRepo.save(user);
        await this.taskQueue.add('update-user', { userId: user.id, updates });
        return updatedUser;
    }
    async deleteUser(id) {
        const user = await this.getUser(id);
        await this.userRepo.remove(user);
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
            { name: 'Alice' },
            { name: 'Bob' },
        ];
        await this.userRepo.save(users);
        console.log('Seeded users');
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bullmq_1.InjectQueue)('tasks')),
    __param(1, (0, typeorm_1.InjectRepository)(app_entity_1.User)),
    __metadata("design:paramtypes", [bullmq_2.Queue,
        typeorm_2.Repository])
], AppService);
//# sourceMappingURL=app.service.js.map