module.exports = {
  name: "server",
  description: "server and member info",
  execute(message, args) {
    message.channel.send(
      `Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`
    );
  },
};
