import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { SteamApp } from '@tracker/shared/core';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

interface GetAppListRes {
  applist: {
    apps: SteamApp[];
  };
}

@Injectable()
export class AppService {
  private cache?: SteamApp[];

  constructor(private httpService: HttpService) {}

  public getData() {
    return this.cache
      ? of(this.cache)
      : this.httpService
          .get<GetAppListRes>(
            'http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json'
          )
          .pipe(
            map((res) => res.data.applist.apps),
            tap((data) => (this.cache = data))
          );
  }
}
