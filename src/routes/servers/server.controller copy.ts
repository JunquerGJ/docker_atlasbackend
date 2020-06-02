import ServerService from './server.service';
import { EntityController } from '../../shared/interfaces/interfaces';

class ServerController extends EntityController {
    constructor(){
        super("/servers",new ServerService(),"Server")
    }
}

export default ServerController;