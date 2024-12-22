
/*
░░░░░██╗░██████╗
░░░░░██║██╔════╝
░░░░░██║╚█████╗░
██╗░░██║░╚═══██╗
╚█████╔╝██████╔╝
░╚════╝░╚═════╝░
*/

const Discord = require('discord.js');
const Canvas = require("canvas")
const { registerFont } = require('canvas');
registerFont('./Roboto-Black.ttf', { family: 'roboto' });
// Discord Client
const client = new Discord.Client();
const prefix = "s!"
const fs = require('fs');
const token = process.env.token


const keep_alive = require('./keep_alive.js')
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.on('ready', () => {
  console.log('Bot Started!');
  client.user.setPresence({
    activity: {
      name: 'Moderator Bot in Development v0.1',
      type: 'PLAYING',
    },
    status: "dnd"
  });
});



emoji = ["😀","😃","😄","😁","😆","😅","😂","🤣","🥲","☺️","😊","😇","🙂","🙃","😉","😌","😍","🥰","😘","😗","😙","😚","😋","😛","😝","😜","🤪","🤨","🧐","🤓","😎","🥸","🤩","🥳","😏","😒","😞","😔","😟","😕","🙁","☹️","😣","😖","😫","😩","🥺","😢","😭","😤","😠","😡","🤬","🤯","😳","🥵","🥶","😱","😨","😰","😥","😓","🤗","🤔","🤭","🤫","🤥","😶","😐","😑","😬","🙄","😯","😦","😧","😮","😲","🥱","😴","🤤","😪","😵","🤐","🥴","🤢","🤮","🤧","😷","🤒","🤕","🤑","🤠","😈","👿","👹","👺","🤡","💩","👻","💀","☠️","👽","👾","🤖","🎃","😺","😸","😹","😻","😼","😽","🙀","😿","😾"]

/*
process.on('unhandledRejection', async error => {
  await console.log(error)
	owner = await client.users.cache.get("702901731566157897")
  let embed = new Discord.MessageEmbed()
    .setTitle(error.name)
    .setDescription(error.message)
  await owner.send("<@!702901731566157897> Unhandled Promise Rejection!", embed)
});
*/


/*
client.on('guildMemberAdd', async member => {
  var channel = ""
  if (member.guild.id === "708796421658247199") {
    channel = client.channels.cache.get("741762929019453591")
  }
  
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./wallpaper.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '25px roboto';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

	// Add an exclamation point here and below
	
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Welcome to the server, ${member}!`, attachment);
});
*/

/*
client.on("typingStart", (channel, user) => {
  channel.send("<@!" + user.id + ">" + " has started typing")
})
*/

var reminder
utility = {
  async getUser(user){
    if (user.startsWith("<@") && user.endsWith(">")) {
      user = user.slice(2, -1);
      if (user.startsWith("!")) {
        user = user.slice(1);
      }
    }
    if (isNaN(parseInt(user))) {
        return null
      }
    user = client.users.fetch(user)
    if (!user) {
      return null
    }
    return user
  },
  async getUserID(user) {
    if (user.startsWith("<@") && user.endsWith(">")) {
      user = user.slice(2, -1);
      if (user.startsWith("!")) {
        user = user.slice(1);
      }
    }
    if (isNaN(parseInt(user))) {
        return null
      }
    return user
  }
}
client.on('message', async message => {
/*
  if (message.author.id === "702901731566157897") {
    if (message.content === "rpg hunt") {
      setTimeout(async function () {
        await message.channel.send("<@!" + message.author.id + "> time for \`RPG HUNT\`")
      }, 30000)
    }
  }

  if (message.author.id === "731965572207870023") {
    if (reminder) {
      if (message.content === "rpg hunt") {
        setTimeout(async function () {
          await message.channel.send("<@!" + message.author.id + "> time for \`RPG HUNT\`")
        }, 60000)
      }
    }  
  }
  */
  if (message.content === "s!disable" && message.author.id === "731965572207870023") {
    reminder = false
  }
  if (message.content === "s!enable" && message.author.id === "731965572207870023") {
    reminder = true
  }

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) return;
  if (!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) {
    return
  }
  if (command.botPerms) {
    if (!message.channel.permissionsFor(message.guild.me).has(command.botPerms)) {
    emb = new Discord.MessageEmbed()
      .setTitle("Bot Missing Permissions")
      .setDescription(`Required Permissions: \`${command.botPerms.join("\`, \`")}\``)
      return message.channel.send(emb)
    }
  }
  if (command.userPerms) {
    if (!message.channel.permissionsFor(message.member).has(command.userPerms)) {
      return
    }
  }
  if (!cooldowns.has(command.name)) {
	cooldowns.set(command.name, new Discord.Collection());
  } 
  
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
	const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

	  if (now < expirationTime) {
		const timeLeft = (expirationTime - now) / 1000;
    let emb = new Discord.MessageEmbed() 
      .setTitle("Command Cooldown!")
      .setDescription(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
		return message.channel.send(emb);
	  }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(Discord, client, message, args, utility);  
  }
  catch (error) {
    console.error(error);
  }
});

module.exports = utility

client.login(token);
