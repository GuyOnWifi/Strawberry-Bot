module.exports = {
  name: "status",
  description: "status cmd to change the bots status",
  async execute(Discord, client, message, args, utility) {
    if (!(message.author.id === "702901731566157897")) {
      return
    }
    status = args.splice(1, args.length).join(" ")
    await client.user.setActivity(status, {type: args[0].toUpperCase(), url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}).then(x => {
      message.channel.send(`Successfully changed my status to: ${status}`)
    })
  }
}