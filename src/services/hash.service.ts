import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashService {
  async generateHash(word: string): Promise<string> {
    return bcrypt.hash(word, 8);
  }
  async compare(word: string, wordWithHash: string): Promise<boolean> {
    return bcrypt.compare(word, wordWithHash);
  }
}
