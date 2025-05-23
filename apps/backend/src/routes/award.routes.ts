import { RequestHandler, Router } from "express";
import  AwardController  from "../controllers/AwardController";


const awardRouter = Router();
 
awardRouter.get('/',AwardController.getAll);
awardRouter.get('/:uid',AwardController.getById);
awardRouter.get('/search/:claimcode', AwardController.getByclaimCode as unknown as RequestHandler);
awardRouter.post('/',AwardController.create as RequestHandler);
awardRouter.put('/:uid',AwardController.update as RequestHandler);
awardRouter.put('/:claim',AwardController.claim as RequestHandler);
awardRouter.delete('/:uid',AwardController.delete as RequestHandler);

export default awardRouter; 