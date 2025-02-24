require("dotenv").config(); // ✅ Load environment variables

const express = require("express");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { connectRcon } = require("./src/utils/rconUtils");
const fs = require("fs");
const path = require("path");

// ✅ Express Server Setup
const app = express();
const PORT = process.env.PORT || 3000;

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
    this.loadCommands();
    this.loadEvents();
  }

  loadCommands() {
    const commandPath = path.join(__dirname, "src", "commands");
    
    if (!fs.existsSync(commandPath)) {
      console.warn("⚠ No commands folder found!");
      return;
    }

    const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith(".js"));
    
    for (const file of commandFiles) {
      try {
        const command = require(path.join(commandPath, file));
        if (command.name) {
          this.commands.set(command.name, command);
        } else {
          console.warn(`⚠ Skipping ${file} (no command name)`);
        }
      } catch (error) {
        console.error(`❌ Error loading command ${file}:`, error);
      }
    }
    console.log(`✅ Loaded ${this.commands.size} commands.`);
  }

  loadEvents() {
    const eventPath = path.join(__dirname, "src", "events");

    if (!fs.existsSync(eventPath)) {
      console.warn("⚠ No events folder found!");
      return;
    }

    const eventFiles = fs.readdirSync(eventPath).filter(file => file.endsWith(".js"));

    for (const file of eventFiles) {
      try {
        const event = require(path.join(eventPath, file));
        if (event.name && typeof event.execute === "function") {
          this.client.on(event.name, (...args) => event.execute(...args, this.client));
        } else {
          console.warn(`⚠ Skipping ${file} (invalid event structure)`);
        }
      } catch (error) {
        console.error(`❌ Error loading event ${file}:`, error);
      }
    }
  }

  async start() {
    try {
      this.rcon = await connectRcon();
      this.client.rcon = this.rcon;
      console.log("✅ Connected to Minecraft RCON!");
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
        console.error(`❌ Error executing command "${commandName}":`, error);
        message.reply("❌ May error sa command!");
      }
    });

    this.client.once("ready", () => {
      console.log(`✅ Logged in as ${this.client.user.tag}!`);
      this.client.user.setActivity("Minecraft Server | H!help", { type: "PLAYING" });
    });

    try {
      await this.client.login(process.env.DISCORD_TOKEN);
      console.log("✅ Successfully logged into Discord!");
    } catch (error) {
      console.error("❌ Failed to login to Discord:", error);
    }
  }
}

const bot = new HirayaCraftBot();
bot.start();
