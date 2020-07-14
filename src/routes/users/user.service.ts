import  { EntityService } from '../../shared/interfaces/interfaces'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class UserService extends EntityService {
    constructor(){
        super(prisma.user);
    }

    public login= async( name ) => {
        try {
            const user = await prisma.user.findOne({
                where : {
                    name : name
                },
                include : {
                    profile : {
                        include : {
                            permissions : true
                        }
                    }
                }
            })
            return user;
        } catch (error){
            console.log(error)
            throw error
        }
    }

    public modify = async(id,entityData) => {
        var updateData = {}
        if(entityData.name){
            updateData["name"] = entityData.name
        }
        if(entityData.hash){
            updateData["hash"] = entityData.hash
        }
        if(entityData.profile){
            updateData["profile"] = {
                connect : {
                    id : entityData.profile.id
                }
            }
        }
        if(Object.keys(updateData).length==0)
            throw new Error("Nothing to update")

        try {
            const entity = await prisma.user.update({
                where : { id : id},
                data : updateData
            })
            return entity;
        } catch (error) {
            throw error
        }        


    }

    public add = async(entityData) => {
        try {
            const entity = await prisma.user.create({
                data : {
                    name : entityData.name,
                    hash : entityData.hash,
            profile : {
                connect : {
                    id : entityData.profile.id
                }
            }
                }
            })
        } catch (error) {
            throw error
        }
    }

    public getSome = async(filters,limit,offset,relations) => {
        var params = {where :filters,after : limit,offset,relations}
        if(!Object.entries(relations).length){
            delete params.relations
        }
        try {
            const entities = await prisma.user.findMany({
                where : filters,
                after : limit,
                skip : offset,
                select : {
                    id : true,
                    name : true,
                    profile : true
                }
            })
            return entities;
        } catch (error) {
            throw error
        }
    }
}


export default UserService;
