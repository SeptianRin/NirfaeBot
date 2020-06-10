const superagent = require("superagent");
const Discord = require("discord.js");

module.exports = {
  name: "cat",
  description: "Retrieve cat image!",
  async execute(message, args) {
    let msg = await message.channel.send("Generating...");

    let { body } = await superagent.get("http://aws.random.cat/meow");
    if (!{ body }) return message.channel.send("Bot Broke... nanya mulu sih");

    let cEmbed = new Discord.RichEmbed()
      .setAuthor("Nirfaedah & Ｅｓｔｅｔｉｋａ", message.guild.iconURL)
      .setImage(body.file)
      .setTimestamp()
      .setFooter("bot paling ganteng");

    message.channel.send({ embed: cEmbed });
  },
};
