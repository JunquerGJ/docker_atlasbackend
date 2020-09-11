import { EntityService } from '../../shared/interfaces/interfaces'
import { PrismaClient } from "@prisma/client"
import AreaService from '../areas/area.service';
import DomainService from '../domains/domain.service';
import ContactService from '../contacts/contact.service';
import CharacteristicService from '../characteristics/characteristic.service';
import IPService from '../ips/ip.service';  
import ServerService from '../servers/server.service';

const prisma = new PrismaClient({
    log: ['query','error','warn','info']
})

class AssetService extends EntityService {
    constructor() {
        super(prisma.asset);
    }

    public static addAssets(entityData){
        var aux = {
            connectOrCreate : []
        }
        var i = 0;
        for (i = 0; i < entityData.length; i++) {
            delete entityData[i].id
            delete entityData[i].servers
            if(entityData[i].characteristics && entityData[i].characteristics.length>0){
                entityData[i].characteristics = CharacteristicService.addCharacteristics(entityData[i].characteristics) 
            }else entityData[i].characteristics = []
            if(entityData[i].contacts && entityData[i].contacts.length>0){
                entityData[i].contacts = {
                    create : ContactService.addContact(entityData[i].contacts)
                }
            }
            if(entityData[i].Domain && entityData[i].Domain.length>0){
                entityData[i].Domain = DomainService.addDomains(entityData[i].Domain)
            }

            if(entityData[i].area){
                entityData[i].area = AreaService.addArea(entityData[i].area)
            }else entityData[i].area = undefined

            aux.connectOrCreate.push({
                create : entityData[i],
                where : { name : entityData[i].name }
            })
        }
        return aux;
    }

    public add = async (entityData) => {
        try {
            if (entityData.characteristics) {
                entityData.characteristics = CharacteristicService.addCharacteristics(entityData.characteristics)
            }
            if (entityData.area) {
                entityData.area = AreaService.addArea(entityData.area)
            }
            if (entityData.contacts) {
                entityData.contacts = {
                    create: ContactService.addContact(entityData.contacts)
                }
            }
            if (entityData.servers) {
                entityData.servers = ServerService.addServers(entityData.servers)
            }

            if (entityData.Domain) {
                entityData.Domain = DomainService.addDomains(entityData.Domain)
            }
            /*if (entityData.servers) {
                var auxConnect = []
                var auxCreate = []
                var i = 0;
                for (i = 0; i < entityData.servers.length; i++) {
                    if ("ip" in entityData.servers[i]) {
                        delete entityData.servers[i].id
                        delete entityData.servers[i].assets

                        if (entityData.servers[i].characteristics) {
                            var i = 0;
                            for (i = 0; i < entityData.servers[i].characteristics.length; i++) {
                                await prisma.characteristic.upsert({
                                    update: { name: entityData.servers[i].characteristics[i].name },
                                    create: { name: entityData.servers[i].characteristics[i].name },
                                    where: { name: entityData.servers[i].characteristics[i].name }
                                })
                            }
                            entityData.servers[i].characteristics = {
                                connect: entityData.servers[i].characteristics
                            }
                        }
                        if (entityData.servers[i].ip) {
                            if (entityData.servers[i].ip.network) {
                                if (entityData.servers[i].ip.network.description) {
                                    delete entityData.servers[i].ip.network.id
                                    entityData.servers[i].ip = {
                                        create: {
                                            ip: entityData.servers[i].ip.ip,
                                            network: {
                                                create: entityData.servers[i].ip.network
                                            }
                                        }
                                    }
                                } else {
                                    entityData.servers[i].ip = {
                                        create: {
                                            ip: entityData.servers[i].ip.ip,
                                            network: {
                                                connect: {
                                                    name: entityData.servers[i].ip.network.name
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                entityData.servers[i].ip = {
                                    connect: entityData.servers[i].ip
                                }
                            }
                        }

                        if (entityData.servers[i].contacts) {
                            var aux = []
                            var i = 0;
                            for (i = 0; i < entityData.servers[i].contacts.length; i++) {
                                if (entityData.servers[i].contacts[i].contact.email) {
                                    aux.push({
                                        functionality: entityData.servers[i].contacts[i].functionality,
                                        contact: {
                                            create: entityData.servers[i].contacts[i].contact

                                        }
                                    })
                                } else {
                                    aux.push({
                                        functionality: entityData.servers[i].contacts[i].functionality,
                                        contact: {
                                            connect: {
                                                name: entityData.servers[i].contacts[i].contact.name
                                            }
                                        }
                                    })
                                }
                            }
                            entityData.servers[i].contacts = {
                                create: aux
                            }
                        }

                        auxCreate.push(entityData.servers[i])
                    } else {
                        auxConnect.push({
                            hostname: entityData.servers[i].hostname
                        })
                    }
                }
                entityData.servers = {
                    create: auxCreate,
                    connect: auxConnect
                }
            }*/


            /*
                        if (entityData.Domain) {
                            var auxConnect = []
                            var auxCreate = []
                            var i = 0;
                            for (i = 0; i < entityData.Domain.length; i++) {
                                if (!entityData.Domain[i].enviroment) {
                                    auxConnect.push({
                                        url: entityData.Domain[i].url
                                    })
                                } else {
                                    delete entityData.Domain[i].id
                                    auxCreate.push(entityData.Domain[i])
                                }
                            }
                            entityData.Domain = {
                                create: auxCreate,
                                connect: auxConnect
                            }
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
                    create: ContactService.addContact(entityData.contacts)
                }
            }*/


            const entity = await prisma.asset.create({
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
            await prisma.$executeRaw(`DELETE FROM "ContactToAsset" where "assetId" = ${id}`)
            //      await prisma.raw(`DELETE FROM "_CharacteristicToServer" where "A" = ${id}`)

            await prisma.audit.deleteMany({
                where: {
                    assetId: id
                }
            })

            await prisma.vulnerability.deleteMany({
                where: {
                    assetId: id
                }
            })
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
            }else if (entityData.area === null){
                entityData.area = {
                    disconnect: true
                }
            }


            if (entityData.Domain) {
                var aux = []
                var i = 0;
                for (i = 0; i < entityData.Domain.length; i++) {
                    aux.push({ id: entityData.Domain[i].id })
                }
                entityData.Domain = {
                    set: aux
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
                await prisma.$executeRaw(`DELETE FROM "ContactToAsset" where "assetId" = ${id}`)
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
            throw error
        }

    }
}


export default AssetService;
