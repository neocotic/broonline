'use strict';

var mongoose = require('mongoose');

function PlaceModel() {
    var schema = new mongoose.Schema({
        _id: { type: String },
        answers: {
            no: { type: Number, min: 0, default: 0 },
            yes: { type: Number, min: 0, default: 0 }
        },
        dominant: { type: String, enum: [null, 'no', 'yes'] },
        position: {
            latitude: { type: Number },
            longitude: { type: Number }
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

    schema.statics.findAllDominantYes = function(callback) {
        return this.find({ dominant: 'yes' }, callback);
    };

    schema.virtual('answers.total').get(function() {
        return this.answers.no + this.answers.yes;
    });

    schema.pre('save', function(next) {
        if (this.answers.no === this.answers.yes) {
            this.dominant = null;
        } else if (this.answers.no > this.answers.yes) {
            this.dominant = 'no';
        } else {
            this.dominant = 'yes';
        }

        next();
    });

    return mongoose.model('Place', schema);
}

module.exports = new PlaceModel();
