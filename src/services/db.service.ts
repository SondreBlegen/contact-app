import * as sqlite from 'sqlite3';
import { ContactPerson } from '../models/contactperson.model';

export class DbService {
    private db: sqlite.Database;

    constructor() {
        this.db = new sqlite.Database('F:\\code\\netpower\\coding_test\\backend\\database.db');

        this.setup();
    }

    private setup() {
        this.db.run('CREATE TABLE IF NOT EXISTS contactpersons (id TEXT NOT NULL PRIMARY KEY, firstname TEXT NOT NULL, lastname TEXT NOT NULL, phonenumber NUMBER, email TEXT NOT NULL)', (err) => {
            if (err) console.warn(err)
            console.log(this);
        });
    }

    public addContactPerson(data: any[]): Promise<any> {
        const sql = 'INSERT INTO contactpersons (id, firstname, lastname, phonenumber, email) values (?, ?, ?, ?, ?)';

        return new Promise((resolve, reject) => {
            this.db.run(sql, data, function (err) {
                if (err) {
                    console.log('Error running sql ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve({ res: `${this}` })
                }
            });
        });
    }

    public getContactPersons(): Promise<ContactPerson[]> {
        const sql = 'SELECT * FROM contactpersons order by lastname';

        return new Promise((resolve, reject) => {
            this.db.all(sql, [], function (err, rows) {
                if (err) {
                    console.log('Error running sql ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve(rows)
                }
            });
        });
    }

    public updateContactPerson(id, data: ContactPerson): Promise<any> {
        const sql = 'update contactpersons set firstname = ?, lastname = ?, phonenumber = ?, email = ? where id = ?';

        const params = [data.firstname, data.lastname, data.phonenumber, data.email, id];

        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    console.log('Error running sql ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve(`${this}`)
                }
            });
        });
    }

    public getContactById(id): Promise<ContactPerson> {
        const sql = 'SELECT * FROM contactpersons where id = ? order by lastname';

        return new Promise((resolve, reject) => {
            this.db.get(sql, [id], function (err, rows) {
                if (err) {
                    console.log('Error running sql ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve(rows)
                }
            });
        });
    }

    

    // public findContactPerson(query): Promise<any[]> {
    //     const sql = 'SELECT * FROM contactpersons where 1 = 1 ? order by lastname';

    //     const keys = Object.keys(query);
    //     let params: any[] = [];
    //     if (keys.length >= 1) {
    //         params = [`and ${keys[0]} like "${query[keys[0]]}"`];
    //     }

    //     return new Promise((resolve, reject) => {
    //         this.db.all(sql, params, function (err, rows) {
    //             if (err) {
    //                 console.log('Error running sql ' + sql)
    //                 console.log(err)
    //                 reject(err)
    //             } else {
    //                 resolve(rows)
    //             }
    //         });
    //     });
    // }
}