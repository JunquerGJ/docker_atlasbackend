import { EntityService } from '../../shared/interfaces/interfaces'
import { PrismaClient } from "@prisma/client"
import IPService from '../ips/ip.service';
import CharacteristicService from '../characteristics/characteristic.service';
import ContactService from '../contacts/contact.service';
import AssetService from '../assets/asset.service';

const prisma = new PrismaClient()

class ServerService extends EntityService {
    constructor() {
        super(prisma.server);
    }


    public static addServers(entityData){
        var aux = {
            connectOrCreate : []
        }
        var i = 0;
        for (i = 0; i < entityData.length; i++) {
            delete entityData[i].id
            delete entityData[i].assets
            if(entityData[i].characteristics && entityData[i].characteristics.length>0){
                entityData[i].characteristics = CharacteristicService.addCharacteristics(entityData[i].characteristics) 
            }else entityData[i].characteristics = []
            if(entityData[i].ip){
                entityData[i].ip = IPService.addIP(entityData[i].ip)
            }else entityData[i].ip = undefined

            if(entityData[i].contacts && entityData[i].contacts.length>0){
                entityData[i].contacts = {
                    create : ContactService.addContact(entityData[i].contacts)
                }
            }
            aux.connectOrCreate.push({
                create : entityData[i],
                where : { hostname : entityData[i].hostname }
            })
        }        
        return aux
    }

 /*   public static addServers(entityData){
        var aux = {
            create : [],
            connect : []
        }
        var i = 0;
        for (i = 0; i < entityData.length; i++) {
            if ("ip" in entityData[i]) {
                delete entityData[i].id
                delete entityData[i].assets

                if (entityData[i].characteristics) {
                    CharacteristicService.addCharacteristics(entityData[i].characteristics)
                    entityData[i].characteristics = {
                        connect: entityData[i].characteristics
                    }
                }
                if (entityData[i].ip) {
                    entityData[i].ip = IPService.addIP(entityData[i].ip)
                }

                if (entityData[i].contacts) {
                    entityData[i].contacts = { create : ContactService.addContact(entityData[i].contacts) }
                }
                aux.create.push(entityData[i])
            } else {
                aux.connect.push({
                    hostname: entityData[i].hostname
                })
            }
        }
        return aux
    }*/

    public add = async (entityData) => {
        try {
            if (entityData.characteristics && entityData.characteristics.length >0) {
                entityData.characteristics = CharacteristicService.addCharacteristics(entityData.characteristics)
            }
            if(entityData.ip){
                entityData.ip = IPService.addIP(entityData.ip)
            }
            if (entityData.contacts && entityData.contacts.length>0) {
                entityData.contacts = {
                    create: ContactService.addContact(entityData.contacts)
                }
            }
            if (entityData.assets) {
                entityData.assets = AssetService.addAssets(entityData.assets)
            }
            /*if (entityData.ip) {
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
                }*/
            /*if (entityData.contacts) {
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
            }*/

            

            const entity = await prisma.server.create({
                data: entityData
            })
            return entity;
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    public delete = async (id) => {
        try {
            if (isNaN(id)) {
                throw new Error("Wrong ID")
            }
            await prisma.$executeRaw(`DELETE FROM "ContactToServer" where "serverId" = ${id}`)

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
                await prisma.$executeRaw(`DELETE FROM "ContactToServer" where "serverId" = ${id}`)
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
            throw error
        }

    }
}


export default ServerService;
