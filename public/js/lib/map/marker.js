import * as $ from 'jquery';

/**
 * TODO: doc
 *
 * @typedef {Object} PlaceModel
 * @property {string} _id -
 * @property {Object} answers -
 * @property {number} answers.no -
 * @property {number} answers.yes -
 * @property {Object} dates -
 * @property {Date} dates.created -
 * @property {Date} dates.modified -
 * @property {string} dominant -
 * @property {Object} position -
 * @property {number} position.latitude -
 * @property {number} position.longitude -
 */

/**
 * TODO: doc
 *
 * @typedef {Object} PlaceSubmission
 * @property {string} answer -
 * @property {Object} position -
 * @property {number} position.lat -
 * @property {number} position.lng -
 */

const placeSymbol = Symbol('place');
const updateResultSymbol = Symbol('updateResult');
const updateResultsSymbol = Symbol('updateResults');
const updaterSymbol = Symbol('updater');

/**
 * Component for displaying the marker for selected places.
 *
 * @class Marker
 */
export class Marker {

    /**
     * The underlying jQuery-wrapped element for this {@link Marker}.
     *
     * @type {jQuery}
     * @property $el
     */
    $el;

    /**
     * Google Maps API object to be used by this {@link Marker}.
     *
     * @type {google.maps.Marker}
     * @property api
     */
    api;

    /**
     * The underlying DOM element for this {@link Map}.
     *
     * @type {HTMLElement}
     * @property el
     */
    el;

    /**
     * The {@link Heatmap} associated with this {@link Marker}.
     *
     * @type {Heatmap}
     * @property heatmap
     */
    heatmap;

    /**
     * Google Maps API information window used to display place details adjacent to this {@link Marker}.
     *
     * @type {google.maps.InfoWindow}
     * @property infoWindow
     */
    infoWindow;

    /**
     * The {@link Map} associated with this {@link Marker}.
     *
     * @type {Map}
     * @property map
     */
    map;

    /**
     * Creates a new instance of {@link Marker} for the <code>map</code> and <code>heatmap</code> provided.
     *
     * @param {Map} map - the associated {@link Map} to be used
     * @param {Heatmap} heatmap - the associated {@link Heatmap} to be used
     * @constructor
     */
    constructor(map, heatmap) {
        /**
         * Google Maps API details for the active place for this {@link Marker}.
         *
         * @private
         * @type {google.maps.places.PlaceResult}
         */
        this[placeSymbol] = null;

        this.map = map;
        this.heatmap = heatmap;

        this.$el = $('<div class="map-info-window">').html($('#marker-template').html());
        this.el = this.$el[0];

        this.api = new google.maps.Marker({
            anchorPoint: new google.maps.Point(0, -29),
            map: this.map.api
        });
        this.infoWindow = new google.maps.InfoWindow({
            content: this.el
        });

        this.$el.on('click', '.btn[data-value]', (event) => {
            let answer = $(event.target).data('value');
            let position = {
                lat: this.place.geometry.location.lat(),
                lng: this.place.geometry.location.lng()
            };

            this.submit({
                answer,
                position
            });
        });

        google.maps.event.addListener(this.api, 'click', () => {
            this.show();
        });
    }

    /**
     * Ensures that the information window is closed and makes the Google Maps API object invisible.
     *
     * @method hide
     */
    hide() {
        this.infoWindow.close();
        this.api.setVisible(false);
    }

    /**
     * Loads the place data from the server via an asynchronous request.
     *
     * @returns {jQuery.Promise} A promise which can be used to track the XHR.
     * @method load
     */
    load() {
        this[updaterSymbol]({loading: true})();

        return $.ajax({
            method: 'GET',
            url: `/api/places/${encodeURIComponent(this.place.place_id)}`,
            dataType: 'json'
        })
        .done(this[updaterSymbol]())
        .fail(this[updaterSymbol]({error: true}));
    }

    /**
     * Ensures that the Google Maps API object is visible and opens the information window to display information for
     * the active place.
     *
     * @method show
     */
    show() {
        this.api.setVisible(true);
        this.infoWindow.open(this.map.api, this.api);
    }

