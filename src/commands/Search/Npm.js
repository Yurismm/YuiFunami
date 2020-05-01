const axios = require("axios");
const { MessageEmbed } = require("discord.js");
const { format } = require("date-fns");
const Command = require("../../struct/Command");
const colors = require('../../util/Colors')
module.exports = class Npm extends Command{
    constructor(client){
        super(client, {
            name: "npm",
            description: "Search NPM for the supplied package.",
            usage: "<package>",
    });
}
   
    async run(message, args) {
        let search = args.join(" ");
        let notFound = false;

        let res = await axios(`https://registry.npmjs.com/${search}`).catch(error => {
            if(error.response && error.response.status === 404) notFound = true;
        });

        if(notFound) return message.channel.send("That package couldn't be found.");

        res = res.data;

        if (res.time.unpublished) return message.channel.send("That package is no longer available.");

		const version = res.versions[res["dist-tags"].latest];
		const maintainers = this.client.util.trimArray(res.maintainers.map(user => user.name));
		const dependencies = version.dependencies ? this.client.util.trimArray(Object.keys(version.dependencies), 10, `https://npmjs.com/${search}?activeTab=dependencies`) : undefined;

        const embed = new MessageEmbed()
            .setColor(colors.embeds)
            .setURL(`https://npmjs.com/${search}`)
            .setTitle(res.name)
            .setDescription(res.description)
            .addField("Author:", res.author.name, true)
            .addField("License:", res.license, true)
            .addField("Main File:", version.main || "index.js", true)
            .addField("Version:", version.deprecated ? `${res["dist-tags"].latest} (DEPRECATED)` : res["dist-tags"].latest, true)
            .addField("Created:", format(new Date(res.time.created), "dd/mm/yyyy"), true)
            .addField("Modified:", format(new Date(res.time.modified), "dd/mm/yyyy"), true)
            .addField("Dependencies:", dependencies ? dependencies.join(", ") : "None", false)
            .addField("Maintainers:", maintainers ? maintainers.join(", ") : "None", false);

        return message.channel.send(embed);
    }
};