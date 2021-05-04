const superagent = require("superagent");
const Discord = require("discord.js");

module.exports = {
  name: "cat",
  description: "Retrieve cat image!",
  async execute(message, args) {
    let msg = await message.channel.send("Generating...");

    let { body : gambar } = await superagent.get("https://some-random-api.ml/img/cat");
    let { body : fact } = await superagent.get("https://some-random-api.ml/facts/cat");
    //let { deskripsi } = await superagent.get("https://some-random-api.ml/facts/cat");
    if (!{ gambar,fact }) return message.channel.send("Bot Broke... nanya mulu sih");

    let cEmbed = new Discord.MessageEmbed()
      .setAuthor("Nirfaedah & Ｅｓｔｅｔｉｋａ", message.guild.iconURL)
      .setImage(gambar.link)
      .setDescription(fact.fact)
      .setTimestamp()
      .setFooter("bot commie");

    message.channel.send({ embed: cEmbed });
    msg.delete();
  },
};
