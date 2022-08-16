import { HttpException } from '../middlewares/exception.middleware';

export default class NotFoundException extends HttpException {

  constructor(message: string) {
    super(404, message);
  }

}
