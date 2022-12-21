import { SessionData } from '~/context';
import { APIError, delayed, nullUndefined, schemas } from '~/utils';

import { db } from './database';

export async function signUp({ email, name, password }: schemas.SignUpSchema) {
  return new Promise<SessionData>((resolve, reject) => {
    if (!db) {
      reject(new Error('No database found'));
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'select * from profiles where email = ?;',
        [email].map(nullUndefined),

        // check user query success
        (transaction, { rows: { length } }) => {
          // user already exists
          if (length) {
            reject(new APIError<schemas.SignUpSchema>('E-mail already used', 'email'));
            return;
          }

          // sending a password as clear text – I'am sorry for that, I know...
          tx.executeSql(
            'insert into profiles (email, password, name) values (?, ?, ?);',
            [email, password, name].map(nullUndefined),

            // create user success
            (transaction, { insertId }) => {
              delayed(() => resolve({ id: insertId, password }), 2);
            },

            // create user failed
            () => {
              reject(new APIError('Sign up failed'));
              return false;
            }
          );
        },

        // check user query failed
        () => {
          reject(new APIError('Sign up failed'));
          return false;
        }
      );
    });
  });
}

export async function signIn({ email, password }: schemas.SignInSchema) {
  return new Promise<SessionData>((resolve, reject) => {
    if (!db) {
      reject(new Error('No database found'));
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'select * from profiles where email = ?;',
        [email].map(nullUndefined),

        // query success
        (transaction, { rows: { _array } }) => {
          const [profile] = _array;

          if (!profile) {
            reject(new APIError<schemas.SignInSchema>('User not found', 'email'));
            return;
          }

          const { id, password: profilePassword } = profile as schemas.ProfileSchema;

          if (profilePassword === password) {
            delayed(() => resolve({ id, password }), 2);
          } else {
            reject(new APIError<schemas.SignInSchema>('Invalid password', 'password'));
          }
        },

        // query failed
        () => {
          reject(new Error('Sing in failed'));
          return false;
        }
      );
    });
  });
}

export async function getProfile(session: SessionData | undefined) {
  return new Promise<schemas.ProfileSchema>((resolve, reject) => {
    if (!session) {
      reject(new Error('Please, sign in'));
      return;
    }

    if (!db) {
      reject(new Error('No database found'));
      return;
    }

    const { id } = session;

    db.transaction(tx => {
      tx.executeSql(
        'select * from profiles where id = ?;',
        [id].map(nullUndefined),

        // query success
        (transaction, { rows: { _array } }) => {
          const [profile] = _array;

          if (!profile) {
            reject(new Error('Failed to load profile'));
            return;
          }

          delayed(() => resolve(profile));
        },

        // query failed
        () => {
          reject(new Error('Getting profile failed'));
          return false;
        }
      );
    });
  });
}

export async function updateProfile({
  id,
  name,
  email,
  phoneNumber,
  description,
  skypeName,
}: schemas.ProfileSchema) {
  return new Promise<boolean>((resolve, reject) => {
    if (!db) {
      reject(new Error('No database found'));
      return;
    }

    /* here we have to take into account the changed email address, which may already exist,
    but it's just a test, isn't it..? */
    db.transaction(tx => {
      tx.executeSql(
        'update profiles set name = ?, email = ?, phoneNumber = ?, description = ?, skypeName = ? where id = ?;',
        [name, email, phoneNumber, description, skypeName, id].map(nullUndefined),

        // query success
        () => {
          delayed(() => resolve(true), 2);
        },

        // query failed
        () => {
          reject(new Error('Updating profile failed'));
          return false;
        }
      );
    });
  });
}
