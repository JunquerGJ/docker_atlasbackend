import CWEService from './cwe.service';
import { EntityController } from '../../shared/interfaces/interfaces';

class CWEController extends EntityController {
    constructor(){
        super("/cwes",new CWEService(),"CWE")
    }
}

export default CWEController;