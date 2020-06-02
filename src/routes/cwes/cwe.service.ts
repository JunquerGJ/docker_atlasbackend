import  { EntityService } from '../../shared/interfaces/interfaces'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class CWEService extends EntityService {
    constructor(){
        super(prisma.cWE);
    }
}


export default CWEService;
