module.exports = {
  name: "players",
  description: "Ipakita ang mga kasalukuyang online players sa Minecraft server.",
  async execute(message, args, rcon) {
    try {
      const response = await rcon.send("list");
      message.reply(`�0�8 **Online Players:**\n\`\`\`${response}\`\`\``);
    } catch (error) {
      console.error("�7�4 Error fetching players:", error);
      message.reply("�7�4 Hindi ma-fetch ang listahan ng players.");
    }
  }
};
