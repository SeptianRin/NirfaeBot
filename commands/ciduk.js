const superagent = require("superagent");
const Discord = require("discord.js");

module.exports = {
  name: "ciduk",
  description: "Add role ciduk to sinner",
  execute(message, args) {
    if (
      !(message.member.roles.cache.some(role => role.name === 'Ketua Program Pendidikan Nirfaedah') ||
      message.member.roles.cache.some(role => role.name === 'Dicktator'))
    )
      return message.channel.send("Lo siapa ngentod, kok mau ngeban!!!");

    if (!args[0].startsWith("<@"))
      return message.channel.send(
        "perintahnya yang jelas cok (ne ciduk {USER} {BERAPA MENIT})"
      );
    if (isNaN(args[1]))
      return message.channel.send(
        "perintahnya yang jelas cok (ne ciduk {USER} {BERAPA MENIT})"
      );

    //ciduk goes here
    let role = message.guild.roles.find((r) => r.name === "Terciduk");
    let member = message.mentions.members.first();
    message.channel
      .send(`**Lapor Pak, tersangka atas nama ${args[0]} sudah saya amankan. Saya amankan selama ${args[1]} menit dikarenakan tersangka diduga berbuat makar. Terima kasih
    **`);
    member.addRole(role).catch(console.error);
    setTimeout(() => {
      member.removeRole(role).catch(console.error);
    }, args[1] * 60 * 1000);
  },
};
