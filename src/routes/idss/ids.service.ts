import { EntityService } from '../../shared/interfaces/interfaces'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class IdsService extends EntityService {
    constructor() {
        super(prisma.iDS);
    }


    public static addIds(entityData){
        var aux = {
            connectOrCreate : []
        }
        var i = 0;
        for (i = 0; i < entityData.length; i++) {
            delete entityData[i].id
            delete entityData[i].servers
            

            aux.connectOrCreate.push({
                create : entityData[i],
                where : { name : entityData[i].name }
            })   
        }
        return aux;
    }

   /* public static addLists(entityData) {
        var aux = {
            connect: [],
            create: []
        }
        var i = 0;
        for (i = 0; i < entityData.length; i++) {
            if ("description" in entityData[i]) {
                delete entityData[i].id
                delete entityData[i].domains

                aux.create.push(entityData[i])
            } else {
                aux.connect.push({
                    name: entityData[i].name
                })
            }
        }

        return aux;
    }*/

    public add = async (entityData) => {
        try {
            if (entityData.servers) {
                entityData.servers = {
                    connect: entityData.servers
                }
            }

            const entity = await prisma.iDS.create({
                data: entityData
            })
            return entity;
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    public modify = async (id, entityData) => {
        try {
            if (entityData.servers) {
                var aux = []
                var i = 0;
                for (i = 0; i < entityData.servers.length; i++) {
                    aux.push({ id: entityData.servers[i].id })
                }
                entityData.servers = {
                    set: aux
                }
            }

            const entity = await prisma.iDS.update({
                where: { id: id },
                data: entityData
            })
            return entity;
        } catch (error) {
            throw error
        }
    }
}


export default IdsService;
