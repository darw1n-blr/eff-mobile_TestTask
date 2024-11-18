import {Column, DataType, Model, Table} from 'sequelize-typescript';

interface UserCreationAttributes{
    name: string,
    surname: string,
    age: number,
    sex: string,
    problems: boolean
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttributes> {


    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: false})
    surname: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    age: number;

    @Column({type: DataType.STRING, allowNull: false})
    sex: string;

    @Column({type: DataType.BOOLEAN, allowNull: false})
    problems: boolean;


}