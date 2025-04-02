import {Model, DataTypes, Sequelize, Optional, InferAttributes, InferCreationAttributes, CreationOptional} from 'sequelize';

export class Location extends Model<InferAttributes<Location>, InferCreationAttributes<Location>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare user_id: number;
    declare description: CreationOptional<string>;
    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;

    static initialize(sequelize: Sequelize) {
        Location.init({
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          description: {
            type: DataTypes.TEXT
          },
          created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
          },
          updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
          }
        }, {
          sequelize,
          modelName: 'location',
          tableName: 'locations',
          underscored: true
        });
    }
}

export default Location;
