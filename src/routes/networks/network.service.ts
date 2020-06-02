import  { EntityService } from '../../shared/interfaces/interfaces'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class NetworkService extends EntityService {
    constructor(){
        super(prisma.network);
    }
}


export default NetworkService;
