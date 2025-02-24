module.exports = {
    name: "ready",
    once: true, // Ginagamit ang `once` para hindi mag-duplicate
    execute(client) {
        console.log(`✅ HirayaCraft Bot is now online! Logged in as ${client.user.tag}`);
        client.user.setActivity("Minecraft Server | H!help", { type: "PLAYING" });
    }
};
