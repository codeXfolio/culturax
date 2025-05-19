import { requestAI } from '../helper';
import { Response, Request } from 'express';
import { getSystemPrompt } from './ai.service';

class AiController {
  async generateCaption(req: Request, res: Response) {
    const { description, tone, totalHashtags } = req.body;

    const response = await requestAI(
      getSystemPrompt(description, tone, totalHashtags),
      'meta-llama/llama-4-maverick:free',
    );

    const data = JSON.parse(response);

    res.json(data);
  }
}

export default AiController;
