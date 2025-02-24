const { Rcon } = require("rcon-client");

async function connectRcon() {
  try {
    const rcon = await Rcon.connect({
      host: process.env.RCON_HOST,
      port: process.env.RCON_PORT,
      password: process.env.RCON_PASSWORD,
    });

    console.log("✅ Successfully connected to RCON!");
    return rcon;
  } catch (error) {
    console.error("❌ RCON Connection Failed:", error);
    return null; // Para hindi mag-crash ang bot
  }
}

module.exports = { connectRcon };
