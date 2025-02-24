const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'serverinfo',
    description: 'Ipakita ang kasalukuyang status ng Minecraft server.',
    async execute(message) {
        try {
            // Kunin ang TPS (Ticks Per Second)
            const tpsResponse = await sendRconCommand('tps');
            const tpsMatch = tpsResponse.match(/TPS from last 1m, 5m, 15m: ([\d.]+), ([\d.]+), ([\d.]+)/);
            const tps = tpsMatch ? `${tpsMatch[1]} (1m), ${tpsMatch[2]} (5m), ${tpsMatch[3]} (15m)` : 'N/A';

            // Kunin ang listahan ng online players
            const playersResponse = await sendRconCommand('list');
            const playersMatch = playersResponse.match(/There are (\d+)\/(\d+) players online: (.+)/);
            const onlinePlayers = playersMatch ? playersMatch[1] : '0';
            const maxPlayers = playersMatch ? playersMatch[2] : 'N/A';
            const playerList = playersMatch && playersMatch[3] !== '' ? playersMatch[3] : '*Walang online players*';

            // Kunin ang kasalukuyang oras sa laro
            const timeResponse = await sendRconCommand('time query daytime');
            const timeMatch = timeResponse.match(/The time is (\d+)/);
            const gameTime = timeMatch ? timeMatch[1] : 'N/A';

            // Kunin ang kasalukuyang panahon sa laro
            const weatherResponse = await sendRconCommand('weather query');
            const weather = weatherResponse.includes('clear') ? '☀️ Clear' :
                            weatherResponse.includes('rain') ? '🌧️ Rain' :
                            weatherResponse.includes('thunder') ? '⛈️ Thunderstorm' : 'N/A';

            // Buong server info na ipapakita sa Discord
            const serverInfoMessage = `**🛠️ Minecraft Server Status**  
            📊 **TPS:** ${tps}  
            👥 **Online Players:** ${onlinePlayers}/${maxPlayers}  
            🎮 **Players List:** ${playerList}  
            🕒 **In-Game Time:** ${gameTime} ticks  
            🌦️ **Weather:** ${weather}`;

            message.channel.send(serverInfoMessage);
        } catch (error) {
            console.error(error);
            message.channel.send('❌ **Error:** Hindi ma-fetch ang server status.');
        }
    }
};
