module.exports = {
  name: "servers",
  description: "Description here",
  async execute(Discord, client, message, args, utility) {
    if (!message.author.id === "702901731566157897") {
      return message.channel.send("You are not authorized to do this")
    } 
    if (!args[0]) {
      return message.channel.send("That is not an option")
    }
    if (args[0] === "show") {
      message.channel.send(client.guilds.cache.map(x => `${x.name} (${x.id})`))
    }
    else if (args[0] === "leave") {
      guild = client.guilds.cache.get(args[1])
      if (!guild) {
        return message.channel.send("Bot is not in that guild")
      }
      guild.leave()
        .then(g => message.channel.send("Left the guild: " + g.name))
        .catch(e => message.channel.send("An error has occured"))
    }
  }
}