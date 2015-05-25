import mongoose from 'mongoose';

/**
 * TODO: doc
 *
 * @type {mongoose.Schema}
 */
let schema = new mongoose.Schema({
    _id: {type: String},
    answers: {
        no: {
            type: Number,
            min: 0,
            'default': 0
        },
        yes: {
            type: Number,
            min: 0,
            'default': 0
        }
    },
    dates: {
        created: {
            type: Date,
            'default': Date.now
        },
        modified: {
            type: Date,
            'default': Date.now
        }
    },
    dominant: {
        type: String,
        'enum': [null, 'no', 'yes']
    },
    position: {
        latitude: {type: Number},
        longitude: {type: Number}
    }
});

/**
 * TODO: doc
 *
 * @param {boolean} answer -
 * @param {function} callback -
 * @returns {Promise}
 */
schema.methods.saveAnswer = function(answer, callback) {
    if (answer) {
        this.answers.yes += 1;
    } else {
        this.answers.no += 1;
    }

    return this.save(callback);
};

/**
 * TODO: doc
 *
 * @param {function} callback -
 * @returns {Promise}
 */
schema.statics.findLastCreated = function(callback) {
    return this.findOne()
        .sort('-dates.created')
        .exec(callback);
};

/**
 * TODO: doc
 *
 * @param {function} callback -
 * @returns {Promise}
 */
schema.statics.findLastModified = function(callback) {
    return this.findOne()
        .sort('-dates.modified')
        .exec(callback);
};

schema.virtual('answers.total').get(function() {
    return this.answers.no + this.answers.yes;
});

schema.pre('save', function(next) {
    this.dates.modified = Date.now();

    if (this.answers.no === this.answers.yes) {
        this.dominant = null;
    } else if (this.answers.no > this.answers.yes) {
        this.dominant = 'no';
    } else {
        this.dominant = 'yes';
    }

    next();
});

/**
 * TODO: doc
 *
 * @class PlaceModel
 */
export let PlaceModel = mongoose.model('Place', schema);
