import  { EntityService } from '../../shared/interfaces/interfaces'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class AreaService extends EntityService {
    constructor(){
        super(prisma.area);
    }
}


export default AreaService;
