import  { EntityService } from '../../shared/interfaces/interfaces'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class ContactService extends EntityService {
    constructor(){
        super(prisma.contact);
    }
}


export default ContactService;
