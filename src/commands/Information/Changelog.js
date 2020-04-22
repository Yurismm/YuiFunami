const { MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "changelog",
    aliases: ["updates", "commits", "update", "cl"],
    description: "Responds with Yui's ten most recent Git commits.",
    category: "Information",
    async execute(message, args, client) {
        const { data: res } = await axios({
            url: client.githubAPI + "/commits",
            headers: {
                "Authorization": `token ${client.config.secret["repo-token"]}`,
                "User-Agent": "Yui Funami",
            }
        });

        const commits = res.slice(0, 10);
       

        const embed = new MessageEmbed()
            .setTitle("[YuiBotRewrite:master] Latest Commits")
            .setColor("2f3136")
            .setURL(client.github)
            .setDescription(
                commits.map(commit => {
                    const author = commit.author === null?"Yui Funami":commit.author.login;
                    const hash = `[\`${commit.sha.slice(0, 7)}\`](${commit.html_url})`;
                    return `${hash} - ${author} - ${client.util.shorten(commit.commit.message.split("\n")[0], 50)}`;
                }).join("\n")
            )
            .setFooter(`Code last updated ${new Date(commits[0].commit.author.date).toLocaleDateString("en-CA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`);

        return message.channel.send(embed);
    }
};