module.exports = {
  name: "ban",
  description: "Description here",
  botPerms: ["BAN_MEMBERS"],
  userPerms: ["BAN_MEMBERS"],
  async execute(Discord, client, message, args, utility) {

    //Permisssion Checks
    if (!message.guild.me.hasPermission(["BAN_MEMBERS"])) {
      return await message.channel.send("I do not have the correct permissions to ban members")
    }
    if (!message.member.hasPermission(["BAN_MEMBERS"])) {
      return await message.channel.send("You do not have the correct permissions to ban members")
    }
    //Argument Checks
    if (!args[0]) {
      return message.channel.send("You need to state a user or user ID to ban")
    }
    //Get's the id
    user = utility.getUserID(args[0])
    //Gets the reason
    reason = args.splice(1, args.length).join(" ")
    //Fetches the GuildMember
    member = await message.guild.members.cache.get(user);

    //If it exists, do the follwing:
    if (member) {
      if (!member.bannable) {
        return await message.channel.send("I cannot ban this member")
      }
      //Checks the hierachy position
      if (member.roles.highest.position > message.member.roles.highest.position) {
        return await message.channel.send("You are not high enough in the hierachy to do that.")
      }
      //If the author is higher, ban the mentioned user 
      if (message.member.roles.highest.position > member.roles.highest.position) {
        await member.user.send(`You have been banned from ${message.guild.name}\nModerator: <@!${message.author.id}>\nReason: ${reason || "N/A"}`).catch(e => {})
        await message.guild.members.ban(member, {reason: reason || null})
        await message.channel.send(`Banned **${member.user.tag}**`)
      }
    }
    if (!member) { 
      user = utility.getUser(user)
      if (!user) {
        return message.channel.send(`\"${args[0]}\" is not a valid user or user ID `)
      }
      //Bans the member
      await message.guild.members.ban(user, {reason: reason || null})
      await message.channel.send(`Banned **${user.tag}**`)
    }
  }
}