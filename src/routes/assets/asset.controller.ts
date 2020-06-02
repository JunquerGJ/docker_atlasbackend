import AssetService from './asset.service';
import { EntityController } from '../../shared/interfaces/interfaces';

class AssetController extends EntityController {
    constructor(){
        super("/assets",new AssetService(),"Asset")
    }
}

export default AssetController;