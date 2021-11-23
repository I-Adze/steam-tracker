import { useCallback, useContext, useEffect, useState } from 'react';
import styles from './app.module.scss';
import { backend } from './backend';
import { SteamApp } from '@tracker/shared/core';

export function App() {
  const [requestData, setRequestData] = useState<SteamApp[]>([]);

  useEffect(() => {
    const getAllData = async () => {
      const data = await (await backend.getAllApps()).json();
      setRequestData(data);
    };
    getAllData();
  }, []);

  return (
    <ul>
      {requestData.slice(20, 40).map((app) => (
        <li key={app.appid}>
          {app.appid}: {app.name}
        </li>
      ))}
    </ul>
  );
}

export default App;
