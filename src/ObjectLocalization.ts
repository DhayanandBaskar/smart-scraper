import { PredictionServiceClient } from '@google-cloud/automl/build/src/v1';
import { InterceptedFile } from './detection/models/InterceptedFile.model';
import { readFileSync, writeFileSync } from 'fs';

export interface PredictionResponse {
  annotationSpecId: string
  displayName: string
  imageObjectDetection: {
    boundingBox: {
      normalizedVertices: Array<{
        x: number,
        y: number
      }>
    }
  }
}

export class ObjectLocalization {
  private client
  constructor() {
    this.client = new PredictionServiceClient();
  }

  private readImage(filePath: string): Buffer {
    return readFileSync(filePath)
  }

  async predict(filePath: string): Promise<PredictionResponse[]> {
    const buffer = this.readImage(filePath)
    const request = {
      name: this.client.modelPath(
        '68979267479',
        'us-central1',
        'IOD1249918221385990144',
      ),
      payload: {
        image: {
          imageBytes: buffer,
        },
      },
    };
    const [response] = await this.client.predict(request);
    const prediction: PredictionResponse[] = response.payload
    console.log('Response Received', prediction);
    return prediction;
  }
}
