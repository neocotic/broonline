import PlaceModel from '../../../models/place';

export default function(router) {
    router.get('/heatmap', (req, res) => {
        PlaceModel.find({dominant: 'yes'}, (error, places) => {
            if (error) {
                throw error;
            }

            res.send(places);
        });
    });

    router.get('/:place', (req, res) => {
        let id = req.params.place;

        PlaceModel.findById(id, (error, place) => {
            if (error) {
                throw error;
            }

            if (!place) {
                place = new PlaceModel({_id: id});
            }

            res.send(place);
        });
    });

    router.post('/:place/answer', (req, res) => {
        let answer = req.body.answer === 'true';
        let position = req.body.position || {};
        let id = req.params.place;

        PlaceModel.findById(id, (error, place) => {
            if (error) {
                throw error;
            }

            if (!place) {
                place = new PlaceModel({
                    _id: id,
                    position: {
                        latitude: parseFloat(position.lat),
                        longitude: parseFloat(position.lng)
                    }
                });
            }

            place.saveAnswer(answer, (error) => {
                if (error) {
                    throw error;
                }

                res.send(place);
            });
        });
    });
}
