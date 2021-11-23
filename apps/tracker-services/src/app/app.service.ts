import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}
  getData() {
    return this.httpService
      .get(
        'http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json'
      )
      .pipe(map((res) => ({ ...res, data: res.data.appList.apps })));
  }
}
