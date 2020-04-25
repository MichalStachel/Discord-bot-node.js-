const { Collection } = require("discord.js");

const { readdirSync } = require("fs");

const ascii = require("ascii-table");

const { prefix } = require(__dirname + "/../config/config.js");

const table = new ascii().setHeading("Command", "Load status");

module.exports = (client) => {
  // Commands
  client.commands = new Collection();

  const commandFiles = readdirSync(__dirname + "/../commands").filter((file) =>
    file.endsWith("js")
  );
  commandFiles.forEach((file) => {
    const command = require(__dirname + `/../commands/${file}`);

    if (command.name) {
      client.commands.set(command.name, command);
      table.addRow(file, "STONKS");
    } else {
      table.addRow(file, "NOT STONKS ---Missing name!");
      //   continue;
    }
  });
  // Display Ascii table
  console.log(table.toString());

  client.on("message", (msg) => {
    const { author, content, guild, channel } = msg;

    // check if user is a bot
    if (author.bot || !guild) {
      return;
    }
    if (content.toLowerCase() === "pong") {
      setTimeout(() => {
        channel.send("ping");
      }, 1500);
    }
    // Ignore message witcout prefix
    // if (msg.content.indexOf(prefix) !== 0) return;
    if (!msg.content.startsWith(prefix)) return;

    // Separate arguments and converting to a single command
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const cmdName = args.shift().toLowerCase();

    console.log(args);

    // Check if command exist
    if (!client.commands.has(cmdName)) return;

    const cmd = client.commands.get(cmdName);

    if (cmd.args && !args.length) {
      return msg.channel.send(
        `You didn't provide any arguments,${msg.author}!`
      );
    }
    try {
      cmd.run(msg, args);
    } catch (err) {
      console.log(err);
      msg.reply("Failed to execute this command NOT STONKS!");
    }
  });
};
