import { Request, Response, Application } from 'express';
import { ContactPerson } from '../../models/contactperson.model';
import {DbService} from '../../services/db.service';
import {v4 as uuidv4} from 'uuid';

export class Routes {
    _dbService: DbService = new DbService();
    
    constructor() {}

    public routes(app: Application): void {
        app.route('/contactpersons')
        .get(async (req: Request, res: Response) => {
            const data = await this._dbService.getContactPersons();
            res.status(200).send(data);
        })
        .post(async (req: Request, res: Response) => {
            const body: ContactPerson = req.body;
            if (!body.email || !body.firstname || !body.lastname || !body.phonenumber) {
                return res.status(400).send({message: 'Missing parameters...'})
            }

            body.id = uuidv4();

            const data = await this._dbService.addContactPerson([body.id, body.firstname, body.lastname, body.phonenumber, body.email]);
            res.status(200).send(data);
        });


        app.route('/contactpersons/:id')
        .get(async (req: Request, res: Response) => {

            const data = await this._dbService.getContactById(req.params.id);
            res.status(200).send(data);
        })
        .put(async (req: Request, res: Response) => {
            const body: ContactPerson = req.body;
            if (!body.email || !body.firstname || !body.lastname || !body.phonenumber) {
                return res.status(400).send({message: 'Missing parameters...'})
            }

            const data = await this._dbService.updateContactPerson(req.params.id, body);
            res.status(200).send({message: `${data}`});
        })



        // app.route('/contactpersons/find')
        // .get(async (req: Request, res: Response) => {
        //     const query = req.query;
        //     const data = await this._dbService.findContactPerson(query);
        //     res.status(200).send(data);
        // })
    }

}