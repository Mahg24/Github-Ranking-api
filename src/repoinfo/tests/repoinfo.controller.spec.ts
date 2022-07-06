import { Test, TestingModule } from '@nestjs/testing';
import { RepoinfoController } from '../repoinfo.controller';
import { RepoinfoService } from '../repoinfo.service';

describe('RepoinfoController', () => {
  let controller: RepoinfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepoinfoController],
      providers: [
        {
          provide: RepoinfoService,
          useValue: {
            topLenguage: jest.fn().mockImplementationOnce(() => {
              return Promise.resolve([
                {
                  name: 'test',
                  language: 'test',
                  stars: 1,
                  forks: 1,
                  contributors: 1,
                  issues: 1,
                  pullRequests: 1,
                  commits: 1,
                  releases: 1,
                  createdAt: '2020-01-01',
                  updatedAt: '2020-01-01',
                },
              ]);
            }),
            getFile: jest.fn().mockImplementationOnce(() => {
              return Promise.resolve([
                {
                  name: 'test',
                  language: 'test',
                  stars: 1,
                  forks: 1,
                  contributors: 1,
                  issues: 1,
                  pullRequests: 1,
                  commits: 1,
                  releases: 1,
                  createdAt: '2020-01-01',
                  updatedAt: '2020-01-01',
                },
              ]);
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<RepoinfoController>(RepoinfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a list of repositories', async () => {
    const res = mockResponse();
    await controller.getFile(res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(true).toBe(true);
  });
  it('should return a list of repositories', async () => {
    const res = mockResponse();
    await controller.topLenguage(res, 'test', 1, 'json');
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockImplementation((code: number) => {
    res.statusCode = code;
    return res;
  });
  res.json = jest.fn();
  return res;
};
