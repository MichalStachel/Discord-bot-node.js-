module.exports = {
  name: "clear",
  description: "Delete all messages in channel",
  args: true,
  run(msg, args) {
    const amount = parseInt(args[0]);

    const { channel } = msg;

    if (!Number.isInteger(amount)) {
      return channel.send(
        "You must specify the amount of messages to clear!!!"
      );
    }

    if (amount < 1 || amount > 100) {
      return channel.send("You can delete messages in scope 1-99!!!");
    }

    channel.bulkDelete(amount + 1);
  },
};
