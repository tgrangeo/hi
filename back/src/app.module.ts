import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '../../front', 'dist/front'),
  }),],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
