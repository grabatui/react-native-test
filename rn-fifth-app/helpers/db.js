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
                    (successTransaction, result) => resolve(result),
                    (errorTransaction, error) => reject(error)
                );
            });
        }
    );
};

export const insertPlace = (title, image, address, latitude, longitude) => {
    return new Promise(
        (resolve, reject) => {
            db.transaction((transaction) => {
                transaction.executeSql(
                    `INSERT INTO places (title, image, address, latitude, longitude)
                    VALUES (?, ?, ?, ?, ?);`,
                    [
                        title,
                        image,
                        address,
                        latitude,
                        longitude,
                    ],
                    (successTransaction, result) => resolve(result),
                    (errorTransaction, error) => reject(error)
                );
            });
        }
    );
};

export const getPlaces = () => {
    return new Promise(
        (resolve, reject) => {
            db.transaction((transaction) => {
                transaction.executeSql(
                    `SELECT * FROM places;`,
                    [],
                    (successTransaction, result) => resolve(result),
                    (errorTransaction, error) => reject(error)
                );
            });
        }
    );
};
