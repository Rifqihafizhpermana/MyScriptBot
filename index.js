const { Client, Collection } = require("discord.js");

const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
cs.setMongoURL(client.config.mongooseConnectionString);
cs.setDefaultWalletAmount('100');
cs.setDefaultBankAmount('0');

cs.setMaxBankAmount('5000000');
cs.setMaxWalletAmount('10000000');
cs.searchForNewUpdate(true)
cs.setDefaultBankLimitForUser('5000000')

// Initializing the project
require("./handler")(client);

client.login(client.config.token);
