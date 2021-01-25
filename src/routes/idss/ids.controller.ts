import IdsService from './ids.service';
import { EntityController } from '../../shared/interfaces/interfaces';

class IdsController extends EntityController {
    constructor(){
        super("/idss",new IdsService(),"Ids")
    }
}

export default IdsController;