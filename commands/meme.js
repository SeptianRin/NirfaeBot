const superagent = require("superagent");
const Discord = require("discord.js");
module.exports = {
  name: "meme",
  description: "retrieve meme!",
  async execute(message, args) {
    let msg = await message.channel.send("Generating...");

    let { body } = await superagent.get("https://meme-api.herokuapp.com/gimme");
    if (!{ body }) return message.channel.send("Bot Broke... nanya mulu sih");

    let cEmbed = new Discord.RichEmbed()
      .setAuthor("Nirfaedah & Ｅｓｔｅｔｉｋａ", message.guild.iconURL)
      .setTitle(body.title)
      .setImage(body.url)
      .setTimestamp()
      .setFooter("bot kapitalis");

    message.channel.send({ embed: cEmbed });
    msg.delete();
  },
};
//https://meme-api.herokuapp.com/gimme/dankmemes
