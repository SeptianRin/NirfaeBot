module.exports = {
  name: "args-info",
  description: "Information about the arguments provided.",
  args: true,
  usage: "<user> <role>",
  execute(message, args) {
    if (args[0] === "kick") {
      // grab the "first" mentioned user from the message
      // this will return a `User` object, just like `message.author`
      const taggedUser = message.mentions.users.first();

      return message.channel.send(`You wanted to kick: ${taggedUser.username}`);
    }

    message.channel.send(
      `Arguments: ${args}\nArguments length: ${args.length}`
    );
  },
};
