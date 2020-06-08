module.exports = {
  name: "meme",
  description: "retrieve meme!",
  execute(message, args) {
    const got = require("got");
    console.log("a");
    got("https://www.reddit.com/r/memes/random/.json")
      .then((response) => {
        console.log("b");
        let content = JSON.parse(response.body);
        let permalink = content[0].data.children[0].data.permalink;
        let memeUrl = `https://reddit.com${permalink}`;
        let memeImage = content[0].data.children[0].data.url;
        let memeTitle = content[0].data.children[0].data.title;
        let memeUpvotes = content[0].data.children[0].data.ups;
        let memeDownvotes = content[0].data.children[0].data.downs;
        let memeNumComments = content[0].data.children[0].data.num_comments;
        console.log("c");
        const embed = new Discord.MessageEmbed()
          .setTitle(`${memeTitle}`, `[View thread](${memeUrl})`)
          .setImage(memeImage)
          .setFooter(
            `👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`
          );
        console.log("d");
        message.channel
          .send(embed)
          .then((sent) =>
            console.log(`Sent a reply to ${sent.author.username}`)
          );
        console.log("Bot responded with: " + memeImage);
      })
      .catch(console.error);
  },
};
