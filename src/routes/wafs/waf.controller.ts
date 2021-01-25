import WafService from './waf.service';
import { EntityController } from '../../shared/interfaces/interfaces';

class WafController extends EntityController {
    constructor(){
        super("/wafs",new WafService(),"Waf")
    }
}

export default WafController;