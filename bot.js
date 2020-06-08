const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token } = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  let jawaban = ["Ya", "Tidak", "Bisa jadi"];
  const argsKerang = message.content.slice("apakah".length).split(/ +/);
  if (message.content.slice(0, 6) === "Apakah") {
    // send back "Pong." to the channel the message was sent in
    return message.channel.send(jawaban[Math.floor(Math.random() * 3)]);
  }

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);

  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }
    return message.channel.send(reply);
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

// THIS  MUST  BE  THIS  WAY

client.login(token); //BOT_TOKEN is the Client Secret
