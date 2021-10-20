const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const ytdl = require("ytdl-core");

const client = new Discord.Client();
client.commands = new Discord.Collection();
const queue = new Map();

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

client.on("message", async message => {
  if (message.author.bot) return;
  let jawaban = [
    "Ya",
    "Tidak",
    "Mungkin saja",
    `Kamu tidak bisa berhenti untuk bertanya ya ${message.author}? Bisakah kali ini kau diam dan enyah dari sini? Menyebalkan sekali`,
    `Kamu tidak bisa berkomunikasi dengan baik ya ${message.author}? Lebih baik kamu diam saja.`,
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
    } else {
      //apakah
      if(message.content.length <7){
        message.member.roles.add(['705727738383958066']);
          setTimeout(() => {
            message.member.roles.remove(['705727738383958066']);
          }, 5 * 60 * 1000);
          return message.channel.send(jawaban[4]);
      }else{
          //apakah...
        if (Math.random() * 100 > 97.5) {
          message.member.roles.add(['705727738383958066']);
          setTimeout(() => {
            message.member.roles.remove(['705727738383958066']);
          }, 5 * 60 * 1000);
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
  }
  const berapa = message.content.slice(0, 13);
  if (berapa.toLowerCase() === "berapa persen") {
    return message.channel.send("Menurutku, "+Math.round(Math.random() * 100) + "%");
  }

  /**play music
  const serverQueue = queue.get(message.guild.id);

  if (message.content.startsWith(`${prefix}play`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}skip`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}stop`)) {
    stop(message, serverQueue);
    return;
  } else {
    message.channel.send("You need to enter a valid command!");
  }
});

async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "Kamu join di voice channel mana sih!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "Saya memerlukan kuasa untuk ikut dan berbicara dengan kalian di voice channel!"
    );
  }
  const songInfo = await ytdl.getInfo(args[2]);
  const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
   };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} lagu telah ditambahkan!`);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  if (!serverQueue)
    return message.channel.send("There is no song that I could skip!");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
    
  if (!serverQueue)
    return message.channel.send("There is no song that I could stop!");
    
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Start playing: **${song.title}**`);

  music end **/

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
    message.reply("Perintah yang anda masukkan salah");
  }
};

// THIS  MUST  BE  THIS  WAY
client.login(process.env.TOKEN); //BOT_TOKEN is the Client Secret