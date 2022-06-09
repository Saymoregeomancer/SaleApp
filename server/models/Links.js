const {Schema, model, Types} = require('mongoose')
var mongoose_delete = require('mongoose-delete');

const schema = new Schema({
  from: {type: String, required: true},
  owner: {type: Types.ObjectId, ref: 'User'}
})

// schema.plugin(mongoose_delete, { deletedBy : true });

module.exports = model('Link', schema)
