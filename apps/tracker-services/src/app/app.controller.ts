import { Controller, Get, Param } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get(':id')
  getAppDetails(@Param() params: { id: number }) {
    const id = params.id;
    return this.appService.getForId(id).pipe(
      map((res) => {
        const data = res.data[id];
        if (!data.success) {
          throw new Error(`Steam API failed for app ${id}`);
        }
        if (Array.isArray(data.data)) {
          throw new Error(`Steam returned empty array for app ${id}`);
        }
        return data.data;
      })
    );
  }
}
