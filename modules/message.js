const Discord = require('discord.js')

String.prototype.contains = function(test){
    return this == test || this.includes(` ${test} `) || this.startsWith(`${test} `) || this.endsWith(` ${test}`)
}

Map.prototype.checkExact = function(test){
    for(key of this.keys()){
        if(key.includes(test)){
            return this.get(key)
        }
    }
    return false
}

Map.prototype.checkContain = function(test){
    for(key of this.keys()){
        for(elem of key){
            if(test.contains(elem)){
                return this.get(key)
            }
        }
    }
    return false
}

const usersId = {
    flo: "112632359207108608",
    pata: "230698146630598656",
    dtql: "216919708560130048",
    shannel: "211533618177245188",
    oceane: "348302437117067286",
    aurore: "325710398986911767",
    blue: "211536053314519040",
    mena: "272101663945261057",
    diego: "272360638741741570"
}

function isAuth(test){
    return test == usersId.flo || test == usersId.pata || test == usersId.dtql
}


module.exports = class Message{

    static async handle(message, db){
        const content = message.content.toLowerCase()

        const checkExact = db.replyExact.checkExact(content)
        const checkContain = db.replyContain.checkContain(content)

        if(content.contains("bot")){
            message.reply(isAuth(message.author.id) ? "tu parles de moi bg ?" : "d'où tu parles de moi fdp !")
        }else if(content.startsWith("/copy ") && isAuth(message.author.id)){
            message.delete()
            message.channel.send(message.content.substring(6))
        }else if(content.startsWith("/suppr") && isAuth(message.author.id)){
            message.delete()
            let value = 10
            if(content.includes(" ")){
                const args = content.split(" ")
                if(!isNaN(args[1]) && parseInt(args[1]) <= 100 && parseInt(args[1]) > 0){
                    value = parseInt(args[1])
                }
            }
            const fetched = await message.channel.messages.fetch({limit: value})
            message.channel.bulkDelete(fetched).catch(err => {})
        }else if(checkExact){
            if(content.startsWith("/")){
                message.delete()
                if(isAuth(message.author.id)){
                    message.channel.send(checkExact[Math.floor(Math.random() * checkExact.length)])
                }
            }else{
                message.channel.send(checkExact[Math.floor(Math.random() * checkExact.length)])
            }
        }else if(checkContain){
            message.channel.send(checkContain[Math.floor(Math.random() * checkContain.length)])
        }else if(!content.includes(" ") && message.mentions.users.first(undefined) == message.mentions.users.last(undefined)){
            const reply = db.replyUser.get(message.mentions.users.firstKey(undefined))
            if(reply){
                message.channel.send(reply)
            }
        }
    }
}