const {GoogleSpreadsheet} = require('google-spreadsheet')
const doc = new GoogleSpreadsheet("1xaJwPo5cdz7-UwzyAlH7H-Cfv83GKbVIej5IAE5khjs")

module.exports = class Database{

    static async refreshDatas(){
        await doc.useServiceAccountAuth({
            client_email: process.env.GOOGLE_EMAIL,
            private_key: process.env.GOOGLE_TOKEN.replace(/\\n/g, '\n')
        })
        await doc.loadInfo()

        let replyExact = new Map()
        const sheetExact = doc.sheetsByTitle["RepExact"]
        const rowsExact = await sheetExact.getRows()
        for(let row of rowsExact){
            replyExact.set(row.Message.split(";"), row.Reponse.split(";"))
        }

        let replyContain = new Map()
        const sheetContain = doc.sheetsByTitle["RepContain"]
        const rowsContain = await sheetContain.getRows()
        for(let row of rowsContain){
            replyContain.set(row.Message.split(";"), row.Reponse.split(";"))
        }

        let replyUser = new Map()
        const sheetUser = doc.sheetsByTitle["RepUser"]
        const rowsUser = await sheetUser.getRows()
        for(let row of rowsUser){
            replyUser.set(row.Id, row.Reponse)
        }

        return {
            replyExact: replyExact, 
            replyContain: replyContain,
            replyUser: replyUser
        }
    }

}