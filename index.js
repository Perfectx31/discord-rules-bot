const { Client, Intents, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const rules = require('./rules.json');
const fs = require('fs');
const { startServer } = require("./alive.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


client.once("ready", () => {
  console.log(`Bot is Ready! ${client.user.tag}`);
  console.log(`Code By GLISTON`);
  console.log(`discord.gg/PTcfw`);
});
const {
  ActivityType,
} = require("discord.js");

client.once("ready", () => {
  console.log(`bot is ready! ${client.user.tag}!`);
  console.log(`Code by Gliston`);
  console.log(`@discord.gg/ptcfw`);

  const statusType = "idle"; // online = الاخضر | dnd = الاحمر | idle = الاصفر | invisible = غير متصل
  client.user.setPresence({
    status: 'dnd',
    activities: [
      {
        name: "Perfect RP", // الاسم
        type: 'PLAYING', // PLAYING, STREAMING, LISTENING, WATCHING, COMPETING
        url: "https://www.twitch.tv/wickstudio", // stream link
      },
    ],
  });
});
const express = require("express")
const app = express();
var listener = app.listen(process.env.PORT || 2000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
app.listen(() => console.log("I'm Ready To Work..! 24H"));
app.get('/', (req, res) => {
  res.send(`
  <body>
  <center><h1>Bot 24H ON!</h1></center
  </body>`)
});

client.on('messageCreate', async message => {
  if (message.content === '!rules') {
    if (message.member.permissions.has("ADMINISTRATOR")) {
      const row = new MessageActionRow()
        .addComponents(
          new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('يرجى الاختيار')
            .addOptions(rules.map(rule => ({
              label: rule.title,
              value: rule.id,
            }))),
        );

         const embed = new MessageEmbed()
        .setColor('#4A00A1')
        .setThumbnail('https://media.discordapp.net/attachments/1297304210106351678/1299013163467149343/Comp-1.gif?ex=671ba7c8&is=671a5648&hm=62242f1cd7b6ee139bcc412c3084cdeb8e53d9a355acc9d6a5cf0c2b044dc9ab&=')
        .setTitle('Perfect RP','https://cdn.discordapp.com/attachments/1277276615130222664/1287440974125076581/powerlogo-2.png?ex=66f18e57&is=66f03cd7&hm=ef5cccde4445c425453d907fea445ea1ac0524335b1b854863a95f56b3350f4e&')
        .setDescription('**جميع القوانين التابعه لسيرفر Perfect RP نرجوا منك إتباع جميع القوانين لكي لا يتم محاسبتك**')
        .setImage('https://cdn.discordapp.com/attachments/1297304210106351678/1299014141150892102/back.png?ex=671ba8b1&is=671a5731&hm=7a9e8b5e3a34b1b73d56069e7e25c53aead843e647dca4c9f6bb963ff49ac414&')
        .setFooter('Developer Department For Perfect RP','https://cdn.discordapp.com/attachments/1297304210106351678/1299013353641082953/CR.png?ex=671ba7f6&is=671a5676&hm=d419fc95f6e3d65aa1b6574a1499599d82f5a3e257dceab28735aa4a2123c91e&')
        .setTimestamp('');

      const sentMessage = await message.channel.send({ embeds: [embed], components: [row] });
      await message.delete();
    } else {
      await message.reply({ content: "You need to be an administrator to use this command.", ephemeral: true });
    }
  }
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isSelectMenu()) {
    const rule = rules.find(r => r.id === interaction.values[0]);
    const text = fs.readFileSync(rule.description, 'utf-8');
    const ruleEmbed = new MessageEmbed()
      .setColor('#4A00A1')
      .setThumbnail('https://media.discordapp.net/attachments/1297304210106351678/1299013163467149343/Comp-1.gif?ex=671ba7c8&is=671a5648&hm=62242f1cd7b6ee139bcc412c3084cdeb8e53d9a355acc9d6a5cf0c2b044dc9ab&=')
      .setDescription(text)
      .setFooter('Developer Department For Perfect','https://cdn.discordapp.com/attachments/1297304210106351678/1299013353641082953/CR.png?ex=671ba7f6&is=671a5676&hm=d419fc95f6e3d65aa1b6574a1499599d82f5a3e257dceab28735aa4a2123c91e&')
      .setTimestamp('')
      

    await interaction.reply({ embeds: [ruleEmbed], ephemeral: true });
  }
});

startServer();

client.login(process.env.TOKEN);