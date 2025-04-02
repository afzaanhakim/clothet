import { Router, Request, Response, RequestHandler } from 'express';
import {
  getAllClothingItems,
  getClothingItem,
  createClothingItem,
  updateClothingItem,
  deleteClothingItem,
} from '../controllers/clothingController';

const router = Router();

router.get('/', getAllClothingItems as RequestHandler);
router.get('/:id', getClothingItem as RequestHandler);
router.post('/', createClothingItem as RequestHandler);
router.put('/:id', updateClothingItem as RequestHandler);
router.delete('/:id', deleteClothingItem as RequestHandler);

export default router; 