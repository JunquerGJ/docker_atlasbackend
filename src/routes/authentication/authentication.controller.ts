import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { TOKEN_DURATION,JWT_SECRET, PW_ALGORITHM, PW_KEYGENERATOR} from '../../utils/constants'
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import UserService from '../users/user.service';
import TokenData from '../interfaces/tokendata.interface';
import DataStoredInToken from '../interfaces/dataStoredInToken.interface';


class AuthenticationController{
    public path = "/auth"
    public router = express.Router();
    private userService = new UserService();

    constructor(){
        this.initializeRoutes()
    }


    private createToken( user , permissions ) : TokenData{
        const expiresIn = parseInt(TOKEN_DURATION);
        const secret = JWT_SECRET;

        const dataStoredInToken: DataStoredInToken = {
            id: user.id,
            permissions : permissions,

          };
          return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
          };

    }

    private initializeRoutes(){
        this.router.post(`${this.path}`+"/login",this.loggingIn)
    }



    private loggingIn = async ( request : express.Request, response : express.Response, next : express.NextFunction) =>{
        const aux = JSON.parse(JSON.stringify(request.body))
        var password = aux.password
        var name = aux.user
        const user = await this.userService.login(name);
        if(user){
            const algorithm = PW_ALGORITHM
            const keygen = PW_KEYGENERATOR
            const key = crypto.scryptSync(keygen, 'salt', 24);
            const iv = Buffer.alloc(16, 0);
            const cipher = crypto.createCipheriv('aes-192-cbc', key, iv);



            let hash = cipher.update(password, 'utf8', 'hex');
            hash += cipher.final('hex');
            const isPasswordMatching = hash == user.hash; 
            if(isPasswordMatching){
                const profile  = user.profile;
                var permissions  = [];
                profile.permissions.forEach(function(permission){
                    permissions.push(permission.name)
                })
                const tokendata = this.createToken(user,permissions);
                response.send({token : tokendata.token});
            }else{
                next(new WrongCredentialsException())    
            }
        }else{
            next(new WrongCredentialsException())
        }
    }
}

export default AuthenticationController;
