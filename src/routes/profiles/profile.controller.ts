import ProfileService from './profile.service';
import { EntityController } from '../../shared/interfaces/interfaces';

class ProfileController extends EntityController {
    constructor(){
        super("/profiles",new ProfileService(),"Profile")
    }
}

export default ProfileController;