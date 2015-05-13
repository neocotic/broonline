/// <reference path="../../headers/tsd.d.ts" />
/// <reference path="../../headers/lib/map/Place.d.ts" />

import $ = require('jquery');
import gmaps = require('googlemaps!');
import Heatmap = require('./Heatmap');
import Map = require('./Map');

/**
 * Closure for the <code>updater</code> method that updates the underlying data when called.
 *
 * @param {PlaceModel} places - a place returned from the server to be handled
 * @type {function}
 */
interface MarkerUpdaterClosure {

    (place: PlaceModel): void;
}

/**
 * Options for the <code>updater</code> method to configure the behaviour of the {@link MarkerUpdaterClosure}.
 *
 * @interface MarkerUpdaterOptions
 */
interface MarkerUpdaterOptions {

    /**
     * Whether an error occurred.
     *
     * @type {boolean}
     */
    error?: boolean;

    /**
     * Whether the {@link Marker} is currently updating.
     *
     * @type {boolean}
     */
    loading?: boolean;

    /**
     * Whether the associated {@link Heatmap} should be reloaded.
     *
     * @type {boolean}
     */
    reloadHeatmap?: boolean;
}

/**
 * Component for displaying the marker for selected places.
 *
 * @class Marker
 */
class Marker {

    /**
     * The HTML string to be inserted into the underlying element for a {@link Marker}.
     *
     * @property html
     * @static
     * @type {string}
     */
    static html: string = $('#marker-template').html();

    /**
     * The underlying jQuery-wrapped element for this {@link Marker}.
     *
     * @property $el
     * @type {JQuery}
     */
    $el: JQuery;

    /**
     * Google Maps API object to be used by this {@link Marker}.
     *
     * @type {google.maps.Marker}
     */
    api: google.maps.Marker;

    /**
     * The underlying DOM element for this {@link Map}.
     *
     * @property el
     * @type {HTMLElement}
     */
    el: HTMLElement;

    /**
     * The {@link Heatmap} associated with this {@link Marker}.
     *
     * @property heatmap
     * @type {Heatmap}
     */
    heatmap: Heatmap;

    /**
     * Google Maps API information window used to display place details adjacent to this {@link Marker}.
     *
     * @property infoWindow
     * @type {google.maps.InfoWindow}
     */
    infoWindow: google.maps.InfoWindow;

    /**
     * The {@link Map} associated with this {@link Marker}.
     *
     * @property map
     * @type {Map}
     */
    map: Map;

    /**
     * Google Maps API details for the active place for this {@link Marker}.
     *
     * @property _place
     * @private
     * @type {google.maps.places.PlaceResult}
     */
    private _place: google.maps.places.PlaceResult;

    /**
     * Creates a new instance of {@link Marker} for the <code>map</code> and <code>heatmap</code> provided.
     *
     * @param {Map} map - the associated {@link Map} to be used
     * @param {Heatmap} heatmap - the associated {@link Heatmap} to be used
     * @constructor
     */
    constructor(map: Map, heatmap: Heatmap) {
        this.map = map;
        this.heatmap = heatmap;

        this.$el = $('<div class="map-info-window">').html(Marker.html);
        this.el = this.$el[0];

        this.api = new gmaps.Marker({
            anchorPoint: new gmaps.Point(0, -29),
            map: this.map.api
        });
        this.infoWindow = new gmaps.InfoWindow({
            content: this.el
        });
        this._place = null;

        this.$el.on('click', '.btn[data-value]', (event) => {
            let answer: string = $(event.target).data('value');
            let position = {
                lat: this._place.geometry.location.lat(),
                lng: this._place.geometry.location.lng()
            };

            this.submit({
                answer: answer,
                position: position
            });
        });

        gmaps.event.addListener(this.api, 'click', () => {
            this.show();
        });
    }

    /**
     * Ensures that the information window is closed and makes the Google Maps API object invisible.
     *
     * @method hide
     */
    hide(): void {
        this.infoWindow.close();
        this.api.setVisible(false);
    }

    /**
     * Loads the place data from the server via an asynchronous request.
     *
     * @method load
     * @returns {JQueryPromise<PlaceModel>} A promise which can be used to track the XHR.
     */
    load(): JQueryPromise<PlaceModel> {
        this.updater({ loading: true })();

        return $.ajax({
            method: 'GET',
            url: `/api/places/${encodeURIComponent(this._place.place_id)}`,
            dataType: 'json'
        })
        .done(this.updater())
        .fail(this.updater({ error: true }));
    }

