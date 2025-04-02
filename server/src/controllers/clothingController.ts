import { Request, Response } from 'express';
import ClothingItem from '../models/ClothingItem';

export const getAllClothingItems = async (req: Request, res: Response) => {
  try {
    const items = await ClothingItem.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clothing items', error });
  }
};

export const getClothingItem = async (req: Request, res: Response) => {
  try {
    const item = await ClothingItem.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Clothing item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clothing item', error });
  }
};

export const createClothingItem = async (req: Request, res: Response) => {
  try {
    const item = await ClothingItem.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error creating clothing item', error });
  }
};

export const updateClothingItem = async (req: Request, res: Response) => {
  try {
    const item = await ClothingItem.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Clothing item not found' });
    }
    await item.update(req.body);
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error updating clothing item', error });
  }
};

export const deleteClothingItem = async (req: Request, res: Response) => {
  try {
    const item = await ClothingItem.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Clothing item not found' });
    }
    await item.destroy();
    res.json({ message: 'Clothing item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting clothing item', error });
  }
}; 