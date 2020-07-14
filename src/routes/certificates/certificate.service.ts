import  { EntityService } from '../../shared/interfaces/interfaces'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class CertificateService extends EntityService {
    constructor(){
        super(prisma.certificate);
    }


    public static addCertificate(entityData) {
        var aux = {

        }
        if(entityData.issuer){
            delete entityData.id
            aux["create"] = entityData
            
        }else{
                aux["connect"] = { domainName : entityData.domainName }
        }
        return aux
    }
}


export default CertificateService;
