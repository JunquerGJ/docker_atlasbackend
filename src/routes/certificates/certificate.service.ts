import  { EntityService } from '../../shared/interfaces/interfaces'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class CertificateService extends EntityService {
    constructor(){
        super(prisma.certificate);
    }
}


export default CertificateService;
