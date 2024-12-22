module.exports = {
  name: "eval",
  cooldown: 0,
  description: "Description here",
  async execute(Discord, client, message, args, utility) {
    if (!(message.author.id === "702901731566157897")) {
      return
    }
    exp = args.join(" ")
    if (exp.toLowerCase().includes("token")) {
      return
    }
    try {
      output = await eval(`async function exec() {${args.join(" ")}}
      exec()`)
    } catch(error) {
      emb = new Discord.MessageEmbed()
        .setTitle(error.name)
        .setDescription(error.message)
      return message.channel.send(emb)
    }
    
  }
}

