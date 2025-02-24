const client = require("../client");

client.once("ready", () => {
  console.log(`✅ HirayaCraft Bot is now online! Logged in as ${client.user.tag}`);
  client.user.setActivity("Minecraft Server | H!help", { type: "PLAYING" });
});


