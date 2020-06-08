module.exports = {
  name: "meme",
  description: "retrieve meme!",
  execute(message, args) {
    const got = require("got");
    const Discord = require("discord.js");
    console.log("a");

    function meme(msg) {
      const embed = new Discord.RichEmbed();
      console.log("b");
      (async () => {
        try {
          const response = await got(
            "https://www.reddit.com/r/memes/random/.json"
          );
          console.log(JSON.parse(response.body));
          //=> '<!doctype html> ...'
        } catch (error) {
          console.log(error.response.body);
          //=> 'Internal server error ...'
        }
      })();
      console.log("z");
      got("https://www.reddit.com/r/memes/random/.json")
        .then((response) => {
          console.log("c");
          let content = JSON.parse(response.body);
          let permalink = content[0].data.children[0].data.permalink;
          let memeUrl = `https://reddit.com${permalink}`;
          let memeImage = content[0].data.children[0].data.url;
          let memeTitle = content[0].data.children[0].data.title;
          let memeUpvotes = content[0].data.children[0].data.ups;
          let memeDownvotes = content[0].data.children[0].data.downs;
          let memeNumComments = content[0].data.children[0].data.num_comments;
          embed.addField(`${memeTitle}`, `[View thread](${memeUrl})`);
          embed.setImage(memeImage);
          embed.setFooter(
            `👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`
          );
          msg.channel
            .send(embed)
            .then((sent) =>
              console.log(`Sent a reply to ${sent.author.username}`)
            );
          console.log("Bot responded with: " + memeImage);
        })
        .catch(console.error);
    }
    meme(message);
  },
};
