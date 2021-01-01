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

Date.prototype.formatTime = function(){
    function addDigit(number){
        return number > 9 ? number : `0${number}`
    }
    let ret = ""
    if(this.getHours() > 0) ret+= `${addDigit(this.getHours())}h`
    if(this.getMinutes() > 0) ret+= `${addDigit(this.getMinutes())}m`
    if(this.getSeconds() > 0) ret+= `${addDigit(this.getSeconds())}s`

    return ret
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


module.exports = class Database{

    static async handle(message, db){
        const content = message.content.toLowerCase()

        const checkExact = db.replyExact.checkExact(content)
        const checkContain = db.replyContain.checkContain(content)

        if(content.contains("bot")){
            message.reply(isAuth(message.author.id) ? "tu parles de moi bg ?" : "d'où tu parles de moi fdp !")
        }else if(content.startsWith("/copy ") && isAuth(message.author.id)){
            message.delete()
            message.channel.send(message.content.substring(6))
        }else if(content == "/miroir"){
            const rand = Math.floor(Math.random() * 5)
            let tag
            switch(rand){
                case 0:
                    tag = `<@${usersId.shannel}>`
                    break
                case 1:
                    tag = `<@${usersId.oceane}>`
                    break
                case 2:
                    tag = `<@${usersId.aurore}>`
                    break
                case 3:
                    tag = `<@${usersId.blue}>`
                    break
                case 4:
                    tag = `<@${usersId.mena}>`
                    break
            }
            message.channel.send(new Discord.MessageEmbed()
                .setColor(0x7FFF00)
                .setTitle("Miroir miroir...\nDis-moi qui est la plus bonne")
                .setDescription(`La plus bonne est ${tag} !`))
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
        }else if(content.startsWith("/gay")){
            let textToSend = `<@${message.author.id}>, tu es gay à `
            if(content.includes(" ") && message.mentions.users.firstKey(undefined)!= null){
                textToSend = `<@${message.mentions.users.firstKey(undefined)}> est gay à `
            }
            let percentage = Math.floor(Math.random() * 101) 

            message.channel.send(new Discord.MessageEmbed()
            .setColor(0xFF69B4)
            .setTitle("Gay Rate Machine")
            .setDescription(`${textToSend}${percentage}%`))
        }else if(content.startsWith("/waifu")){
            let textToSend = `<@${message.author.id}>, tu es une waifu à `
            if(content.includes(" ") && message.mentions.users.firstKey(undefined)!= null){
                textToSend = `<@${message.mentions.users.firstKey(undefined)}> est une waifu à `
            }
            let percentage = Math.floor(Math.random() * 101) 

            message.channel.send(new Discord.MessageEmbed()
            .setColor(0x00CED1)
            .setTitle("Waifu Power ❤️")
            .setDescription(`${textToSend}${percentage}%`))
        }else if(content.startsWith("/precoce")){
            let textToSend = `<@${message.author.id}>, tu peux tenir `
            let time = message.author.id == usersId.diego ? 21600 : Math.floor(Math.random() * 7200 + 1)
            if(content.includes(" ") && message.mentions.users.firstKey(undefined)!= null){
                textToSend = `<@${message.mentions.users.firstKey(undefined)}> peut tenir `
                time = message.mentions.users.firstKey(undefined) == usersId.diego ? 21600 : Math.floor(Math.random() * 7200 + 1) 
            }
            let formatTime = new Date(0)
            formatTime.setSeconds(time)

            message.channel.send(new Discord.MessageEmbed()
            .setColor(0xFFB6C1)
            .setTitle("Précoce Device 💦")
            .setDescription(`${textToSend}${formatTime.formatTime()}`))
        }else if(content.startsWith("/penis")){
            let textToSend = `Voici la taille de ton pénis, <@${message.author.id}> :\n`
            if(content.includes(" ") && message.mentions.users.firstKey(undefined)!= null){
                textToSend = `Voici la taille du pénis de <@${message.mentions.users.firstKey(undefined)}> :\n`
            }

            textToSend += "8"
            for (let i=0 ; i<=Math.floor(Math.random()*16) ; i++) {
                textToSend += "="
            }
            textToSend += "D"

            message.channel.send(new Discord.MessageEmbed()
            .setColor(0xFF7F50)
            .setTitle("Ferrara's Machine")
            .setDescription(textToSend))
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