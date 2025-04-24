import { Request, Response } from "express";

class CreatorController {
   async getCreator(req: Request, res: Response) {
      res.json({
         message: "Hello World",
      });
   }
}

export default CreatorController;
