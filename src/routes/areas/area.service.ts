import  { EntityService } from '../../shared/interfaces/interfaces'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class AreaService extends EntityService {
    constructor(){
        super(prisma.area);
    }
    /*
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
    }*/

    public static addArea(entityData){
        var aux = {
            connectOrCreate : {
                where : {
                    name : entityData.name
                },
                create : {
                    name : entityData.name,
                    description : entityData.description ? entityData.description : ""
                }
            }
        }
        return aux;
    }
}


export default AreaService;
