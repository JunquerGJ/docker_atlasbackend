import NetworkService from './network.service';
import { EntityController } from '../../shared/interfaces/interfaces';

class NetworkController extends EntityController {
    constructor(){
        super("/networks",new NetworkService(),"Network")
    }
}

export default NetworkController;