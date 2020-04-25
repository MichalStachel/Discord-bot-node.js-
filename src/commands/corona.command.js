const { RichEmbed } = require("discord.js");

module.exports = {
  name: "corona",
  description: "Shows info about Covid cases",
  aliases: ["virus", "vir"],
  args: true,
  usage: "<country|all>",
  cooldown: 10,

  async run(msg, args) {
    const {
      channel,
      client: { axios },
    } = msg;
    // $corona all
    const arg = args[0];

    const title = "Corona Stats";
    const embed = new RichEmbed()
      // Set the title of the field
      .setTitle(title)
      .setColor(0xff0ff8)
      .setDescription(
        `Shows information about covid-19 cases deaths and recoverd`
      );

    if (arg === "all") {
      const data = await axios.get("all").then(({ data }) => data);

      const { cases, deaths, recovered } = data;

      embed.addField(":nauseated_face: Cases", cases, true);
      embed.addField(" :heart:  Recovered", recovered, true);
      embed.addField(":skull: Deaths", deaths, true);
      return channel.send(embed);
    }
    const { data } = await axios.get("countries");

    countryName = arg;

    const country = data.filter((x) => x.country === countryName);

    if (!country.length) {
      return msg.reply(`country \`${countryName}\` not found`);
    }
    const { cases, deaths, recovered } = country[0];

    embed.setDescription(
      `Shows information about covid-19 cases deaths and recoverd in ${countryName}`
    );
    embed.addField(":nauseated_face: Cases", cases, true);
    embed.addField(" :heart:  Recovered", recovered, true);
    embed.addField(":skull: Deaths", deaths, true);
    return channel.send(embed);
  },
};
