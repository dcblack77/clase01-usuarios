const mongoose = require('mongoose');

async function main() {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database is connected | La base de datos esta conectada");
  } catch (error) {
    console.error("Error connecting database | Error conectando con la base de datos: ", error)
  }
}

module.exports = main;