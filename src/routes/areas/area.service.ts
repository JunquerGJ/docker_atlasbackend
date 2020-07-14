import  { EntityService } from '../../shared/interfaces/interfaces'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class AreaService extends EntityService {
    constructor(){
        super(prisma.area);
    }

    public static addArea(entityData){
        let aux = {

        }
        if(entityData.description){
            delete entityData.id
            aux["create"] = entityData
        }else{
            aux["connect"] = { name : entityData.name }
        }
        return aux;
    }
}


export default AreaService;
