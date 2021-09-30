import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('places.db');

export const initDatabase = () => {
    return new Promise(
        (resolve, reject) => {
            db.transaction((transaction) => {
                transaction.executeSql(
                    `CREATE TABLE IF NOT EXISTS places (
                        id INTEGER PRIMARY KEY NOT NULL,
                        title TEXT NOT NULL,
                        image TEXT NOT NULL,
                        address TEXT NOT NULL,
                        latitude REAL NOT NULL,
                        longitude REAL NOT NULL
                    );`,
                    [],
                    () => resolve(),
                    (errorTransaction, error) => reject(error)
                );
            });
        }
    );
};
