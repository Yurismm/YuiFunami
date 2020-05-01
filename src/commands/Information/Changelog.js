const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const Command = require("../../struct/Command");
const colors = require("../../util/Colors");
module.exports = class Changelog extends Command{
    constructor(client){
        super(client, {
    
    name: "changelog",
    aliases: ["updates", "commits", "update", "cl"],
    description: "Responds with Yui's ten most recent Git commits.",
});
}
    async run(message, args) {
        const { data: res } = await axios({
            url: this.client.config.githubAPI + "/commits",
            headers: {
                "Authorization": `token ${this.client.config.repo_token}`,
                "User-Agent": "Yui Funami",
            }
        });

        const commits = res.slice(0, 10);
       

        const embed = new MessageEmbed()
            .setTitle("[YuiBotRewrite:master] Latest Commits")
            .setColor(colors.embeds)
            .setURL(this.client.github)
            .setDescription(
                commits.map(commit => {
                    const author = commit.author === null?"Yui Funami":commit.author.login;
                    const hash = `[\`${commit.sha.slice(0, 7)}\`](${commit.html_url})`;
                    return `${hash} - ${author} - ${this.client.util.shorten(commit.commit.message.split("\n")[0], 50)}`;
                }).join("\n")
            )
            .setFooter(`Code last updated ${new Date(commits[0].commit.author.date).toLocaleDateString("en-CA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`);

        return message.channel.send(embed);
    }
};