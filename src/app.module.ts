import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepoinfoModule } from './repoinfo/repoinfo.module';

@Module({
  imports: [RepoinfoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
