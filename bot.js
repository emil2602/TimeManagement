const {Telegraf} = require('telegraf');

const bot = new Telegraf('7762842818:AAG4iDWbsaWlwmshdkEUn5p3OYcoBzOIDOs');
const chatGroupId = -1002385125610;

bot.start((ctx) => {
    ctx.reply("Start bot");
});

bot.on('text', (ctx) => {
    console.log(ctx.chat.id);
    ctx.reply(`message: "${ctx.message.text}"`);
});


// bot.launch().then(() => {
//     console.log('Бот запущен!');
// });

const launchBot = () => {
    bot.launch().then(() => console.log('Telegram-бот запущен!'))
};

const sendLog = async (message) => {
    try {
        await bot.telegram.sendMessage(chatGroupId, message);
        console.log(`Сообщение "${message}" отправлено в чат ${chatGroupId}`);
    } catch (error) {
        console.error(`Ошибка отправки сообщения: ${error.message}`);
    }
};

module.exports = { bot, launchBot, sendLog };