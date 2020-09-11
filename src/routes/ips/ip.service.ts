import { EntityService } from '../../shared/interfaces/interfaces'
import { PrismaClient } from "@prisma/client"
import NetworkService from '../networks/network.service';

const prisma = new PrismaClient()

class IPService extends EntityService {
    constructor() {
        super(prisma.iP);
    }


    public static addIP(entityData) {

        if (entityData.network) {
            entityData.network = NetworkService.addNetwork(entityData.network)
        }
        delete entityData.id
        delete entityData.networkId
        var aux = {
            connectOrCreate: {
                where: {
                    ip: entityData.ip
                },
                create:
                    entityData
            }
        }
        return aux;
    }
    /*
    public static addIP(entityData){
        var aux = {}
        if(entityData.network){
            delete entityData.id
            aux["create"] = entityData
            aux["create"].network = NetworkService.addNetwork(entityData.network)
        }else{
            aux["connect"] = { ip : entityData.ip }
        }
        return aux
    }*/

    public add = async (entityData) => {
        try {

            /*if(entityData.network){
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
            }*/

            if (entityData.network) {
                entityData.network = NetworkService.addNetwork(entityData.network)
            }

            const entity = await prisma.iP.create({
                data: entityData
            })
            return entity;
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    public modify = async (id, entityData) => {
        var updateData = {}
        if (entityData.ip) {
            updateData["ip"] = entityData.ip
        }

        if (entityData.network) {
            updateData["network"] = {
                connect: {
                    id: entityData.network.id
                }
            }
        }
        if (Object.keys(updateData).length == 0)
            throw new Error("Nothing to update")

        try {
            const entity = await prisma.iP.update({
                where: { id: id },
                data: updateData
            })
            return entity;
        } catch (error) {
            throw error
        }


    }
}




export default IPService;
