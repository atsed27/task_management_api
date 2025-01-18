import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    const userId = req.headers['user-id'];
    if (userId) {
      req['user'] = { id: userId };
    } else {
      req['user'] = null;
    }
    next();
  }
}
