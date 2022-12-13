import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { randomUUID } from 'node:crypto'
import { CreateNotificationBody } from './create-notifications-body';

@Controller('notifications')
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  getHello() {
    return this.prismaService.notification.findMany()
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category} = body
    return await this.prismaService.notification.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recipientId
      }
    })
  }
}
