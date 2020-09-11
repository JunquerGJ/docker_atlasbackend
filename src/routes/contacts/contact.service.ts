import  { EntityService } from '../../shared/interfaces/interfaces'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class ContactService extends EntityService {


    public static addContact(entityData){
        var aux = []
        var i = 0;
        for (i = 0; i < entityData.length; i++) {
            delete entityData[i].contact.id
            aux.push({
                functionality : entityData[i].functionality,
                contact : {
                    connectOrCreate : {
                        where : { name : entityData[i].contact.name},
                        create : entityData[i].contact
                        
                    }
                }
            })
        }
        return aux;
    }
    
   /* public static addContact(entityData){
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
    }*/

    public delete = async (id) => {
        try {
            if (isNaN(id)) {
                throw new Error("Wrong ID")
            }
            await prisma.$executeRaw(`DELETE FROM "ContactToServer" where "contactId" = ${id}`)
            await prisma.$executeRaw(`DELETE FROM "ContactToAsset" where "contactId" = ${id}`)
            const entity = await prisma.contact.delete({
                where: {
                    id: id
                }
            })
            return entity
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    }
    
    constructor(){
        super(prisma.contact);
    }
}


export default ContactService;
