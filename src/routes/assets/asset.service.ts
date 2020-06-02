import { EntityService } from '../../shared/interfaces/interfaces'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class AssetService extends EntityService {
    constructor() {
        super(prisma.asset);
    }
    public add = async (entityData) => {
        try {
            if (entityData.characteristics) {
                var i = 0;
                for (i = 0; i < entityData.characteristics.length; i++) {
                    await prisma.characteristic.upsert({
                        update: { name: entityData.characteristics[i].name },
                        create: { name: entityData.characteristics[i].name },
                        where: { name: entityData.characteristics[i].name }
                    })
                }
                entityData.characteristics = {
                    connect: entityData.characteristics
                }
            }
            if (entityData.area) {
                if(entityData.area.description){
                    entityData.area = {
                        create: entityData.area
                    }
                }else{
                    entityData.area = {
                        connect: entityData.area
                    }
                }
            }

            if (entityData.Domain) {
                entityData.Domain = {
                    create : entityData.Domain
                }
            }
            if (entityData.servers) {
                entityData.servers = {
                    connect: entityData.servers
                }
            }
            if (entityData.contacts) {
                var aux = []
                var i = 0;
                for (i = 0; i < entityData.contacts.length; i++) {
                    if(entityData.contacts[i].contact.email){
                        aux.push({
                            functionality: entityData.contacts[i].functionality,
                            contact: {
                                create: entityData.contacts[i].contact
                                
                            }
                        })
                    }else{
                        aux.push({
                            functionality: entityData.contacts[i].functionality,
                            contact: {
                                connect: {
                                    name: entityData.contacts[i].contact.name
                                }
                            }
                        })
                    }
                }
                entityData.contacts = {
                    create: aux
                }
            }


            const entity = await prisma.asset.create({
                data: entityData
            })
            return entity;
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    }

    public delete = async (id) => {
     try{
        if (isNaN(id)) {
            throw new Error("Wrong ID")
        }
        await prisma.raw(`DELETE FROM "ContactToAsset" where "assetId" = ${id}`)
  //      await prisma.raw(`DELETE FROM "_CharacteristicToServer" where "A" = ${id}`)

        const entity = await prisma.asset.delete({
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


    public modify = async (id, entityData) => {
        try {

            if (entityData.area) {
                entityData.area = {
                    connect: {
                        id: entityData.area.id
                    }
                }
            } else {
                entityData.area = {
                    disconnect: true
                }
            }
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
            if (entityData.characteristics) {
                var i = 0;
                for (i = 0; i < entityData.characteristics.length; i++) {
                    await prisma.characteristic.upsert({
                        update: { name: entityData.characteristics[i].name },
                        create: { name: entityData.characteristics[i].name },
                        where: { name: entityData.characteristics[i].name }
                    })
                }
                entityData.characteristics = {
                    set: entityData.characteristics
                }
            }
            if (entityData.contacts) {
                if (isNaN(id)) {
                    throw new Error("Wrong ID")
                }
                await prisma.raw(`DELETE FROM "ContactToAsset" where "assetId" = ${id}`)
                var aux = []
                var i = 0;
                for (i = 0; i < entityData.contacts.length; i++) {
                    aux.push({
                        functionality: entityData.contacts[i].functionality,
                        contact: {
                            connect: {
                                name: entityData.contacts[i].contact.name
                            }
                        }
                    })
                }
                entityData.contacts = {
                    create: aux
                }
            }


            const entity = await prisma.asset.update({
                where: { id: id },
                data: entityData
            })
            return entity;
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }

    }
}


export default AssetService;
