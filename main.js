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
 * My owns libraries
 */
const Message = require("./modules/message.js")
const LogMessage = require("./modules/logMessage.js")
const InteractionMessage = require("./modules/interactionMessage.js")

/**
 * Function to run when ready
 */
bot.on("ready", async function() {
    bot.user.setActivity("conquérir le monde")
    db = await Database.refreshDatas()

    InteractionMessage.start(bot)

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

/**
 * Function to run when bot see a message getting deleted
 */
bot.on('messageDelete', function(message){
    LogMessage.handleDelete(bot, message)  
})

/**
 * Function to run when bot see a message getting updated
 */
bot.on('messageUpdate', function(oldMessage, newMessage){
    LogMessage.handleUpdate(bot, oldMessage, newMessage)  
})
