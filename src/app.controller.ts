import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  protected readonly service;

  constructor(service: AppService) {
    this.service = service;
  }
}
