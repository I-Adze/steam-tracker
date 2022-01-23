import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;
  let appService: AppService;
  let subject: AppController;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    })
      .overrideProvider(AppService)
      .useValue({ getData: jest.fn(), getForId: jest.fn() })
      .compile();
  });

  beforeEach(() => {
    appService = app.get(AppService);
    subject = app.get(AppController);
  });

  describe('getData', () => {
    it('should return data from AppService on getData', () => {
      const dataObservable = of();
      jest.spyOn(appService, 'getData').mockReturnValue(dataObservable);
      expect(subject.getData()).toBe(dataObservable);
    });

    it('should return details from AppService on getAppDetails', () => {
      const id = 1234;
      jest.spyOn(appService, 'getForId').mockReturnValue(of());

      subject.getAppDetails({ id });

      expect(appService.getForId).toHaveBeenCalledWith(id);
    });
  });
});
