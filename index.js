const { Client } = require('discord.js-selfbot-v13');

const config = require('./config.json');

const token = config.token;
const prefix = config.prefix;
const message = config.message;
const MPC = config.MPC;

const client = new Client({ checkUpdate: false });

client.on('messageCreate', async (message) => {
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();

  if (cmd === 'start') {
    const channels = message.guild.channels.cache;
    for (let i = 0; i < MPC; i++) {
      channels.forEach(async (channel) => {
        try {
          await channel.send(message);
        } catch (err) {
          console.error(err);
        }
      });
    }
  }
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(token);

