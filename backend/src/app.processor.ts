import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor('tasks')
export class AppProcessor extends WorkerHost {
  private readonly logger = new Logger(AppProcessor.name);

  async process(job: Job) {
    this.logger.log(`Processing: ${job.data.name}`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    this.logger.log(`Completed: ${job.data.name}`);
    return { processed: true };
  }
}
