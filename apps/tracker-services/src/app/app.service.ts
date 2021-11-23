import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { SteamApp } from '@tracker/shared/core';
import { map } from 'rxjs/operators';

interface GetAppListRes {
  applist: {
    apps: SteamApp[];
  };
}

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}
  getData() {
    return this.httpService
      .get<GetAppListRes>(
        'http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json'
      )
      .pipe(map((res) => res.data.applist.apps));
  }
}
