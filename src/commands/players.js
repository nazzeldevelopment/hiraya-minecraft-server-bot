module.exports = {
  name: "players",
  description: "Ipakita ang mga kasalukuyang online players sa Minecraft server.",
  async execute(message, args, rcon) {
    try {
      const response = await rcon.send("list");
      message.reply(`🟢 **Online Players:**\n\`\`\`${response}\`\`\``);
    } catch (error) {
      console.error("❌ Error fetching players:", error);
      message.reply("❌ Hindi ma-fetch ang listahan ng players.");
    }
  }
};
