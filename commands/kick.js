module.exports = {
  name: "kick",
  description: "Description here",
  botPerms: ["KICK_MEMBERS"],
  userPerms: ["KICK_MEMBERS"],
  async execute(Discord, client, message, args, utility) {
    //Permisssion Checks
    if (!message.guild.me.hasPermission(["KICK_MEMBERS"])) {
      return await message.channel.send("I do not have the correct permissions to kick members")
    }
    if (!message.member.hasPermission(["KICK_MEMBERS"])) {
      return await message.channel.send("You do not have the correct permissions to kick members")
    }
    //Argument Checks
    if (!args[0]) {
      return message.channel.send("You need to state a user or user ID to ban")
    }
    //Get's the id
    user = args[0]
    if (user.startsWith("<@") && user.endsWith(">")) {
      user = user.slice(2, -1);
      if (user.startsWith("!")) {
        user = user.slice(1);
      }
    }
    //Gets the reason
    reason = args.splice(1, args.length).join(" ")
    //Fetches the GuildMember
    member = await message.guild.members.cache.get(user);

    //If it exists, do the follwing:
    if (member) {

      if (!member.kickable) {
        return await message.channel.send("I cannot kick this member")
      }
      //Checks the hierachy position
      if (member.roles.highest.position > message.member.roles.highest.position) {
        return await message.channel.send("You are not high enough in the hierachy to do that.")
      }
      //If the author is higher, ban the mentioned user 
      if (message.member.roles.highest.position > member.roles.highest.position) {
        await member.kick(reason || null)
        await message.channel.send(`${member.user.username} got kicked. Reason: ${reason || "N/A"}`)
        //member.ban()
      }
    }
    if (!member) {
      await message.channel.send(`Member \"${args[0]}\" not found`)
    }
  }
}