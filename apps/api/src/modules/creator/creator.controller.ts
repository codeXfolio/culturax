import { Request, Response } from 'express';
import { getCreators } from './creator.service';

class CreatorController {
  async getCreators(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = 9;

      const data = await getCreators(page, limit);

      res.json({
        success: true,
        data: {
          featured: data.featured,
          regular: data.regular,
          pagination: data.pagination,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }
}

export default CreatorController;
