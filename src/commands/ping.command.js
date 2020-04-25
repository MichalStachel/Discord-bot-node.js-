module.exports = {
  name: "ping",
  description: "Ping!",
  args: true,
  run(msg) {
    msg.reply("Pong");
  },
};
