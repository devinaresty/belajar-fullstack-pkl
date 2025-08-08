import { Controller, Get } from '@nestjs/common';

@Controller('healthcheck')
export class HealthController {
  @Get()
  getHealth() {
    return { status: 'ok' };
  }
}
