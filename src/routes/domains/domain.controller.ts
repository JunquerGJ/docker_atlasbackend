import DomainService from './domain.service';
import { EntityController } from '../../shared/interfaces/interfaces';

class DomainController extends EntityController {
    constructor(){
        super("/domains",new DomainService(),"Domain")
    }
}

export default DomainController;