require("dotenv").config();
const express = require("express");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { connectRcon } = require("./src/utils/rconUtils");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Express health check route
app.get("/", (req, res) => {
  res.send("HirayaCraftBot is running! ✅");
});

app.listen(PORT, () => {
  console.log(`✅ Express server running on port ${PORT}`);
});

class HirayaCraftBot {
  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    this.prefix = process.env.PREFIX || "H!";
    this.commands = new Collection();
    this.rcon = null;

    this.loadCommands();
    this.loadEvents();
  }

  loadCommands() {
    const commandPath = path.join(__dirname, "src", "commands");
    if (!fs.existsSync(commandPath)) {
      console.warn("⚠️ Commands folder not found.");
      return;
    }

    const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(`${commandPath}/${file}`);
      if (command.name) {
        this.commands.set(command.name, command);
      }
    }
    console.log(`✅ Loaded ${this.commands.size} commands.`);
  }

  loadEvents() {
    const eventPath = path.join(__dirname, "src", "events");
    if (!fs.existsSync(eventPath)) {
      console.warn("⚠️ Events folder not found.");
      return;
    }

    const eventFiles = fs.readdirSync(eventPath).filter(file => file.endsWith(".js"));
    for (const file of eventFiles) {
      const event = require(`${eventPath}/${file}`);
      this.client.on(event.name, (...args) => event.execute(...args, this.client));
    }
  }

  async start() {
    try {
      this.rcon = await connectRcon();
      if (!this.rcon) {
        console.warn("⚠️ Skipping RCON as connection failed.");
      } else {
        console.log("✅ RCON connection established!");
      }
    } catch (error) {
      console.error("❌ Failed to connect to RCON:", error);
    }

    this.client.on("messageCreate", async (message) => {
      if (!message.content.startsWith(this.prefix) || message.author.bot) return;

      const args = message.content.slice(this.prefix.length).trim().split(/ +/);
      const commandName = args.shift().toLowerCase();

      if (!this.commands.has(commandName)) return;

      try {
        const command = this.commands.get(commandName);
        await command.execute(message, args, this.rcon);
      } catch (error) {
        console.error("❌ Error executing command:", error);
        message.reply("❌ May error sa command!");
      }
    });

    this.client.once("ready", () => {
      console.log(`✅ Logged in as ${this.client.user.tag}!`);
      this.client.user.setActivity("Minecraft Server | H!help", { type: "PLAYING" });
    });

    try {
      await this.client.login(process.env.DISCORD_TOKEN);
    } catch (error) {
      console.error("❌ Failed to login to Discord:", error);
    }
  }
}

const bot = new HirayaCraftBot();
bot.start();
