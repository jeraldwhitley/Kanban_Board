import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user.js';

interface TicketAttributes {
  id: number;
  name: string;
  status: string;
  description: string;
  assignedUserId?: number;
}

interface TicketCreationAttributes extends Optional<TicketAttributes, 'id'> {}

export class Ticket extends Model<TicketAttributes, TicketCreationAttributes> implements TicketAttributes {
  public id!: number;
  public name!: string;
  public status!: string;
  public description!: string;
  public assignedUserId!: number;

  // Associated User model (optional when using eager loading)
  public readonly assignedUser?: User;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function TicketFactory(sequelize: Sequelize): typeof Ticket {
  Ticket.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'title',
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      assignedUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'user_id', 
      },
    },
    {
      tableName: 'tickets',
      sequelize,
    }
  );

  Ticket.belongsTo(User, {
    foreignKey: 'user_id', // ⬅️ actual DB column
    targetKey: 'id',
    as: 'assignedUser',
  });

  User.hasMany(Ticket, {
    foreignKey: 'user_id', // ⬅️ same here
  });

  return Ticket;
}
