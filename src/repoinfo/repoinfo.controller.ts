import { Controller, Get, Param, Query, Res, HttpStatus } from '@nestjs/common';
import { RepoinfoService } from './repoinfo.service';
import { Response } from 'express';
@Controller('repoinfo')
export class RepoinfoController {
  constructor(private readonly repoinfoService: RepoinfoService) {}
  @Get()
  async getFile(@Res() res: Response) {
    const result = await this.repoinfoService.getFile('2020-01-01');
    if (result) {
      res.status(HttpStatus.OK).json(result);
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Not found' });
    }
  }

  @Get('topLenguage/:lenguage/:top')
  async topLenguage(
    @Res() res: Response,
    @Param('lenguage') lenguage: string,
    @Param('top') top: number,
    @Query('format') format,
  ) {
    const result = await this.repoinfoService.topLenguage(
      lenguage,
      top,
      format,
    );
    if (result.length > 0) {
      if (format === 'json' || format === undefined) {
        res.status(HttpStatus.OK).json(result);
      }
      if (format === 'csv') {
        res.status(HttpStatus.OK).send(result);
      }
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Not found' });
    }
  }
}
