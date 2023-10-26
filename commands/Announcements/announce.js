const Command = require('../../structures/Command');
const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'announce',
        aliases: ["a", "ann"],
        description: `Announcements`,
        category: 'announce',
        cooldown: 10,
        userPermission:['ADMINISTRATOR'],
        botPermission: ["ADD_REACTIONS"]
      });
    }

    async run(message, args) {

      console.log(`Discord announcement Ran. From user ${message.author.tag}`)
      const channelId = `${config.logChannelID}`; 
      const logChannel = message.guild.channels.cache.get(channelId);


      let channel;
      if(config.suggestion_channel_id){
        channel = await message.guild.channels.cache.get(config.suggestion_channel_id)
      } else channel = await message.guild.channels.cache.find(c => c.name == "suggestions" && c.type == "text");

      if(!channel){
      return message.channel.send(`${message.client.emoji.fail} | I could not find the announcement channel in the current guild.`)
      };

      // const suggestion = args.slice(0).join(" ")
      // if(!suggestion){
      //   return message.channel.send(`${message.client.emoji.fail} | You need to type !announce`)
      // };

      const embed = new Discord.MessageEmbed()
      .setTitle('Hello Performance Lexus')
      .setDescription(`Let's book our next shoot day! Please select a day and time on our Google form. Once we receive your request, we'll confirm with our team and get back to you as soon as possible!`)
      .setColor(message.client.color.blue)
      .setFooter('Shark Media Team')
    
      channel.send(embed)

      const log = new Discord.MessageEmbed()
      .setThumbnail(message.author.avatarURL())
      .setAuthor(`${message.author.tag}`)
      .setDescription(`Announcement sent by <@${message.author.id}> in <#${config.suggestion_channel_id}>`)
      .setFooter(`Author: ${message.author.id} | Message ID: ${message.id}`)
      .setTimestamp()
      .setColor(message.client.color.blue)
      logChannel.send(log)

      .catch(()=>{
        return message.reply(`${message.client.emoji.fail} | Could not send a message to the announcement Channel.`)
      });
      
      message.delete();
      return message.channel.send(`${message.client.emoji.success} | Successfuly sent your announcement to ${channel}`)
      }
};

