module.exports = {
  name: "beep",
  description: "Beeo!",
  execute(message, args) {
    message.channel.send("Boop.");
  },
};
