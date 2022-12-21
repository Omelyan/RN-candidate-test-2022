import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

const dbName = 'main.db';
const dirName = 'SQLite';

export let db: SQLite.WebSQLDatabase | undefined;

export async function openDatabase() {
  const dirInfo = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}${dirName}`);

  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}${dirName}`);
  }

  const currentDB = SQLite.openDatabase(dbName);

  currentDB.transaction(
    tx => {
      tx.executeSql(
        'create table if not exists profiles (\
          id integer primary key not null,\
          email varchar(120),\
          password varchar(255),\
          name varchar(40),\
          phoneNumber varchar(20),\
          description varchar(100),\
          skypeName varchar(50),\
          avatarURI varchar(255)\
          );'
      );
    },

    error => {
      throw new Error(error.message);
    },

    () => {
      db = currentDB;
    }
  );
}
