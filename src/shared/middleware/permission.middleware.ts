import * as jwt from 'jsonwebtoken';
import InsufficientPermissionException from '../../routes/exceptions/InsufficientPermissionException';
import DataStoredInToken from '../../routes/interfaces/dataStoredInToken.interface';
import { JWT_SECRET} from '../../utils/constants'




function hasPermissions(requiredFunctionalities : string[]){

  return (request,res,next) => {
    const secret = JWT_SECRET;
    const verificationResponse = jwt.verify(request.header('xtoken'), secret) as DataStoredInToken;
    const tokenFuncionalities = verificationResponse.permissions;
    const go : boolean = requiredFunctionalities.every( requiredFuncionality => tokenFuncionalities.indexOf(requiredFuncionality)!=-1);
    if(go){
      next()
    }else{
      next(new InsufficientPermissionException());
    }



  }
}

export default hasPermissions;