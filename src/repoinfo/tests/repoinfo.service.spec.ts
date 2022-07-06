import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { RepoinfoService } from '../repoinfo.service';
describe('RepoinfoService', () => {
  let service: RepoinfoService;
  const cvs =
    'rank,item,repo_name,stars,forks,language,repo_url,username,issues,last_commit,description' +
    '\n' +
    '1,top-100-stars,freeCodeCamp,307804,23461,JavaScript,https://github.com/freeCodeCamp/freeCodeCamp,freeCodeCamp,278,2020-01-01T06:36:41Z,The https://www.freeCodeCamp.org open source codebase and curriculum. Learn to code for free together with millions of people.' +
    '\n' +
    '2,top-100-stars,996.ICU,248761,21222,Rust,https://github.com/996icu/996.ICU,996icu,16750,2019-12-17T12:25:00Z,Repo for counting stars and contributing. Press F to pay respect to glorious developers.' +
    '\n' +
    '3,top-100-stars,react,141653,27114,JavaScript,https://github.com/facebook/react,facebook,985,2019-12-31T17:03:25Z,"A declarative, efficient, and flexible JavaScript library for building user interfaces."' +
    '\n' +
    '4,top-100-stars,bootstrap,137908,67810,JavaScript,https://github.com/twbs/bootstrap,twbs,422,2020-01-01T09:05:40Z,"The most popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web."' +
    '\n' +
    '5,top-100-stars,free-programming-books,134428,33391,,https://github.com/EbookFoundation/free-programming-books,EbookFoundation,44,2019-12-30T18:14:42Z,:books: Freely available programming books' +
    '\n' +
    '6,top-100-stars,awesome,122567,16351,,https://github.com/sindresorhus/awesome,sindresorhus,20,2019-12-29T13:27:55Z,😎 Awesome lists about all kinds of interesting topics' +
    '\n' +
    '7,top-100-stars,You-Dont-Know-JS,113911,22797,,https://github.com/getify/You-Dont-Know-JS,getify,116,2019-12-29T10:43:33Z,A book series on JavaScript. @YDKJS on twitter.' +
    '\n' +
    '8,top-100-stars,ohmyzsh,101190,18402,Shell,https://github.com/ohmyzsh/ohmyzsh,ohmyzsh,783,2020-01-01T03:45:53Z,"🙃 A delightful community-driven (with nearly 1,500 contributors) framework for managing your zsh configuration. Includes 200+ optional plugins (rails, git, OSX, hub, capistrano, brew, ant, php, python, etc), over 140 themes to spice up your morning, and an auto-update tool so that makes it easy to keep up with the latest updates from the community."' +
    '\n' +
    '9,top-100-stars,coding-interview-university,95493,28090,,https://github.com/jwasham/coding-interview-university,jwasham,72,2020-01-01T05:27:00Z,A complete computer science study plan to become a software engineer.' +
    '\n' +
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          RepoinfoService,
          {
            provide: HttpService,
            useValue: {
              get: () => {
                return of({
                  data: cvs.toLocaleLowerCase(),
                });
              },
            },
          },
        ],
      }).compile();

      service = module.get<RepoinfoService>(RepoinfoService);
    });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return an array of RepoInfo', async () => {
    const result = await service.getFile('2020-01-01');

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(10);
    expect(result[0].rank).toBe('1');
    expect(result).toBeDefined();
  });

  it('should return an array of RepoInfo', async () => {
    const result = await service.topLenguage('Javascript', 10, 'json');
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(3);
    expect(result).toBeDefined();
  });

  it('should return an csv of ReposInfo', async () => {
    const result = await service.topLenguage('Javascript', 10, 'csv');
    expect(typeof result).toBe('string');
    expect(result).toBeDefined();
  });
});
