import UserService from './user.service';
import { EntityController } from '../../shared/interfaces/interfaces';
import HttpException from '../../routes/exceptions/HTTPException';
import { PW_ALGORITHM,PW_KEYGENERATOR} from '../../utils/constants'
import * as express from 'express';
import * as crypto from 'crypto'
import authMiddleware from '../../shared/middleware/auth.middleware'
import permissionMiddleware from '../../shared/middleware/permission.middleware';


class UserController extends EntityController {
    constructor() {
        super("/users", new UserService(), "User")
        this.router = express.Router()
        this.router.post(this.path, authMiddleware, permissionMiddleware(["CREATE " + this.entityName]), this.addUser);
        this.router.all(this.path + "/*", authMiddleware);
        this.router.post(this.path + "/search", permissionMiddleware(["READ " + this.entityName]), this.getSome);
        this.router.get(this.path + "/:id", permissionMiddleware(["READ " + this.entityName]), this.get);
        this.router.patch(this.path + "/:id", permissionMiddleware(["UPDATE " + this.entityName]), this.modifyUser);
        this.router.delete(this.path + "/:id", permissionMiddleware(["DELETE " + this.entityName]), this.delete);
    }

    addUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            const aux = JSON.parse(JSON.stringify(request.body))
            var password = aux.hash;
            var name = aux.name;
            var profile = aux.profile;
            const algorithm = PW_ALGORITHM
            const keygen = PW_KEYGENERATOR
            const key = crypto.scryptSync(keygen, 'salt', 24);
            const iv = Buffer.alloc(16, 0);
            const cipher = crypto.createCipheriv('aes-192-cbc', key, iv);



            let hash = cipher.update(password, 'utf8', 'hex');
            hash += cipher.final('hex');

            const newEntity = await new UserService().add({ profile, name, hash });
            response.status(200).send(newEntity);
        } catch (error) {
            console.log(error)
            next(new HttpException(400, error.message))
        }
    }

    modifyUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            if (!parseInt(request.params.id)) {//convert id to string
                throw new HttpException(400, "Bad request");
            }
            const entity = await this.find(parseInt(request.params.id));
            if (entity) {
                var data = request.body;
                delete data.id
                if (data.password) {
                    const algorithm = PW_ALGORITHM
                    const keygen = PW_KEYGENERATOR
                    const key = crypto.scryptSync(keygen, 'salt', 24);
                    const iv = Buffer.alloc(16, 0);
                    const cipher = crypto.createCipheriv('aes-192-cbc', key, iv);



                    let hash = cipher.update(data.password, 'utf8', 'hex');
                    hash += cipher.final('hex');
                    data.hash = hash
                    delete data.password
                }
                const updatedEntity = await this.service.modify(parseInt(request.params.id), data)
                response.status(201).send(updatedEntity);
            } else {
                next(new HttpException(404, this.entityName + " does not exist"))
            }
        } catch (error) {
            next(new HttpException(400, error.message))
        }
    }
}

export default UserController;