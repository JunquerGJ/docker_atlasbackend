import { EntityService } from '../../shared/interfaces/interfaces'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class ListService extends EntityService {
    constructor() {
        super(prisma.list);
    }


    public static addLists(entityData){
        var aux = {
            connectOrCreate : []
        }
        var i = 0;
        for (i = 0; i < entityData.length; i++) {
            delete entityData[i].id
            delete entityData[i].domains
            

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
            if (entityData.domains) {
                entityData.domains = {
                    connect: entityData.domains
                }
            }

            const entity = await prisma.list.create({
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
            if (entityData.domains) {
                var aux = []
                var i = 0;
                for (i = 0; i < entityData.domains.length; i++) {
                    aux.push({ id: entityData.domains[i].id })
                }
                entityData.domains = {
                    set: aux
                }
            }

            const entity = await prisma.list.update({
                where: { id: id },
                data: entityData
            })
            return entity;
        } catch (error) {
            throw error
        }
    }
}


export default ListService;
