import sequelize from '../config/database';
import { User } from './user.model';
import { Location } from './location.model';

// Initialize models
User.initialize(sequelize);
Location.initialize(sequelize);

// Define associations
User.hasMany(Location, { foreignKey: 'user_id' });
Location.belongsTo(User, { foreignKey: 'user_id' });

// Export models and sequelize instance
export {
  sequelize,
  User,
  Location
};