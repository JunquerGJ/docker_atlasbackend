import * as express from 'express';
import authMiddleware from '../middleware/auth.middleware';
import permissionMiddleware from '../middleware/permission.middleware';
import  { validateIncludes, validateIncludes2 }  from '../../utils/utils'
import HttpException from '../../routes/exceptions/HTTPException';
import * as jwt from 'jsonwebtoken';
import DataStoredInToken from '../../routes/interfaces/dataStoredInToken.interface';
import { JWT_SECRET} from '../../utils/constants'


class EntityService {
    private client ;

    constructor(client){
        this.client = client
    }

    public add = async(entityData) => {
        try {
            const entity = await this.client.create({
                data : entityData
            })
            return entity;
        } catch (error) {
            throw error
        }
    }

    public get = async (id,relations) => {
        
        var params = {
            where: { 
                id : id
            },
            select : relations
        }
        if(!Object.entries(relations).length){
            delete params.select
        }
        try {
            const entity = await this.client.findOne(params)
            return entity;
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    }

    public getSome = async(filters,limit,offset,relations) => {
        var params = {where :filters,after : limit,offset,select : relations}
        if(!Object.entries(relations).length){
            delete params.select
        }
        try {
            const entities = await this.client.findMany(params)
            return entities;
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    }

    public modify = async(id,entityData) => {
        try {
            const entity = await this.client.update({
                where : { id : id },
                data : entityData
            })
            return entity;
        } catch (error) {
            throw error
        }
    }

    public delete = async(id) => {
        try {
            const entity = await this.client.delete({
                where : {
                    id : id
                }
            })
            return entity;
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    }


    
}

class EntityController {
    protected path;
    protected router = express.Router();
    protected service;
    private relationsOne;
    private relationsSome;
    protected entityName;



    constructor(path,service,entityName){
        this.path = path;
        this.service = service;
        this.entityName = entityName;
        this.initializeRoutes()
    }

    private initializeRoutes(){
        this.router.post(this.path,authMiddleware,permissionMiddleware(["CREATE "+this.entityName]), this.add);
        this.router.all(this.path+"/*",authMiddleware);
        this.router.post(this.path+"/search",permissionMiddleware(["READ "+this.entityName]),this.getSome);
        this.router.get(this.path + "/:id",permissionMiddleware(["READ "+this.entityName]), this.get);
        this.router.patch(this.path + "/:id",permissionMiddleware(["UPDATE "+this.entityName]), this.modify);
        this.router.delete(this.path + "/:id",permissionMiddleware(["DELETE "+this.entityName]), this.delete);
    }


    protected find = async (id) => {
        const entity  = await this.service.get(id,{})
        return entity;
    }

    protected getSome = async (request: express.Request, response: express.Response, next : express.NextFunction) => {
        try{
            const secret = JWT_SECRET;
            const verificationResponse = jwt.verify(request.header('xtoken'), secret) as DataStoredInToken;
            const tokenFuncionalities = verificationResponse.permissions;
            const filters = request.body.filters;
            let relations = request.body.include ? validateIncludes(tokenFuncionalities,request.body.include) : {}
            const entities  =  await this.service.getSome(filters,request.query.limit,request.query.offset,relations);
            response.status(200).send(entities)            
        } catch (error) {
            next(new HttpException(400,error.message))
        }
    }

    add = async (request: express.Request, response: express.Response, next : express.NextFunction) => {
        try {
            const data = request.body
            const newEntity =  await this.service.add(data);
            response.status(200).send(newEntity);
        } catch (error) {
            switch(error.code){
                case 'P2002':
                    next(new HttpException(400,this.entityName + " already created. Check "+ error.meta.target[0]+" parameter"))
                    break
                default:
                    next(new HttpException(400,error.message))                    
            }
        }
    }

    protected modify = async (request: express.Request, response: express.Response, next : express.NextFunction) => {
        try {
            if(!parseInt(request.params.id)){//convert id to string
                throw new HttpException(400,"Bad request");
            }
            const entity = await this.find(parseInt(request.params.id));
            if(entity){
                const data  = request.body;
                delete data.id
                const updatedEntity = await this.service.modify(parseInt(request.params.id),data)
                response.status(201).send(updatedEntity);
            }else{
                next(new HttpException(404, this.entityName + " does not exist"))  
            }
        } catch (error) {
            switch(error.code){
                case 'P2002':
                    next(new HttpException(400,this.entityName + " already created. Check "+ error.meta.target[0]+" parameter"))
                    break
                default:
                    next(new HttpException(400,error.message))                    
            }            
        }
    }

    protected get = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            if(!parseInt(request.params.id)){//convert id to string
                throw new HttpException(400,"Bad request");
            }
            const secret = JWT_SECRET;
            const verificationResponse = jwt.verify(request.header('xtoken'), secret) as DataStoredInToken;
            const tokenFuncionalities = verificationResponse.permissions;
            var relationsObj = JSON.parse(request.query.params.toString())
            let relations = request.query ? validateIncludes(tokenFuncionalities,relationsObj) : {}
            const entity = await this.service.get(parseInt(request.params.id),relations)
            if(entity){
                response.status(200).send(entity)
            }else{
                next(new HttpException(404, this.entityName + " does not exist"));  
            }
        } catch (error) {
            next(new HttpException(400, error.message))
        }
    }
    
    protected delete = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            if(!parseInt(request.params.id)){//convert id to string
                throw new HttpException(400,"Bad request");
            }
            const result = await this.service.delete(parseInt(request.params.id))
            if(result){
                response.status(200).send()
            }else {
                next(new HttpException(404, this.entityName +" does not exist"));  
            }
        } catch (error) {
            next(new HttpException(400, error.message))
        }
    }

}

export { 
    EntityService,
    EntityController
}