import React, { createContext, useState } from 'react';
import * as yup from 'yup';

import { AsyncStorage, queryClient } from '~/services';

const sessionDataSchema = yup.object({
  id: yup.number().optional(),
  password: yup.string().optional(),
});

export type SessionData = yup.TypeOf<typeof sessionDataSchema>;

interface Session {
  data?: SessionData;

  startSession: (data: SessionData) => void;
  clearSession: () => void;
}

export const SessionContext = createContext<Session | undefined>(undefined);

interface SessionProviderProps {
  initialSessionData?: SessionData;
}

export const SessionProvider = ({
  initialSessionData,
  children,
}: React.PropsWithChildren<SessionProviderProps>) => {
  const [data, setData] = useState(initialSessionData);

  const value: Session = {
    data,

    startSession(data: SessionData) {
      setData(data);
      saveSession(data);
    },

    clearSession() {
      setData(undefined);
      queryClient.clear();
      deleteSession();
    },
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export async function loadSession(): Promise<SessionData | undefined> {
  const data = await AsyncStorage.load('session');
  const isValid = await sessionDataSchema.isValid(data, {
    strict: true,
    abortEarly: true,
  });

  if (isValid) return data;
  return undefined;
}

function saveSession(data: SessionData) {
  return AsyncStorage.save('session', data);
}

function deleteSession() {
  return AsyncStorage.remove('session');
}
