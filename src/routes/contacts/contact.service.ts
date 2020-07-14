import  { EntityService } from '../../shared/interfaces/interfaces'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class ContactService extends EntityService {
    
    public static addContact(entityData){
        var aux = []
        var i = 0;
        for (i = 0; i < entityData.length; i++) {
            if (entityData[i].contact.email) {
                delete entityData[i].contact.id
                aux.push({
                    functionality: entityData[i].functionality,
                    contact: {
                        create: entityData[i].contact

                    }
                })
            } else {
                aux.push({
                    functionality: entityData[i].functionality,
                    contact: {
                        connect: {
                            name: entityData[i].contact.name
                        }
                    }
                })
            }
        }
        return aux   
    }
    
    constructor(){
        super(prisma.contact);
    }
}


export default ContactService;
