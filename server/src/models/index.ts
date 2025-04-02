import sequelize from '../config/database';
import ClothingItem from './ClothingItem';

// Initialize models
const models = {
  ClothingItem
};

// Export models and sequelize instance
export { sequelize, models };
export default models; 