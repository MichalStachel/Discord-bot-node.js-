const { RichEmbed } = require("discord.js");

module.exports = {
  name: "info",
  description: "Displays bot Informations!",

  run({ channel }) {
    const botAuthor = "HandsomeBanana";
    const botCommands = `
$Info
$clear
$Join
$Leave`;
    let embed = new RichEmbed()
      // Set the title of the field
      .setTitle("Gówno-Bot")
      .setColor(0xff0ff8)
      .setDescription(`Bot Options`)
      .addField(`Autorem bota jest`, botAuthor)
      .addField("Version", "v.1.0.0")
      .addField("Commands", botCommands);

    channel.send(embed);
  },
};
