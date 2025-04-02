import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: process.env.NODE_ENV === 'development' ? console.log : false
});

// Import models
import User from './user.model';
import Category from './category.model';
import Location from './location.model';
import Item from './item.model';
import Image from './image.model';
import Tag from './tag.model';

// Initialize models
User.initialize(sequelize);
Category.initialize(sequelize);
Location.initialize(sequelize);
Item.initialize(sequelize);
Image.initialize(sequelize);
Tag.initialize(sequelize);

// Define associations
User.hasMany(Location, { foreignKey: 'user_id' });
Location.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Item, { foreignKey: 'user_id' });
Item.belongsTo(User, { foreignKey: 'user_id' });

Category.hasMany(Item, { foreignKey: 'category_id' });
Item.belongsTo(Category, { foreignKey: 'category_id' });

Location.hasMany(Item, { foreignKey: 'location_id' });
Item.belongsTo(Location, { foreignKey: 'location_id' });

Item.hasMany(Image, { foreignKey: 'item_id' });
Image.belongsTo(Item, { foreignKey: 'item_id' });

Item.belongsToMany(Tag, { through: 'item_tags', foreignKey: 'item_id' });
Tag.belongsToMany(Item, { through: 'item_tags', foreignKey: 'tag_id' });

export {
  User,
  Category,
  Location,
  Item,
  Image,
  Tag
};