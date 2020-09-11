import { EntityService } from '../../shared/interfaces/interfaces'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class CharacteristicService extends EntityService {
    constructor() {
        super(prisma.characteristic);
    }

/*
    public static addCharacteristics = async (entityData) => {
        var i = 0;
        for (i = 0; i < entityData.length; i++) {
            await prisma.characteristic.upsert({
                update: { name: entityData[i].name },
                create: { name: entityData[i].name },
                where: { name: entityData[i].name }
            })
        }
    }*/
    public static addCharacteristics(entityData){
        var aux = {
            connectOrCreate : []
        }
        var i = 0;
        for (i = 0; i < entityData.length; i++) {
            aux.connectOrCreate.push({
                create : entityData[i],
                where : entityData[i]
            })
        }        
        return aux
    } 
}


export default CharacteristicService;
