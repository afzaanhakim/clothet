import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

interface ClothingItemAttributes {
  id: string;
  name: string;
  category: string;
  color: string;
  size: string;
  brand?: string;
  description?: string;
  imageUrl?: string;
  purchaseDate?: Date;
  lastWorn?: Date;
  timesWorn: number;
  favorite: boolean;
  seasonTags?: string[];
  status: 'active' | 'donated' | 'sold' | 'archived';
}

class ClothingItem extends Model<ClothingItemAttributes> implements ClothingItemAttributes {
  public id!: string;
  public name!: string;
  public category!: string;
  public color!: string;
  public size!: string;
  public brand!: string;
  public description!: string;
  public imageUrl!: string;
  public purchaseDate!: Date;
  public lastWorn!: Date;
  public timesWorn!: number;
  public favorite!: boolean;
  public seasonTags!: string[];
  public status!: 'active' | 'donated' | 'sold' | 'archived';
}

ClothingItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    purchaseDate: {
      type: DataTypes.DATE,
    },
    lastWorn: {
      type: DataTypes.DATE,
    },
    timesWorn: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    seasonTags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    status: {
      type: DataTypes.ENUM('active', 'donated', 'sold', 'archived'),
      defaultValue: 'active',
    },
  },
  {
    sequelize,
    modelName: 'ClothingItem',
    timestamps: true,
  }
);

export default ClothingItem; 