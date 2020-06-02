import { getRepository } from 'typeorm';
import Permission from '../../entities/permission.entity';



class FunctionalityService {
    private permissionRepository = getRepository(Permission);


    public getPermission = async (id : number) => {
        const permission = await this.permissionRepository.findOne(id);
        return(permission);
    }

}
