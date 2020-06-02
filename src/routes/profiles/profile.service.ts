import { EntityService } from '../../shared/interfaces/interfaces'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class ProfileService extends EntityService {
    constructor() {
        super(prisma.profile);
    }

    public add = async (entityData) => {
        try {
            const entity = await prisma.profile.create({
                data: {
                    name: entityData.name,
                    permissions: {
                        connect: entityData.permissions
                    }
                }
            })
            return entity;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    public modify = async (id, entityData) => {
        var updateData = {}
        if (entityData.name) {
            updateData["name"] = entityData.name
        }
        if (entityData.permissions) {
            updateData["permissions"] = {
                set: entityData.permissions
            }
        }
        if (Object.keys(updateData).length == 0)
            throw new Error("Nothing to update")
        try {
            const entity = await prisma.profile.update({
                where: { id: id },
                data: updateData
            })
            return entity;
        } catch (error) {
            throw new Error(error.message)
        }
    }
}


export default ProfileService;
