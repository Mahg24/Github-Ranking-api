import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as csvtojson from 'csvtojson';
import { Parser } from 'json2csv';
import { RepoInfo } from './interfaces/repoInfo.dto';
@Injectable()
export class RepoinfoService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * It takes a date as a string, and returns a promise of an array of RepoInfo objects
   * @param {string} date - string - The date of the file you want to get.
   * @returns An array of RepoInfo objects
   */
  async getFile(date: string): Promise<RepoInfo[]> {
    const data = await firstValueFrom(
      this.httpService.get(
        `https://raw.githubusercontent.com/EvanLi/Github-Ranking/master/Data/github-ranking-${date}.csv`,
      ),
    );
    return csvtojson().fromString(data.data);
  }

  /**
   * It takes a language, a number of repos to return, and an optional format (defaults to json) and
   * returns an array of RepoInfo objects or a csv string
   * @param {string} lenguage - The language you want to search for.
   * @param {number} top - number - The number of repositories to return.
   * @param [format=json] - The format of the output. It can be either json or csv.
   * @returns the top repositories of a given language.
   */
  async topLenguage(
    lenguage: string,
    top: number,
    format = 'json',
  ): Promise<RepoInfo[] | string> {
    const data = await this.getFile(new Date().toISOString().split('T')[0]);
    const topLenguage = data
      .filter((item) => item.language === lenguage.toLowerCase())
      .slice(0, top);
    if (format === 'json') {
      return topLenguage;
    } else if (format === 'csv') {
      const parser = new Parser();
      const csv = parser.parse(topLenguage);
      return csv;
    }
  }
}
