module.exports = {
  name: "ping",
  description: "Get server latency",
  async execute(Discord, client, message, args, utility) {
    await message.channel.send('Pinging...').then(sent => {
      sent.edit(`Websocket Heartbeat: ${client.ws.ping}ms\nRoundtrip latency: ${sent.createdTimestamp - message.createdTimestamp}ms`);
    });
  }
}