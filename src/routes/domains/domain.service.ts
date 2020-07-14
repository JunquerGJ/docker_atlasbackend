import { EntityService } from '../../shared/interfaces/interfaces'
import { PrismaClient } from "@prisma/client"
import CertificateService from '../certificates/certificate.service';
import ListService from '../lists/list.service';

const prisma = new PrismaClient()

class DomainService extends EntityService {
    constructor() {
        super(prisma.domain);
    }


    public static addDomains(entityData) {
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
    }


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
            if (entityData.lists) {
                entityData.lists = ListService.addLists(entityData.lists)
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

            console.log("DATA ENTITY", entityData)
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
            if (entityData.lists) {
                var aux = []
                var i = 0;
                for (i = 0; i < entityData.lists.length; i++) {
                    aux.push({ id: entityData.lists[i].id })
                }
                entityData.lists = {
                    set: aux
                }
            }

            const entity = await prisma.domain.update({
                where: { id: id },
                data: entityData
            })
            return entity;
        } catch (error) {
            throw error
        }
    }
}


export default DomainService;
