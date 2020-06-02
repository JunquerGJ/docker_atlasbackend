import AreaService from './area.service';
import { EntityController } from '../../shared/interfaces/interfaces';

class AreaController extends EntityController {
    constructor(){
        super("/areas",new AreaService(),"Area")
    }
}

export default AreaController;