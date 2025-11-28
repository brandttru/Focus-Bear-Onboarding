import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
export declare class AppProcessor extends WorkerHost {
    private readonly logger;
    process(job: Job): Promise<{
        processed: boolean;
    }>;
}
