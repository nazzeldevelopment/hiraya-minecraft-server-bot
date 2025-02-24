require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { connectRcon } = require("./src/utils/rconUtils");
const fs = require("fs");
const path = require("path");

class HirayaCraftBot {
  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
      ],
    });

    this.prefix = process.env.PREFIX || "H!";
    this.commands = new Collection();
    this.loadCommands();
    this.loadEvents();
  }

  loadCommands() {
    const commandFiles = fs.readdirSync(path.join(__dirname, "src", "commands")).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(`./src/commands/${file}`);
      this.commands.set(command.name, command);
    }
    console.log(`✅ Loaded ${this.commands.size} commands.`);
  }

  loadEvents() {
    const eventFiles = fs.readdirSync(path.join(__dirname, "src", "events")).filter(file => file.endsWith(".js"));
    for (const file of eventFiles) {
      const event = require(`./src/events/${file}`);
      this.client.on(event.name, (...args) => event.execute(...args, this.client));
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
        console.error("❌ Error executing command:", error);
        message.reply("❌ May error sa command!");
      }
    });

    this.client.once("ready", () => {
      console.log(`✅ Logged in as ${this.client.user.tag}!`);
      this.client.user.setActivity("Minecraft Server | H!help", { type: "PLAYING" });
    });

    this.client.login(process.env.DISCORD_TOKEN).catch(error => {
      console.error("❌ Failed to login to Discord:", error);
    });
  }
}

const bot = new HirayaCraftBot();
bot.start();
