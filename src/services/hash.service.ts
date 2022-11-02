import { Injectable } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashService {
  async generateHash(word: string): Promise<string> {
    return await bcrypt.hash(word, 8);
  }
  async compare(word: string, wordWithHash: string): Promise<boolean> {
    console.log(word, wordWithHash);
    return await bcrypt.compare(word, wordWithHash);
  }
}
