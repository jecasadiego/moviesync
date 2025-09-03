import { CronJob } from 'cron';

export class CronService {
  static createJob(cronTime: string, onTick: () => void): CronJob {
    const serverTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Obtiene la zona horaria del sistema
    
    const job = new CronJob(cronTime, onTick, null, false, serverTimeZone);
    
    job.start();
    
    return job;
  }
}
