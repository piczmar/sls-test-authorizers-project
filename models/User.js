module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define("users", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.STRING,
        age: DataTypes.INTEGER,
        sports: DataTypes.STRING,
        token: DataTypes.STRING,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
    }, {
        tableName: "users",
        paranoid: true,
        timestamps: true,
        underscored: true,
    })

    return user
}