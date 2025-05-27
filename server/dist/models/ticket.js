import { DataTypes, Model } from 'sequelize';
import { User } from './user.js';
export class Ticket extends Model {
}
export function TicketFactory(sequelize) {
    Ticket.init({
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
            allowNull: false,
        },
        assignedUserId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'user_id',
        },
    }, {
        tableName: 'tickets',
        sequelize,
    });
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
