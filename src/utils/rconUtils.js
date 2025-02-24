const { Rcon } = require("rcon-client");

let rcon = null;

async function connectRcon() {
    if (rcon) return rcon; // Huwag mag-reconnect kung connected na

    try {
        rcon = await Rcon.connect({
            host: process.env.RCON_HOST,
            port: process.env.RCON_PORT,
            password: process.env.RCON_PASSWORD
        });

        console.log("✅ RCON connected successfully!");

        // Auto-reconnect kapag nadisconnect
        rcon.on("end", () => {
            console.warn("⚠️ RCON connection lost! Reconnecting...");
            rcon = null; // I-reset ang instance
            setTimeout(connectRcon, 5000); // Subukang muli pagkatapos ng 5 segundo
        });

        return rcon;
    } catch (error) {
        console.error("❌ Failed to connect to RCON:", error);
        throw error;
    }
}

async function sendRconCommand(command) {
    try {
        if (!rcon) await connectRcon(); // Auto-connect kung disconnected
        
        const response = await rcon.send(command);
        console.log(`📡 RCON Command Sent: ${command}`);
        return response;
    } catch (error) {
        console.error("❌ Error sending RCON command:", error);
        throw error;
    }
}

module.exports = { connectRcon, sendRconCommand };
