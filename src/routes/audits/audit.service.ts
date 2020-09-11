import { EntityService } from '../../shared/interfaces/interfaces'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class AuditService extends EntityService {
    constructor() {
        super(prisma.audit);
    }

    public add = async (entityData) => {
        try {
            if (entityData.asset) {
                entityData.asset = {
                    connect: entityData.asset
                }
            }

            if (entityData.auditor) {
                entityData.auditor = {
                    connect: entityData.auditor
                }
            }
            const entity = await prisma.audit.create({
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
            if (entityData.auditor) {
                entityData.auditor = {
                    connect: entityData.auditor
                }
            } else {
                if (entityData.auditor === null) {
                    entityData.auditor = {
                        disconnect: true
                    }
                }
            }

            if (entityData.asset) {
                entityData.asset = {
                    connect: entityData.asset
                }
            } else {
                if (entityData.asset === null) {
                    entityData.asset = {
                        disconnect: true
                    }
                }
            }

            const entity = await prisma.audit.update({
                where: { id: id },
                data: entityData
            })
            return entity;

        } catch (error) {
            throw error
        }
    }
}


export default AuditService;
