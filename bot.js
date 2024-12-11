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


const launchBot = () => {
    bot.launch().then(() => console.log('Telegram-бот запущен!'))
};

const sendLog = async (message, options) => {
    const { username, email, password, role, title, description, priority, status, creator_id } = message;

    let htmlMessage = '';

    if (options?.user && options.type === 'create') {
        htmlMessage = `
        <b>New user has been created:</b>\n
        👤 <b>User name:</b> <i>${username}</i>\n
        📧 <b>Email:</b> <i>${email}</i>\n
        🔒 <b>Password:</b> <i>${password}</i>\n
        🛡 <b>Role:</b> <i>${role}</i>\n`;
    }

    if (options?.task && options.type === 'create') {
        htmlMessage = `
        <b>New task has been created:</b>\n
        📝 <b>Title:</b> <i>${title}</i>\n
        📖 <b>Description:</b> <i>${description}</i>\n
        🚦 <b>Priority:</b> <i>${priority}</i>\n
        📌 <b>Status:</b> <i>${status}</i>\n
        👤 <b>Creator Id:</b> <i>${creator_id}</i>`;
    }


    try {
        await bot.telegram.sendMessage(chatGroupId, htmlMessage, {parse_mode: "HTML"});
    } catch (error) {
        console.error(`Ошибка отправки сообщения: ${error.message}`);
    }
};

module.exports = { bot, launchBot, sendLog };