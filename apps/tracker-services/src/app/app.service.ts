import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, tap } from 'rxjs/operators';
import { SteamApp } from '@tracker/shared/core';

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
