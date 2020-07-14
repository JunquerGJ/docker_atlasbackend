import  { EntityService } from '../../shared/interfaces/interfaces'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class NetworkService extends EntityService {
    constructor(){
        super(prisma.network);
    }

    public static addNetwork(entityData){
        var aux = {}
        if(entityData.description){
            delete entityData.id
            aux["create"] = entityData
            
        }else{
                aux["connect"] = { name : entityData.name }
        }
        return aux;
    }
}


export default NetworkService;
