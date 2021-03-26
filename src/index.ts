import { LoggerService } from './services/logger.service';
import {App} from './server';
import * as winston from 'winston';

export class Run {
    // Variables available in the class
    private _logger: winston.Logger;
    private port = 8080;

    constructor() {
        // Setting up the logger service
        this._logger = new LoggerService().logger;
    }

    // Entrypoint for the application
    public runSequence() {
        new App().app.listen(this.port, () => {
            this._logger.info(`Server started on port ${this.port}`);
        });
    }
}

// Calling the runSqeuence function which will be the entrypoint for the application
new Run().runSequence();
