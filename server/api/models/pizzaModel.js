'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var pizzaSchema = new Schema({
  name: {
    type: String,
  },
  sizeAndPrice: {
    type: Array,
  },
  components: {
      type: String,
  },
  img: {
      type: String,
      default: "./_1284-10219.jpg"
  }
});

var drinkSchema = new Schema({
    name: {
        type: String,
      },
      sizeAndPrice: {
        type: Array,
      },
      img: {
          type: String,
          default: "./_1284-10219.jpg"
      },
      type: {
          type: String
      }
});

var saleSchema = new Schema({
    img: {
        type: String,
        default: "./_1284-10219.jpg"
    },
    date: {
        type: String
    },
    name: {
        type: String
    },
    text: {
        type: String
    }
});

var userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isLiked: {
        type: Array,
        required: true
    },
    bonuses: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Pizzas', pizzaSchema);
module.exports = mongoose.model('Drinks', drinkSchema);
module.exports = mongoose.model('Sales', saleSchema);
module.exports = mongoose.model('Users', userSchema);