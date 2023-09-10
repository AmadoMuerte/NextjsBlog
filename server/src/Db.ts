const mysql = require('mysql');

export class Db {
    connection: any;
    constructor() {
        this.connection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'blog'
        });
    }
    async checkUser(email: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.connection.query(
                'SELECT * FROM users WHERE email = ?',
                [email],
                (err: Error, rows: any) => {
                    if (err) {
                        console.error('ошибка проверки пользователя:', err);
                        reject(err);
                    } else {
                        resolve(rows.length > 0);
                    }
                }
            );
        });
    }
    async pushNewUser(email: string, password: string, name: string) {
        return new Promise<string>((resolve, reject) => {
            let responseMessage;
            try {
                this.checkUser(email).then((hasUser: boolean) => {
                    if (hasUser) {
                        responseMessage = 'Пользователь уже зарегистрирован';
                        console.log(responseMessage);
                        resolve(responseMessage);
                    } else {
                        this.connection.query(
                            'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
                            [email, password, name],
                            (err: Error, result: any) => {
                                if (err) {
                                    responseMessage = 'Произошла ошибка при добавлении нового пользователя';
                                    console.error('Ошибка при добавлении нового пользователя:', err);
                                    reject(responseMessage);
                                } else {
                                    responseMessage = 'Пользователь добавлен';
                                    console.log(responseMessage);
                                    resolve(responseMessage);
                                }
                            }
                        );
                    }
                });
            } catch (error) {
                responseMessage = 'Произошла ошибка при добавлении нового пользователя';
                console.error('Ошибка при проверке пользователя:', error);
                reject(responseMessage);
            }
        });
    }


    closeConnection() {
        this.connection.end();
    }
}
