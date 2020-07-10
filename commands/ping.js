module.exports = {
  name: "ping",
  description: "ping with how many ms it is!",
  execute(message, args) {

    const dt = new Date(message.createdTimestamp);
		message.channel.send(`🏓Pong \`${new Date() - dt}ms\`| ws : \`${client.ws.ping}ms\``);
    message.channel.send(`Boop. ${message.author}`);
  },
};
