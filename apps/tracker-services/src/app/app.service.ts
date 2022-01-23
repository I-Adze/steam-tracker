import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { SteamApp, SteamAppDetails } from '@tracker/shared/core';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

interface GetAppListRes {
  applist: {
    apps: SteamApp[];
  };
}

interface AppDetailsRes {
  [id: number]: {
    success: boolean;
    data: SteamAppDetails;
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

  public getForId(id: number) {
    return this.httpService.get<AppDetailsRes>(
      `https://store.steampowered.com/api/appdetails?filters=price_overview&appids=${id}&cc=gb`
    );
  }
}
