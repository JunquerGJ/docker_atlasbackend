import { EntityService } from '../../shared/interfaces/interfaces'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class ServerService extends EntityService {
    constructor() {
        super(prisma.server);
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
            if (entityData.ip) {
                if (entityData.ip.network) {
                    if (entityData.ip.network.description) {
                        entityData.ip = {
                            create: {
                                ip: entityData.ip.ip,
                                network: {
                                    create: entityData.ip.network
                                }
                            }
                        }
                    } else {
                        entityData.ip = {
                            create: {
                                ip: entityData.ip.ip,
                                network: {
                                    connect: {
                                        name: entityData.ip.network.name
                                    }
                                }
                            }
                        }
                    }
                } else {
                    entityData.ip = {
                        connect: entityData.ip
                    }
                }
            }
            if (entityData.assets) {
                entityData.assets = {
                    connect: entityData.assets
                }
            }
            if (entityData.contacts) {
                var aux = []
                var i = 0;
                for (i = 0; i < entityData.contacts.length; i++) {
                    if (entityData.contacts[i].contact.email) {
                        aux.push({
                            functionality: entityData.contacts[i].functionality,
                            contact: {
                                create: entityData.contacts[i].contact

                            }
                        })
                    } else {
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

            const entity = await prisma.server.create({
                data: entityData
            })
            return entity;
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    }

    public delete = async (id) => {
        try {
            if (isNaN(id)) {
                throw new Error("Wrong ID")
            }
            await prisma.raw(`DELETE FROM "ContactToServer" where "serverId" = ${id}`)

            const entity = await prisma.server.delete({
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

            if (entityData.ip) {
                entityData.ip = {
                    connect: {
                        id: entityData.ip.id
                    }
                }
            } else {
                entityData.ip = {
                    disconnect: true
                }
            }
            if (entityData.assets) {
                var aux = []
                var i = 0;
                for (i = 0; i < entityData.assets.length; i++) {
                    aux.push({ id: entityData.assets[i].id })
                }
                entityData.assets = {
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
                await prisma.raw(`DELETE FROM "ContactToServer" where "serverId" = ${id}`)
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


            const entity = await prisma.server.update({
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


export default ServerService;
