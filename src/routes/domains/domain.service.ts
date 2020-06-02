import  { EntityService } from '../../shared/interfaces/interfaces'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class DomainService extends EntityService {
    constructor(){
        super(prisma.domain);
    }

    public add = async (entityData) => {
        try {
            
            if(entityData.asset) {
                entityData.asset = {
                    connect: entityData.asset
                }
            }

            if(entityData.certificate){
                if(entityData.certificate.issuer){
                    entityData.certificate = {
                        create : entityData.certificate
                    }
                }else{
                    entityData.certificate = {
                        connect : { domainName : entityData.certificate.domainName }
                    }
                }
            }
            const entity = await prisma.domain.create({
                data: entityData
            })
            return entity;

        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    }
}


export default DomainService;
