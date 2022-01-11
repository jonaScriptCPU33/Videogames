const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      released: {
        type: DataTypes.STRING,
      },

      rating: {
        type: DataTypes.DECIMAL,
      },

      platforms: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      background_image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"https://i.pinimg.com/originals/9c/dd/b6/9cddb62ba0267583dbc32cf5877fdef2.jpg"
      },
    
      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
