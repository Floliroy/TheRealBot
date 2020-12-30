require("dotenv").config()

/**
 * Discord library
 */
const Discord = require('discord.js')
const bot = new Discord.Client()
bot.login(process.env.DISCORD_TOKEN)

/**
 * My own databse library
 */
const Database = require('./modules/database.js')
let db
setInterval(async function(){
    //Refresh database each hour
    db = await Database.refreshDatas()
}, 1000 * 60 * 60)

/**
 * My own message library
 */
const Message = require("./modules/message.js")

/**
 * Function to run when ready
 */
bot.on("ready", async function() {
    bot.user.setActivity("conquérir le monde")
    db = await Database.refreshDatas()

    await bot.api.applications(bot.user.id).guilds("342389922491269122").commands.post({
        data: {name: "miroir", description: "Pour savoir qui est la plus bonne du discord"}
    })
    await bot.api.applications(bot.user.id).guilds("342389922491269122").commands.post({
        data: {name: "penis", description: "Pour connaître la taille de ton pénis"}
    })
    await bot.api.applications(bot.user.id).guilds("342389922491269122").commands.post({
        data: {name: "gay", description: "Pour savoir à combien de pourcent tu es gay"}
    })
    await bot.api.applications(bot.user.id).guilds("342389922491269122").commands.post({
        data: {name: "waifu", description: "Pour savoir à combien de pourcent tu es une waifu"}
    })

    console.log(`LOG: Logged in as ${bot.user.tag}`)
})

/**
 * Function to run when bot receive a message
 */
bot.on('message', async function(message) {
    if(message.author.bot || message.channel instanceof Discord.DMChannel) return

    if(message.content == "/update"){
        message.delete()
        db = await Database.refreshDatas()
    }else{
        Message.handle(message, db)
    }
})
