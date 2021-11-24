import { SteamApp } from '@tracker/shared/core';
import { useEffect, useState } from 'react';
import './app.scss';
import { backend } from './backend';

export function App() {
  const [requestData, setRequestData] = useState<SteamApp[]>([]);
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const getAllData = async () => {
      const data = await (await backend.getAllApps()).json();
      setRequestData(data);
    };
    getAllData();
  }, []);

  return (
    <dl>
      {requestData.slice(0, 40).map((app) => (
        <dd className="list-item" key={app.appid}>
          <button
            className="invisibutton"
            onClick={() => setSelectedId(app.appid)}
          >
            <span>
              {app.appid}: {app.name}
            </span>
          </button>
          {app.appid === selectedId ? <span>{app.name}</span> : null}
        </dd>
      ))}
    </dl>
  );
}

export default App;
