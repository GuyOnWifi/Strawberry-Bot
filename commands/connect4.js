module.exports = {
  name: "connect4",
  aliases: ["c4"],
  description: "Description here",
  async execute(Discord, client, message, args, utility) {
    
    if (!args[0]) {
      return message.channel.send("You have to mention a user!")
    }

    user = await utility.getUser(args[0])
    
    const verify = new Discord.MessageEmbed()
      .setTitle("Connect Four Challenge!")
      .setDescription(`${user.username}! ${message.author.username} has challenged you in a Connect Four game!\nWill you accept? \`yes/no\``)

    await message.channel.send(verify)
    try {
      collected = await message.channel.awaitMessages(m => m.content === "yes" || m.content === "no" ||m.content === "y" || m.content === "n" && m.author.id === user.id, {max: 1, time: 10000, errors: ["time"]})
    } catch(error) {
      return message.channel.send("Duel Timeout")
    }
    if (collected.first().content === "no" || collected.first().content === "n") {
      return message.channel.send("Canceled")
    }
    //FUNCTIONS
    let grid = [[], [], [], [], [], [], []]
    async function setup() {
      for (let i of grid) {
        for (let j = 0; j<7; j++) {
          i.push("N")
        }
      }
    }
    async function createGrid() {
      function getTile(str) {
        switch (str) {
          case "N": 
            return "⚫"
          case "R":
            return "🔴"
          case "Y":
            return "🟡"
        }
      }
      let text = ""
      for (let i of grid) {
        for (let j of i) {
          text = text + getTile(j)
        }
        text = text + "\n"
      }
      return text
    }
    async function react(msg) {
      await msg.react("1️⃣")
      await msg.react("2️⃣")
      await msg.react("3️⃣")
      await msg.react("4️⃣")
      await msg.react("5️⃣")
      await msg.react("6️⃣")
      await msg.react("7️⃣")
    }
    function checkWin() {
      
    }
    function getRow(emoji) {
      switch(emoji) {
        case "1️⃣":
          return 1
        case "2️⃣":
          return 2
        case "3️⃣":
          return 3
        case "4️⃣":
          return 4
        case "5️⃣":
          return 5
        case "6️⃣":
          return 6
        case "7️⃣":
          return 7
      }
    }

    await setup()

    let emb = new Discord.MessageEmbed()
        .setTitle("Connect Four")
        .setDescription(await createGrid())

    msg = await message.channel.send(emb)
    await react(msg)
    const filter = function (r, u) {
      return u.id === message.author.id || u.id === user.id
    }
    
    collector = await msg.createReactionCollector(filter)
    collector.on("collect", async (r, u) => {

      for (let i=6; i>-1; i--) {
        if (grid[i][getRow(r.emoji.name) - 1] === "N") {
          if (u.id === message.author.id) {
            grid[i][getRow(r.emoji.name) - 1] = "Y"
          }
          if (u.id === user.id) {
            grid[i][getRow(r.emoji.name) - 1] = "R"
          }
          break
        }
      }

      emb = new Discord.MessageEmbed()
        .setTitle("Connect Four")
        .setDescription(await createGrid())
      await msg.edit(emb)

      await msg.reactions.cache.get(r.emoji.name).users.remove(message.author.id).catch(e => e)
      await msg.reactions.cache.get(r.emoji.name).users.remove(user.id).catch(e => e)
    })
  }
}