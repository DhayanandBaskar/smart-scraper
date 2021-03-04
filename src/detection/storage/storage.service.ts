import { Injectable } from '@nestjs/common';
import { InterceptedFile } from '../models/InterceptedFile.model';
import { v4 as uuidv4 } from 'uuid';
import { writeFileSync } from 'fs';

@Injectable()
export class StorageService {
  write(file: InterceptedFile): string {
    const imageId = uuidv4()
    writeFileSync(`./images/${imageId}-${file.originalname}`, file.buffer, {
    })
    return `./images/${imageId}-${file.originalname}`
  }
}
