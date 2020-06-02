import  { EntityService } from '../../shared/interfaces/interfaces'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class IPService extends EntityService {
    constructor(){
        super(prisma.iP);
    }

    public add = async(entityData) => {
        try {

            if(entityData.network){
                if(entityData.network.description){
                    entityData.network = {
                        create : entityData.network
                    }
                }else{
                    entityData.network = {
                        connect : {
                            name : entityData.network.name
                        }
                    }
                }
            }
            
            const entity = await prisma.iP.create({
                data : entityData
            })
            return entity;
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    }

    public modify = async(id,entityData) => {
        var updateData = {}
        if(entityData.ip){
            updateData["ip"] = entityData.ip
        }

        if(entityData.network){
            updateData["network"] = {
                connect : {
                    id : entityData.network.id
                }
            }
        }
        if(Object.keys(updateData).length==0)
            throw new Error("Nothing to update")

        try {
            const entity = await prisma.iP.update({
                where : { id : id},
                data : updateData
            })
            return entity;
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }        


    }
}




export default IPService;
