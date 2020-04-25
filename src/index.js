const { Client } = require("discord.js");
const client = new Client();
const colors = require("colors");

const commandHandler = require("./handlers/command.handler.js");

const { token } = require("./config/config.js");
const { log } = console;

// Initialize command handler
commandHandler(client);

client.on("ready", () => {
  log(`Logged in as ${client.user.tag}!`);
});

client.login(token);

// Hanfle Error
client.on("debug", (msg) => {});
client.on("warn", (msg) => {
  log(msg.green.bgWhite);
});
client.on("error", (msg) => {});
