module.exports = {
  name: "embed",
  botPerms: ["EMBED_LINKS"],
  userPerms: ["EMBED_LINKS"],
  description: "Description here",
  async execute(Discord, client, message, args, utility) {
    if (!args) {
      return message.channel.send("POROVIDE ME ARGS")
    }
    emb = new Discord.MessageEmbed()
    
  }
}