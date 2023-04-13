
    /* class connect database */
    class ConfigDatabase {
        /* attribute store info database */
        #informationDatabase; #mysql;
        constructor() {
            this.#informationDatabase = this.#getInformationDatabase;
            this.#mysql = require('mysql');
        }
        get #getInformationDatabase() {
            let informationDatabase = {
              host: "127.0.0.1",
              username: "root-np",
              password:"642/321Architecture?222",
              port:"3308",
              databasename:"employee"
            };
            return informationDatabase;
        }
        get getConnectDatabase() {
            let connect = this.#mysql.createConnection({
                host : this.#informationDatabase.host,
                user : this.#informationDatabase.username ,
                password : this.#informationDatabase.password ,
                port : this.#informationDatabase.port ,
                database : this.#informationDatabase.databasename
                /* left is syntax
                *  you must write some default
                *  host:...
                *  user:...
                *  password:...
                *  database:... */
            });
            /* check variable connect */
            connect.connect(function (errors) {
               if (errors) console.log(errors.message);
               else console.log('connect database successfully');
            });
            return connect;
        }
    }

    module.exports = ConfigDatabase; /* return Class */
