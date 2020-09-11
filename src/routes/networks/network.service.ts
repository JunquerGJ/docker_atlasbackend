import  { EntityService } from '../../shared/interfaces/interfaces'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class NetworkService extends EntityService {
    constructor(){
        super(prisma.network);
    }

    public static addNetwork(entityData){
        var aux = {
            connectOrCreate : {
                where : {
                    name : entityData.name
                },
                create : {
                    name : entityData.name,
                    description : entityData.description ? entityData.description : ""
                }
            }
        }
        return aux;
    }

    public delete = async (id) => {
        try {
            await prisma.iP.deleteMany({
                where: {
                    networkId : id
                }
            })
            console.log("eheheheheh")
            console.log(id)
            const entity = await prisma.network.delete({
                where : {
                    id : id
                }
            })
            return entity
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    }
    
    /*public static addNetwork(entityData){
        var aux = {}
        if(entityData.description){
            delete entityData.id
            aux["create"] = entityData
            
        }else{
                aux["connect"] = { name : entityData.name }
        }
        return aux;
    }*/
}


export default NetworkService;
