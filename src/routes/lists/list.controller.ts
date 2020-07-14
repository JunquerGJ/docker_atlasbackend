import ListService from './list.service';
import { EntityController } from '../../shared/interfaces/interfaces';

class ListController extends EntityController {
    constructor(){
        super("/lists",new ListService(),"List")
    }
}

export default ListController;