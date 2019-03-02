module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define("user", {
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
    }, {
        tableName: "user",
        paranoid: true,
        timestamps: true
    })

    return user
}