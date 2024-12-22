module.exports = {
  name: "search",
  aliases: ["dictionary", "define"],
  description: "Description here",
  async execute(Discord, client, message, args, utility) {
    const fetch = require("node-fetch")
    responce = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${args[0]}`).then(res => res.json())
    message.channel.send(responce[0]["meanings"].map(x => x.definitions.map(x => x.definition)).join("\n"))

  }
}