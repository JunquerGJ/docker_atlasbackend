import  { EntityService } from '../../shared/interfaces/interfaces'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class CharacteristicService extends EntityService {
    constructor(){
        super(prisma.characteristic);
    }
}


export default CharacteristicService;
