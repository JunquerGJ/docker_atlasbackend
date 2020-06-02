import ContactService from './contact.service';
import { EntityController } from '../../shared/interfaces/interfaces';

class ContactController extends EntityController {
    constructor(){
        super("/contacts",new ContactService(),"Contact")
    }
}

export default ContactController;