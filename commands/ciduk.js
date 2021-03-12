const superagent = require("superagent");
const Discord = require("discord.js");

module.exports = {
  name: "ciduk",
  description: "Add role ciduk to sinner",
  execute(message, args) {
    console.log(args);
    if (
      !(message.member.roles.cache.some(r=>["Ketua Program Pendidikan Nirfaedah", "Dicktator"].includes(r.name)))
    )
      return message.channel.send("Lo siapa ngentod, kok mau ngeban!!!");

    if (!String(args[0]).startsWith("<@"))
      return message.channel.send(
        "perintahnya yang jelas cok (ne ciduk {USER} {BERAPA MENIT})"
      );
    if (isNaN(args[1]))
      return message.channel.send(
        "perintahnya yang jelas cok (ne ciduk {USER} {BERAPA MENIT})"
      );

    //ciduk goes here
    let member = message.mentions.members.first();
    message.channel
      .send(`**Lapor Pak, tersangka atas nama ${args[0]} sudah saya amankan. Saya amankan selama ${args[1]} menit dikarenakan tersangka diduga berbuat makar. Terima kasih
    **`);
    member.roles.add(['705727738383958066']).then(console.log).catch(console.error);
    setTimeout(() => {
      member.roles.remove(['705727738383958066']).then(console.log).catch(console.error);
    }, args[1] * 60 * 1000);
  },
};
