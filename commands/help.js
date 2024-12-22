module.exports = {
  name: "help",
  description: "Description here",
  async execute(Discord, client, message, args, utility) {
    cmds = client.commands.map(x => x.name)
    if (args[0]) {
      if (args[0] === "help") {
        let emb = new Discord.MessageEmbed()
        .setTitle("Help Command!")
        .setDescription("s!help [cmd] for more info\n**__List of all commands:__**\n"+cmds.join("\n"))
        message.channel.send(emb)
        return;
      }
      let searchcmd = args[0]
      const command = client.commands.get(searchcmd) || client.commands.find(c => c.aliases && c.aliases.includes(name));
      if (!command) {
        message.channel.send("I could not find the command you were looking for!")
      }
      aliases = command.aliases
      if (aliases) {
        aliases = aliases.join(", ")
      }
      let emb = new Discord.MessageEmbed()
        .setTitle(command.name.toUpperCase())
        .setDescription(command.description)
        .addFields(
          {name: "Aliases:", value: aliases || "None", inline: true},
          {name: "Cooldown:", value: command.cooldown || 3 + " second\(s\)", inline: true}
        )
      message.channel.send(emb)
    }
    else {
      let emb = new Discord.MessageEmbed()
        .setTitle("Help Command!")
        .setDescription("s!help [cmd] for more info\n**__List of all commands:__**\n"+cmds.join("\n"))
      message.channel.send(emb)
    }
  }
}
