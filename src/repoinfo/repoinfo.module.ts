import { Module } from '@nestjs/common';
import { RepoinfoService } from './repoinfo.service';
import { RepoinfoController } from './repoinfo.controller';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule],
  providers: [RepoinfoService],
  controllers: [RepoinfoController],
})
export class RepoinfoModule {}
