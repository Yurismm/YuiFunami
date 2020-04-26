require('dotenv').config();

const config = {
    ownerID: '358970589697933314',

    admins: [
        '228872946557386752', // xgrvaeli
        '210324193391149056', // Dodo
        '358970589697933314', // Cherie
        '205014454042099712', // Meliodas
        '460892852889845780', // MendtheMiner
        '293159670040887297', // mariobob
    ],

    support: [],

    token: process.env.BOT_TOKEN,

    defaultSettings: {
        prefix: '-',
        modLogChannel: 'mod-log',
        modRole: 'Moderator',
        adminRole: 'Administrator',
        systemNotice: 'true',
        welcomeChannel: 'welcome',
        welcomeMessage:
            'Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D',
        welcomeEnabled: 'false',
    },

    inviteURL:
        'https://discordapp.com/oauth2/authorize?client_id=456910763504697363&scope=bot&permissions=8',
    githubURL: 'https://github.com/xgrvaeli/YuiFunami',
    githubAPI: 'https://api.github.com/repos/xgrvaeli/YuiFunami',

    permLevels: [
        {
            level: 0,
            name: 'User',
            check: () => true,
        },

        {
            level: 2,
            name: 'Moderator',
            check: (message) => {
                try {
                    const modRole = message.guild.roles.cache.find(
                        (r) =>
                            r.name.toLowerCase() ===
                            message.settings.modRole.toLowerCase()
                    );
                    if (modRole && message.member.roles.cache.has(modRole.id))
                        return true;
                } catch (e) {
                    return false;
                }
            },
        },

        {
            level: 3,
            name: 'Administrator',
            check: (message) => {
                try {
                    const adminRole = message.guild.roles.cache.find(
                        (r) =>
                            r.name.toLowerCase() ===
                            message.settings.adminRole.toLowerCase()
                    );
                    return (
                        adminRole &&
                        message.member.roles.cache.has(adminRole.id)
                    );
                } catch (e) {
                    return false;
                }
            },
        },
        {
            level: 4,
            name: 'Server Owner',
            check: (message) =>
                message.channel.type === 'text'
                    ? message.guild.owner.user.id === message.author.id
                        ? true
                        : false
                    : false,
        },

        {
            level: 8,
            name: 'Bot Support',
            check: (message) => config.support.includes(message.author.id),
        },

        {
            level: 9,
            name: 'Bot Admin',
            check: (message) => config.admins.includes(message.author.id),
        },

        {
            level: 10,
            name: 'Bot Owner',
            check: (message) =>
                message.client.config.ownerID === message.author.id,
        },
    ],
};

module.exports = config;
