const User = require('./User');
const Note = require('./Note');

User.hasMany(Note, {
    onDelete: 'CASCADE'
});

Note.belongsTo(User);

module.exports = { User, Note}