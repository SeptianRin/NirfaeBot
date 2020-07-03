const superagent = require("superagent");
const Discord = require("discord.js");

module.exports = {
  name: "cat",
  description: "Retrieve cat image!",
  async execute(message, args) {
    let msg = await message.channel.send("Generating...");

    let { body } = await superagent.get("https://some-random-api.ml/img/cat");
    let { deskripsi } = await superagent.get("https://some-random-api.ml/facts/cat");
    if (!({ body }|| {deskripsi})) return message.channel.send("Bot Broke... nanya mulu sih");

    let cEmbed = new Discord.RichEmbed()
      .setAuthor("Nirfaedah & Ｅｓｔｅｔｉｋａ", message.guild.iconURL)
      .setImage(body.link)
      .setTimestamp()
      .setDescription(deskripsi.fact)
      .setFooter("bot commie");

    message.channel.send({ embed: cEmbed });
    msg.delete();
  },
};
