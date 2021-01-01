const Discord = require('discord.js')

function getBaseMessage(message, name){
    let embed = new Discord.MessageEmbed()
        .setDescription(`Message ${name} in <#${message.channel.id}>`)
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setFooter(`UserID: ${message.author.id}`)
        .setTimestamp()
    if(message.attachments.array().length > 0){
        embed.setImage(message.attachments.array()[0].url)
    }
    return embed
}

const channelsId = {
    delete: "701739123731595415"
}

module.exports = class LogMessage{

    static async handleDelete(bot, message){
        if(message.author.bot || message.content.startsWith("/")) return
        let embed = getBaseMessage(message, "Deleted")
    
        if(message.content && message.content != ""){
            embed.addField("Content", message.content)
        }
    
        if((message.content && message.content != "") || message.attachments.array().length > 0){
            const channel = bot.channels.get(channelsId.delete)
            channel.send(embed)
        }
    }

    static async handleUpdate(bot, oldMessage, newMessage){
        if(oldMessage.author.bot || oldMessage.content.startsWith("/") || newMessage.content.startsWith("/")) return
    
        let embed = getBaseMessage(oldMessage, "Updated")
    
        if(oldMessage.content && oldMessage.content != ""){
            embed.addField("Before", oldMessage.content)
        }else{
            embed.addField("Before", "*null*")
        }
        embed.addField("After", newMessage.content)
    
        const channel = bot.channels.get(channelsId.delete)
        channel.send(embed)
    }
}