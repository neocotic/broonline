'use strict';

var mongoose = require('mongoose');

function PlaceModel() {
    var schema = new mongoose.Schema({
        _id: { type: String },
        answers: {
            no: { type: Number, min: 0, default: 0 },
            yes: { type: Number, min: 0, default: 0 }
        }
    });

    schema.methods.saveAnswer = function(answer, callback) {
        if (answer) {
            this.answers.yes = this.answers.yes + 1;
        } else {
            this.answers.no = this.answers.no + 1;
        }

        this.save(callback);
    };

    schema.virtual('answers.total').get(function () {
        return this.answers.no + this.answers.yes;
    });

    return mongoose.model('Place', schema);
}

module.exports = new PlaceModel();
