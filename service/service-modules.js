
    const ConfigDatabase = require('../configuration/config-database');

    class ServiceModules extends ConfigDatabase{

        #express; #path;
        constructor() {
            super();
            this.#express = this.#getExpress;
            this.#path = this.#getPath;
        }
        get #getExpress() {
            return require('express');
        }

        get #getPath() {
            return require('path');
        }
        get retrieveExpress() {
            return this.#express;
        }
        get retrievePath() {
            return this.#path;
        }

    }

    module.exports = ServiceModules;