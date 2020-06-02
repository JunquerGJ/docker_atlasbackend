import CertificateService from './certificate.service';
import { EntityController } from '../../shared/interfaces/interfaces';

class CertificateController extends EntityController {
    constructor(){
        super("/certificates",new CertificateService(),"Contact")
    }
}

export default CertificateController;