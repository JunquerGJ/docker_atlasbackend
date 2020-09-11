import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../utils/constants'
import WrongAuthenticationTokenException from '../../routes/exceptions/WrongAuthenticationTokenException'
import AuthenticationTokenMissingException from '../../routes/exceptions/AuthenticationTokenMissingException';
import RequestWithUser from '../../routes/interfaces/requestWithUser.interface';
import DataStoredInToken from '../../routes/interfaces/dataStoredInToken.interface';


async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const cookies = request.cookies;
  const headers = request.headers;
  if (request.header('xtoken')) {
    var token = request.header('xtoken')
    const secret = JWT_SECRET;
    try {
      const verificationResponse = jwt.verify(token, secret, { ignoreExpiration: false }) as DataStoredInToken;
      const id = verificationResponse.id;
      next();
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}
export default authMiddleware;