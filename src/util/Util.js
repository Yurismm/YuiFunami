const crypto = require("crypto");
const { readdirSync, statSync } = require("fs");
const { join } = require("path");

const yes = ["yes", "y", "ye", "yeah", "yup", "yea", "ya"];
const no = ["no", "n", "nah", "nope", "nop"];

module.exports = class Util {
  static delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static shuffle(array) {
    const arr = array.slice(0);
    for (let i = arr.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  static list(arr, conj = "and") {
    const len = arr.length;
    return `${arr.slice(0, -1).join(", ")}${
      len > 1 ? `${len > 2 ? "," : ""} ${conj} ` : ""
    }${arr.slice(-1)}`;
  }

  static shorten(text, maxLen = 2000) {
    return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
  }

  static randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Removes all elements past x of the attached array so it's length is x.
   */
  static trimArray(arr, maxLen = 10, moreURL) {
    if (arr.length > maxLen) {
      const len = arr.length - maxLen;
      arr = arr.slice(0, maxLen);
      if (moreURL) arr.push(`[and ${len} more...](${moreURL})`);
      else arr.push(`and ${len} more...`);
    }
    return arr;
  }

  static firstUpperCase(text, split = " ") {
    return text
      .split(split)
      .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
      .join(" ");
  }

  static formatNumber(number) {
    return Number.parseFloat(number).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
  }

  static randCap(text) {
    return text
      .split("")
      .map((v) => {
        return (v = Math.round(Math.random())
          ? v.toUpperCase()
          : v.toLowerCase());
      })
      .join("");
  }

  /**
   * Finds a member from a string, mention, or id
   * @property {string} msg The message to process
   * @property {string} suffix The username to search for
   * @property {bool} self Whether or not to default to yourself if no results are returned. Defaults to false.
   */
  static findMember(msg, suffix, self = false) {
    if (!suffix) {
      if (self) return msg.member;
      else return null;
    } else {
      let member =
        msg.mentions.members.first() ||
        msg.guild.members.cache.get(suffix) ||
        msg.guild.members.cache.find(
          (m) =>
            m.displayName.toLowerCase().includes(suffix.toLowerCase()) ||
            m.user.username.toLowerCase().includes(suffix.toLowerCase())
        );
      return member;
    }
  }

  static wide(text) {
    return text.split("").join(" ");
  }

  static base64(text, mode = "encode") {
    if (mode === "encode") return Buffer.from(text).toString("base64");
    if (mode === "decode")
      return Buffer.from(text, "base64").toString("utf8") || null;
    throw new TypeError(`${mode} is not a supported base64 mode.`);
  }

  static async verify(channel, user, time = 30000) {
    const filter = (res) => {
      const value = res.content.toLowerCase();
      return (
        res.author.id === user.id && (yes.includes(value) || no.includes(value))
      );
    };

    const verify = await channel.awaitMessages(filter, {
      max: 1,
      time,
    });
    if (!verify.size) return 0;
    const choice = verify.first().content.toLowerCase();
    if (yes.includes(choice)) return true;
    if (no.includes(choice)) return false;
    return false;
  }

  static hash(text, algorithm) {
    return crypto.createHash(algorithm).update(text).digest("hex");
  }

  static today(timeZone) {
    const now = new Date();
    if (timeZone) now.setUTCHours(timeZone);
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    return now;
  }

  static tomorrow(timeZone) {
    const today = Util.today(timeZone);
    today.setDate(today.getDate() + 1);
    return today;
  }

  /**
   * Humanizes the bot's uptime
   * @returns {object} An object containing a formatted time-string and a humanized time string
   */
  static uptime() {
    let msec = Number(process.uptime().toFixed(0)) * 1000;
    let days = Math.floor(msec / 1000 / 60 / 60 / 24);
    msec -= days * 1000 * 60 * 60 * 24;
    let hours = Math.floor(msec / 1000 / 60 / 60);
    msec -= hours * 1000 * 60 * 60;
    let mins = Math.floor(msec / 1000 / 60);
    msec -= mins * 1000 * 60;
    let secs = Math.floor(msec / 1000);

    let timestr = {
      formatted: "",
      humanized: "",
    };

    if (days > 0) {
      timestr.humanized += days + " days ";
      timestr.formatted += days + "d ";
    }

    if (hours > 0) {
      timestr.humanized += hours + " hours ";
      timestr.formatted += hours + "h ";
    }

    if (mins > 0) {
      timestr.humanized += mins + " minutes ";
      timestr.formatted += mins + "m ";
    }

    if (secs > 0) {
      timestr.humanized += secs + " seconds";
      timestr.formatted += secs + "s ";
    }

    return timestr;
  }

  /**
   * Scrapes a supplied directory and returns recursive directories and files within.
   * @param {File Path} srcPath The directory to scrape.
   */
  static getDirectories(srcPath) {
    return readdirSync(srcPath).filter((file) =>
      statSync(join(srcPath, file)).isDirectory()
    );
  }

  /**
   * Converts a Discord snowflake to a valid timestamp.
   * @param {Snowflake} sf The snowflake
   */
  static snowflake(sf) {
    return new Date(sf * Math.pow(2, -22) + 1420070400000).toLocaleDateString();
  }

  /**
   * Returns a random element of the attached array.
   */
  static randomElementFromArray(arr) {
    return arr[~~(arr.length * Math.random())];
  }

  /**
   * Capitalizes the first letter of the attached string.
   */
  static capitalize(str) {
    return str.replace(/^\w/, (c) => c.toUpperCase());
  }

  /**
   * Validates a Discord snowflake.
   * @param {Snowflake} snowflake Snowflake to validate
   * @param {Client} [client] The client to use to fetch the User from Discord
   * @returns {Promise<boolean>} Whether or not it's possibly a valid snowflake
   */
  static async validate(snowflake, client) {
    if (snowflake.length < 15 || snowflake.length > 21) return false;
    const deconstructed = SnowflakeUtil.deconstruct(snowflake);
    if (deconstructed.date.toISOString().startsWith("2015-01-01T00:00:00"))
      return false;
    if (!client) return true;
    let user;
    if (client.users.cache.get(snowflake)) return true;
    try {
      user = await client.users.fetch(snowflake, true);
    } catch (e) {
      return false;
    }
    if (user) return true;
    else return false;
  }
};
