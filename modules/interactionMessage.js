const Discord = require('discord.js')

const guildsId = {
    patachon: "342389922491269122"
}

const usersId = {
    shannel: "211533618177245188",
    oceane: "348302437117067286",
    aurore: "325710398986911767",
    blue: "211536053314519040",
    mena: "272101663945261057",
    diego: "272360638741741570"
}

Date.prototype.formatTime = function(){
    function getClosest(min){
        const minutes = new Array(0, 15, 30, 45, 60)
        let closest = 0
        let lastCalc = 60
        for(let elem of minutes){
            if(Math.abs(elem - min) < lastCalc){
                lastCalc = Math.abs(elem - min)
                closest = elem
            }
        }
        return closest
    }

    let ret = ""
    if(this.getHours() > 0){
        if(getClosest(this.getMinutes()) > 0){
            if(getClosest(this.getMinutes()) == 60){
                ret+= `${this.getHours() + 1}h`
            }else{
                ret+= `${this.getHours()}h et ${getClosest(this.getMinutes())}min`
            }
        }else{
            ret+= `${this.getHours()}h`
        }
    }else{
        if(this.getMinutes() > 0){
            ret+= `${getClosest(this.getMinutes()) > 0 ? getClosest(this.getMinutes()) : 3}min`
        }else{
            ret+= `${getClosest(this.getSeconds()) > 0 ? getClosest(this.getSeconds()) : 3}sec`
        }
    }

    return ret
}

function miroir(){
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
    return new Discord.MessageEmbed()
        .setColor(0x7FFF00)
        .setTitle("Miroir miroir...\nDis-moi qui est la plus bonne")
        .setDescription(`La plus bonne est ${tag} !`)
}

function gay(interaction){
    let textToSend = `<@${interaction.member.user.id}>, tu es gay à `
    if(interaction.data.options){
        textToSend = `<@${interaction.data.options[0].value}> est gay à `
    }
    let percentage = Math.floor(Math.random() * 101) 

    return new Discord.MessageEmbed()
        .setColor(0xFF69B4)
        .setTitle("Gay Rate Machine")
        .setDescription(`${textToSend}${percentage}%`)
}

function waifu(interaction){
    let textToSend = `<@${interaction.member.user.id}>, tu es une waifu à `
    if(interaction.data.options){
        textToSend = `<@${interaction.data.options[0].value}> est une waifu à `
    }
    let percentage = Math.floor(Math.random() * 101) 

    return new Discord.MessageEmbed()
        .setColor(0x00CED1)
        .setTitle("Waifu Power ❤️")
        .setDescription(`${textToSend}${percentage}%`)
}

function precoce(interaction){
    let textToSend = `<@${interaction.member.user.id}>, tu peux tenir `
    let time = interaction.member.user.id == usersId.diego ? 21600 : Math.floor(Math.random() * 7200 + 1)
    if(interaction.data.options){
        textToSend = `<@${interaction.data.options[0].value}> peut tenir `
        time = interaction.data.options[0].value == usersId.diego ? 21600 : Math.floor(Math.random() * 7200 + 1) 
    }
    let formatTime = new Date(0)
    formatTime.setSeconds(time)

    return new Discord.MessageEmbed()
        .setColor(0xFFB6C1)
        .setTitle("Précoce Device 💦")
        .setDescription(`${textToSend}${formatTime.formatTime()}`)
}

function penis(interaction){
    let textToSend = `Voici la taille de ton pénis, <@${interaction.member.user.id}> :\n`
    if(interaction.data.options){
        textToSend = `Voici la taille du pénis de <@${interaction.data.options[0].value}> :\n`
    }

    textToSend += "8"
    for (let i=0 ; i<=Math.floor(Math.random()*16) ; i++) {
        textToSend += "="
    }
    textToSend += "D"

    return new Discord.MessageEmbed()
        .setColor(0xFF7F50)
        .setTitle("Ferrara's Machine")
        .setDescription(textToSend)
}

module.exports = class InteractionMessage{

    static async start(bot){
        bot.api.applications(bot.user.id).guilds(guildsId.patachon).commands.post({
            data: {name: "miroir", description: "Pour savoir qui est la plus bonne"}
        })

        bot.api.applications(bot.user.id).guilds(guildsId.patachon).commands.post({
            data: {name: "gay", description: "Savoir si vous êtes gay", options: [{
                    type: 6,
                    name: "utilisateur",
                    description: "Savoir si un autre utilisateur est gay",
                }]
            }
        })

        bot.api.applications(bot.user.id).guilds(guildsId.patachon).commands.post({
            data: {name: "waifu", description: "Savoir si vous êtes une waifu", options: [{
                    type: 6,
                    name: "utilisateur",
                    description: "Savoir si un autre utilisateur est une waifu",
                }]
            }
        })

        bot.api.applications(bot.user.id).guilds(guildsId.patachon).commands.post({
            data: {name: "precoce", description: "Savoir combien de temps vous tenez", options: [{
                    type: 6,
                    name: "utilisateur",
                    description: "Savoir combien de temps un autre utilisateur tient",
                }]
            }
        })

        bot.api.applications(bot.user.id).guilds(guildsId.patachon).commands.post({
            data: {name: "penis", description: "Connaitre la taille de votre pénis", options: [{
                    type: 6,
                    name: "utilisateur",
                    description: "Connaitre la taille du pénis d'un autre utilisateur",
                }]
            }
        })
    
        bot.ws.on('INTERACTION_CREATE', async function(interaction){
    
            switch(interaction.data.name.toLowerCase()){
                case "miroir":
                    bot.api.interactions(interaction.id, interaction.token).callback.post({
                        data: {type: 4, data: {
                                embeds: [miroir()]
                            }
                        }
                    })
                    break
                case "gay":
                    bot.api.interactions(interaction.id, interaction.token).callback.post({
                        data: {type: 4, data: {
                                embeds: [gay(interaction)]
                            }
                        }
                    })
                    break
                case "waifu":
                    bot.api.interactions(interaction.id, interaction.token).callback.post({
                        data: {type: 4, data: {
                                embeds: [waifu(interaction)]
                            }
                        }
                    })
                    break
                case "precoce":
                    bot.api.interactions(interaction.id, interaction.token).callback.post({
                        data: {type: 4, data: {
                                embeds: [precoce(interaction)]
                            }
                        }
                    })
                    break
                case "penis":
                    bot.api.interactions(interaction.id, interaction.token).callback.post({
                        data: {type: 4, data: {
                                embeds: [penis(interaction)]
                            }
                        }
                    })
                    break
            }
        })
    }
}