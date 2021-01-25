import { EntityService } from '../../shared/interfaces/interfaces'
import { PrismaClient } from "@prisma/client"
import CertificateService from '../certificates/certificate.service';
import WafService from '../wafs/waf.service';

const prisma = new PrismaClient()

class DomainService extends EntityService {
    constructor() {
        super(prisma.domain);
    }

      public static addDomains(entityData){
          var aux = {
              connectOrCreate : []
          }
          var i = 0;
          for (i = 0; i < entityData.length; i++) {
            delete entityData[i].id
            delete entityData[i].asset
 
            if(entityData[i].wafs && entityData[i].wafs.length>0){
                entityData[i].wafs = WafService.addWafs(entityData[i].wafs) 
            }else entityData[i].wafs = []

            if(entityData[i].certificate){
                entityData[i].certificate = CertificateService.addCertificate(entityData[i].certificate)
            }else entityData[i].certificate = undefined


            aux.connectOrCreate.push({
                create : entityData[i],
                where : { 
                    url : entityData[i].url
                }
            })
          }
          return aux;
      }

      public static getSome = async(filters,limit : never,offset : never,relations) => {
        var params = {where :filters[0],after : limit,offset,select : relations}
        if(!Object.entries(relations).length){
            delete params.select
        }
        try {
            const entities = await prisma.domain.findMany(params)
            return entities;
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    }

/*    public static addDomains(entityData) {
        var aux = {
            create: [],
            connect: []
        }
        var i = 0;
        for (i = 0; i < entityData.length; i++) {
            if (!entityData[i].enviroment) {
                aux.connect.push({
                    url: entityData[i].url
                })
            } else {
                delete entityData[i].id
                if(entityData[i].lists){
                    entityData[i].lists = ListService.addLists(entityData[i].lists)
                }
                if(entityData[i].certificate){
                    entityData[i].certificate = CertificateService.addCertificate(entityData[i].certificate)
                }
                aux.create.push(entityData[i])
            }
        }
        return aux;
    }*/


    public add = async (entityData) => {
        try {

            if (entityData.asset) {
                entityData.asset = {
                    connect: entityData.asset
                }
            }

            /*            if(entityData.certificate){
                            if(entityData.certificate.issuer){
                                delete entityData.certificate.id
                                entityData.certificate = {
                                    create : entityData.certificate
                                }
                            }else{
                                entityData.certificate = {
                                    connect : { domainName : entityData.certificate.domainName }
                                }
                            }
                        }*/

            if (entityData.certificate) {
                entityData.certificate = CertificateService.addCertificate(entityData.certificate)
            }
            if (entityData.wafs) {
                entityData.wafs = WafService.addWafs(entityData.wafs)
            }

            /* if(entityData.lists){
                 var auxConnect = []
                 var auxCreate = []
                 var i = 0;
                 for(i=0;i<entityData.lists.length;i++){
                     if("description" in entityData.lists[i]){
                         delete entityData.lists[i].id
                         delete entityData.lists[i].domains
 
                         auxCreate.push(entityData.lists[i])
                     }else{
                         auxConnect.push({ 
                             name : entityData.lists[i].name
                         })
                     }
                 }
 
                 entityData.lists = {
                     connect : auxConnect,
                     create : auxCreate
                 }
             }*/


            const entity = await prisma.domain.create({
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
            console.log(entityData)
            if (entityData.wafs) {
                var aux = []
                var i = 0;
                for (i = 0; i < entityData.wafs.length; i++) {
                    aux.push({ id: entityData.wafs[i].id })
                }
                entityData.wafs = {
                    set: aux
                }
            }

            if(entityData.certificate){
                entityData.certificate = {
                    connect: {
                        domainName : entityData.certificate.domainName
                    }
                }
            }else{
                if (entityData.certificate === null){
                    entityData.certificate = {
                        disconnect : true
                    }
                }
            }

            const entity = await prisma.domain.update({
                where: { id: id },
                data: entityData
            })
            return entity;
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}


export default DomainService;
