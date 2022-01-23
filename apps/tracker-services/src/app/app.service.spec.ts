import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { Subject } from 'rxjs';
import { AppService } from './app.service';

describe('AppService', () => {
  const httpResponse = new Subject();
  let app: TestingModule;
  let subject: AppService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [AppService, HttpService],
    })
      .overrideProvider(HttpService)
      .useValue({ get: () => httpResponse.asObservable() })
      .compile();
  });

  beforeEach(() => {
    subject = app.get(AppService);
  });

  describe('getData', () => {
    it('should create', () => {
      expect(subject).toBeDefined();
    });
  });
});