    /**
     * Ensures that the Google Maps API object is visible and opens the information window to display information for
     * the active place.
     *
     * @method show
     */
    show(): void {
        this.api.setVisible(true);
        this.infoWindow.open(this.map.api, this.api);
    }

    /**
     * Sends the specified <code>submission</code> to the server via an asynchronous request and waits for the response.
     *
     * @method submit
     * @param {PlaceSubmission} submission - the data to be sent to the server
     * @returns {JQueryPromise<PlaceModel>} A promise which can be used to track the XHR.
     */
    submit(submission: PlaceSubmission): JQueryPromise<PlaceModel> {
        this.updater({ loading: true })();

        return $.ajax({
            method: 'POST',
            url: `/api/places/${encodeURIComponent(this._place.place_id)}/answer`,
            data: submission,
            dataType: 'json'
        })
        .done(this.updater({ reloadHeatmap: true }))
        .fail(this.updater({ error: true }));
    }

    /**
     * Returns a closure which can be used to handle the updating of the underlying data based on the
     * <code>options</code> provided.
     *
     * @method updater
     * @param {MarkerUpdaterOptions} [options] - the options to configure how the closure behaves
     * @returns {MarkerUpdaterClosure} The closure to be called with the updated data.
     * @private
     */
    private updater(options: MarkerUpdaterOptions = {}): MarkerUpdaterClosure {
        this.$el.data('place', this._place.place_id);

        return (place) => {
            if (this._place.place_id !== this.$el.data('place')) {
                return;
            }

            if (options.reloadHeatmap) {
                this.heatmap.load();
            }

            this.$el
                .find('.map-info-window-name')
                    .text(this._place.name)
                    .end()
                .find('.map-info-window-address')
                    .text(this._place.formatted_address)
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
                    .toggleClass('hide', (options.error || options.loading))
                    .end();

            if (!options.error && !options.loading) {
                this.updateResults(this.$el.find('.map-info-window-results'), place);
            }
        };
    }

    /**
     * Updates the results for one of the answers based on the information provided.
     *
     * @method updateResult
     * @param {JQuery} $progressBar - the jQuery-wrapped progress bar to be used
     * @param {number} count - the total number of results for the associated answer
     * @param {number} percentage - the percentage of results for the associated answer
     * @private
     */
    private updateResult($progressBar: JQuery, count: number, percentage: number): void {
        $progressBar.attr('aria-valuenow', percentage)
            .css('width', percentage + '%')
            .text(count);
    }

    /**
     * Updates the results (both yes and no answers) in the information window for the <code>place</code> provided.
     *
     * @method updateResults
     * @param {JQuery} $results - the jQuery-wrapped container to be used
     * @param {PlaceModel} place - the {@link PlaceModel} whose results are to be displayed
     * @private
     */
    private updateResults($results: JQuery, place: PlaceModel): void {
        let total = place.answers.no + place.answers.yes;
        let percentages = {
            no: Math.round((place.answers.no / total) * 100),
            yes: Math.round((place.answers.yes / total) * 100)
        };

        $results
            .find('.map-info-window-results-empty')
                .toggleClass('hide', (total > 0))
                .end()
            .find('.progress')
                .toggleClass('hide', (total === 0))
                .end();

        this.updateResult($results.find('[data-result="no"]'), place.answers.no, percentages.no);
        this.updateResult($results.find('[data-result="yes"]'), place.answers.yes, percentages.yes);
    }

    /**
     * Returns the active place for this {@link Marker}.
     *
     * @property place
     * @returns {google.maps.places.PlaceResult} The active place.
     */
    get place(): google.maps.places.PlaceResult {
        return this._place;
    }

    /**
     * Sets the active place for this {@link Marker} to <code>place</code>.
     *
     * @property place
     * @param {google.maps.places.PlaceResult} [place] - the place to be set
     */
    set place(place: google.maps.places.PlaceResult) {
        this.hide();

        this._place = place;

        if (this._place) {
            this.api.setIcon({
                url: this._place.icon,
                size: new gmaps.Size(71, 71),
                origin: new gmaps.Point(0, 0),
                anchor: new gmaps.Point(17, 34),
                scaledSize: new gmaps.Size(35, 35)
            });
            this.api.setPosition(this._place.geometry.location);
            this.api.setTitle(this._place.name);

            this.load();
            this.show();
        }
    }
}

export = Marker;
