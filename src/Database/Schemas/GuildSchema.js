const { Schema, model } = require('mongoose');

const guildSchema = new Schema({
    idS: {
        type: String
    },
    lang: {
        type: String,
        default: 'pt-BR'
    }
});

module.exports = model('Guilds', guildSchema);