    /**
     * Sends the specified <code>submission</code> to the server via an asynchronous request and waits for the response.
     *
     * @param {PlaceSubmission} submission - the data to be sent to the server
     * @returns {jQuery.Promise} A promise which can be used to track the XHR.
     * @method submit
     */
    submit(submission) {
        this[updaterSymbol]({loading: true})();

        return $.ajax({
            method: 'POST',
            url: `/api/places/${encodeURIComponent(this.place.place_id)}/answer`,
            data: submission,
            dataType: 'json'
        })
        .done(this[updaterSymbol]({reloadHeatmap: true}))
        .fail(this[updaterSymbol]({error: true}));
    }

    /**
     * Returns a closure which can be used to handle the updating of the underlying data based on the
     * <code>options</code> provided.
     *
     * @param {Object} [options] - the options to configure how the closure behaves
     * @param {boolean} [options.error] - <code>true</code> if an error occurred; otherwise <code>false</code>
     * @param {boolean} [options.loading] - <code>true</code> if this {@link Marker} is currently updating; otherwise
     * <code>false</code>
     * @param {boolean} [options.reloadHeatmap] - <code>true</code> if the associated {@link Heatmap} should be
     * reloaded; otherwise <code>false</code>
     * @returns {function} The closure to be called with the updated data.
     * @private
     */
    [updaterSymbol](options = {}) {
        this.$el.data('place', this.place.place_id);

        return (place) => {
            if (this.place.place_id !== this.$el.data('place')) {
                return;
            }

            if (options.reloadHeatmap) {
                this.heatmap.load();
            }

            this.$el
                .find('.map-info-window-name')
                    .text(this.place.name)
                    .end()
                .find('.map-info-window-address')
                    .text(this.place.formatted_address)
                    .end()
                .find('.map-info-window-choices .btn')
                    .prop('disabled', !!options.loading)
                    .end()
                .find('.map-info-window-error')
                    .toggleClass('hide', !options.error)
                    .end()
                .find('.map-info-window-loading')
                    .toggleClass('hide', !options.loading)
                    .end()
                .find('.map-info-window-results')
                    .toggleClass('hide', options.error || options.loading)
                    .end();

            if (!options.error && !options.loading && place) {
                this[updateResultsSymbol](this.$el.find('.map-info-window-results'), place);
            }
        };
    }

    /**
     * Updates the results for one of the answers based on the information provided.
     *
     * @param {jQuery} $progressBar - the jQuery-wrapped progress bar to be used
     * @param {number} count - the total number of results for the associated answer
     * @param {number} percentage - the percentage of results for the associated answer
     * @private
     */
    [updateResultSymbol]($progressBar, count, percentage) {
        $progressBar.attr('aria-valuenow', percentage)
            .css('width', percentage + '%')
            .text(count);
    }

    /**
     * Updates the results (both yes and no answers) in the information window for the <code>place</code> provided.
     *
     * @param {jQuery} $results - the jQuery-wrapped container to be used
     * @param {PlaceModel} place - the {@link PlaceModel} whose results are to be displayed
     * @private
     */
    [updateResultsSymbol]($results, place) {
        let total = place.answers.no + place.answers.yes;
        let percentages = {
            no: Math.round(place.answers.no / total * 100),
            yes: Math.round(place.answers.yes / total * 100)
        };

        $results
            .find('.map-info-window-results-empty')
                .toggleClass('hide', total > 0)
                .end()
            .find('.progress')
                .toggleClass('hide', total === 0)
                .end();

        $results.find('[data-result]').each((index, progressBar) => {
            let $progressBar = $(progressBar);
            let answer = $progressBar.data('result');

            this[updateResultSymbol]($progressBar, place.answers[answer], percentages[answer]);
        });
    }

    /**
     * Returns the active place for this {@link Marker}.
     *
     * @returns {google.maps.places.PlaceResult} The active place.
     * @property place
     */
    get place() {
        return this[placeSymbol];
    }

    /**
     * Sets the active place for this {@link Marker} to <code>place</code>.
     *
     * @param {google.maps.places.PlaceResult} [place] - the place to be set
     * @property place
     */
    set place(place) {
        this.hide();

        this[placeSymbol] = place;

        if (place) {
            this.api.setIcon({
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(35, 35)
            });
            this.api.setPosition(place.geometry.location);
            this.api.setTitle(place.name);

            this.load();
            this.show();
        }
    }
}
