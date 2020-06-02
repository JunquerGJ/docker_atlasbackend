import IPService from './ip.service';
import { EntityController } from '../../shared/interfaces/interfaces';

class IPController extends EntityController {
    constructor(){
        super("/ips",new IPService(),"IP")
    }
}

export default IPController;