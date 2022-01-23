import { SteamApp, SteamAppDetails } from '@tracker/shared/core';
import React, { useEffect, useState } from 'react';
import './app.scss';
import { backend } from './backend';

export function App() {
  const [requestData, setRequestData] = useState<SteamApp[]>([]);
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
  const [details, setDetails] = useState<{ [key: number]: SteamAppDetails }>(
    {}
  );

  useEffect(() => {
    const getAllData = async () => {
      const data = await backend.getAllApps();
      setRequestData(data);
    };
    getAllData();
  }, []);

  async function fetchDetails(appid: number) {
    details[appid] = await backend.getAppDetails(appid);
    setDetails({ ...details });
  }

  return (
    <dl>
      {requestData.slice(0, 200).map((app) => (
        <div className="list-item">
          <dt key={app.appid}>
            <button
              className="invisibutton"
              onClick={() => {
                setSelectedId(app.appid);
                fetchDetails(app.appid);
              }}
            >
              {app.appid}: {app.name}
            </button>
          </dt>
          {app.appid === selectedId ? (
            <dd>
              {details[app.appid]?.price_overview?.final_formatted ??
                'No Price Available'}
            </dd>
          ) : undefined}
        </div>
      ))}
    </dl>
  );
}

export default App;
