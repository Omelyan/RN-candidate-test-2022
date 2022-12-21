import { useEffect, useRef, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import { loadSession, SessionData } from '~/context';
import { openDatabase } from '~/api/database';

export function useCachedResources() {
  const [isLoading, setLoading] = useState(true);
  const initialSessionData = useRef<SessionData>();

  useEffect(
    () => {
      (async function () {
        try {
          SplashScreen.preventAutoHideAsync();

          // loading or creating database
          openDatabase();

          // loading session data if any
          initialSessionData.current = await loadSession();

          //
        } catch (e) {
          console.warn(e);
          //
        } finally {
          setLoading(false);
          SplashScreen.hideAsync();
        }
      })();
    },
    //
    []
  );

  return { isLoading, initialSessionData };
}
