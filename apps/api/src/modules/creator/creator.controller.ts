import { Request, Response } from 'express';
import { getCreators } from './creator.service';

class CreatorController {
  async getCreators(req: Request, res: Response) {
    const data = await getCreators();
    const result = data.map((creator) => ({
      id: creator.id,
      name: creator.name,
      username: creator.username,
      avatar: creator.avatar,
      coverImage: creator.coverImage,
      totalFollowers: creator.followers.length,
      featured: creator.featured,
    }));

    res.json({
      success: true,
      data: result,
    });
  }
}

export default CreatorController;
