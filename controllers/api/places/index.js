'use strict';

var PlaceModel = require('../../../models/place');

module.exports = function(router) {

    router.get('/:place', function(req, res) {
        var id = req.params.place;

        PlaceModel.findById(id, function(error, place) {
            if (error) {
                throw error;
            }

            if (!place) {
                place = new PlaceModel({ _id: id });
            }

            res.send(place);
        });
    });

    router.post('/:place/answer', function(req, res) {
        var answer = (req.body.answer === 'true');
        var id = req.params.place;

        PlaceModel.findById(id, function(error, place) {
            if (error) {
                throw error;
            }

            if (!place) {
                place = new PlaceModel({ _id: id });
            }

            place.saveAnswer(answer, function(error) {
                if (error) {
                    throw error;
                }

                res.send(place);
            });
        });
    });

};
