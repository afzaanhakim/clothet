import {Model, DataTypes, Sequelize, Optional, InferAttributes, InferCreationAttributes, CreationOptional
} from 'sequelize';

import bcrypt from 'bcrypt';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare email: string;
    declare password: string;
    declare name: string;
    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
  
    // Method to validate password
    async validatePassword(password: string): Promise<boolean> {
      return await bcrypt.compare(password, this.password);
    }
  
    static initialize(sequelize: Sequelize) {
      User.init({
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true
          }
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
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
        modelName: 'user',
        tableName: 'users',
        underscored: true,
        hooks: {
          beforeCreate: async (user) => {
            if (user.password) {
              const salt = await bcrypt.genSalt(10);
              user.password = await bcrypt.hash(user.password, salt);
            }
          },
          beforeUpdate: async (user) => {
            if (user.changed('password')) {
              const salt = await bcrypt.genSalt(10);
              user.password = await bcrypt.hash(user.password, salt);
            }
          }
        }
      });
    }
}

export default User;

