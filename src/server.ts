import * as express from 'express';
import {Routes} from './api/routes/routes'
import * as cors from 'cors';

export class App {
    public app: express.Application;
    public _routes: Routes = new Routes()

    constructor() {
        this.app = express();
        this.config();
        this._routes.routes(this.app);
    }
    private config() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }
}