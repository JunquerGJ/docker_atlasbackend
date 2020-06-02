import AuditService from './audit.service';
import { EntityController } from '../../shared/interfaces/interfaces';

class AuditController extends EntityController {
    constructor(){
        super("/audits",new AuditService(),"Audit")
    }
}

export default AuditController;