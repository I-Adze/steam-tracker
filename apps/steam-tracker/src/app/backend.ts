import { SteamApp, SteamAppDetails } from '@tracker/shared/core';

export const backend = {
  getAllApps: () =>
    fetch('/api').then((res) => res.json() as Promise<SteamApp[]>),

  getAppDetails: (id: number) =>
    fetch(`/api/${id}`).then((res) => res.json() as Promise<SteamAppDetails>),
};
