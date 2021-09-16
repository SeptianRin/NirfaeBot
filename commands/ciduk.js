const superagent = require("superagent");
const Discord = require("discord.js");

module.exports = {
  name: "ciduk",
  description: "Add role ciduk to sinner",
  execute(message, args) {
    console.log(args);
    if (
      !(message.member.roles.cache.some(r=>["Ketua Program Pendidikan Estetika","Ketua Program Pendidikan Nirfaedah", "Dekan Fakultas","Wakil Dekan Fakultas"].includes(r.name)))
    )
      return message.channel.send("Kamu siapa? beraninya menyuruhku.");

    if (!String(args[0]).startsWith("<@"))
      return message.channel.send(
        "perintahnya yang Anda masukkan kurang jelas (ne ciduk @User Menit)"
      );
    if (isNaN(args[1]))
      return message.channel.send(
        "perintahnya yang Anda masukkan kurang jelas (ne ciduk @User Menit)"
      );

    //ciduk goes here
    let member = message.mentions.members.first();
    message.channel
      .send(`Baiklah, aku telah menyingkirkan ${args[0]} dari sini selama ${args[1]} menit. Mereka yang tidak patuh akan menjalani hukuman.`);
    member.roles.add(['705727738383958066']).then(console.log).catch(console.error);
    setTimeout(() => {
      member.roles.remove(['705727738383958066']).then(console.log).catch(console.error);
    }, args[1] * 60 * 1000);
  },
};
