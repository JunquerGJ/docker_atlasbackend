import CharacteristicService from './characteristic.service';
import { EntityController } from '../../shared/interfaces/interfaces';

class CharacteristicController extends EntityController {
    constructor(){
        super("/characteristics",new CharacteristicService(),"Characteristic")
    }
}

export default CharacteristicController;