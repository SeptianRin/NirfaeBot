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
  if (message.author.bot) return;
  let jawaban = [
    "Ya",
    "Tidak",
    "Bisa jadi",
    `**BACOT LO ${message.author} ANJING NANYA MULU LO NGENTOT**`,
  ];
  const argsKerang = message.content.slice(0, 6);
  if (argsKerang.toLowerCase() === "apakah") {
    let string = message.content;
    let argisi = string.split(" ");
    argisi.shift();
    let pilihan = [];
    var toggleMode = false;

    for (let i = 0; i < argisi.length; i++) {
      if (argisi[i] == "atau") {
        toggleMode = true;
        pilihan.push(argisi.slice(0, i));
        pilihan.push(argisi.slice(i + 1));
      }
    }

    if (toggleMode === true) {
      // apakah... atau...
      return message.channel.send(
        Math.random() * 2 > 1 ? pilihan[1].join(" ") : pilihan[0].join(" ")
      );
      toggleMode === false;
    } else {
      //apakah...
      if (Math.random() * 100 > 95) {
        return message.channel.send(jawaban[3]);
      } else {
        if (Math.floor(Math.random() * 100 > 80)) {
          return message.channel.send(jawaban[2]);
        } else {
          if (Math.random() * 100 > 40) {
            return message.channel.send(jawaban[1]);
          } else {
            return message.channel.send(jawaban[0]);
          }
        }
      }
    }
  }

  if (!message.content.startsWith(prefix)) return;

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

client.login(process.env.TOKEN); //BOT_TOKEN is the Client Secret
