import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';

@Injectable()
export class UtilsService {
  public async hashString(text: string): Promise<string> {
    return bcrypt.hash(text, 10);
  }

  public generateUuid() {
    return uuid.v4();
  }
}
