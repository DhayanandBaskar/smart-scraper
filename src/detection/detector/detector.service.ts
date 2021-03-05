import { Injectable } from '@nestjs/common';
import { InterceptedFile } from '../models/InterceptedFile.model';

@Injectable()
export class DetectorService {
  async process(image: InterceptedFile) {

  }
}
