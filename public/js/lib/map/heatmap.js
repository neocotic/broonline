import * as $ from 'jquery';

/**
 * Colors for the gradient used to paint the heatmap.
 *
 * @constant
 * @type {string[]}
 */
const gradient = [
    'rgba(160, 82, 45, 0)',
    'rgba(160, 82, 45, 0)',
    'rgba(160, 82, 45, 1)',
    'rgba(160, 82, 45, 1)',
    'rgba(160, 82, 45, 1)',
    'rgba(160, 82, 45, 1)',
    'rgba(160, 82, 45, 1)',
    'rgba(160, 82, 45, 1)',
    'rgba(160, 82, 45, 1)',
    'rgba(160, 82, 45, 1)',
    'rgba(160, 82, 45, 1)',
    'rgba(160, 82, 45, 1)',
    'rgba(160, 82, 45, 1)',
    'rgba(160, 82, 45, 1)'
];

const updaterSymbol = Symbol('updater');

/**
 * Component for displaying heatmap of places with dominant answers.
 *
 * @class Heatmap
 */
export class Heatmap {

    /**
     * Google Maps API object to be used by this {@link Heatmap}.
     *
     * @type {google.maps.visualization.HeatmapLayer}
     * @property api
     */
    api;

    /**
     * Google Maps API array to contain data for this {@link Heatmap}.
     *
     * @type {google.maps.MVCArray}
     * @property array
     */
    array;

    /**
     * The {@link Map} associated with this {@link Heatmap}.
     *
     * @type {Map}
     * @property map
     */
    map;

    /**
     * Creates a new instance of {@link Heatmap} for the <code>map</code> provided.
     *
     * @param {Map} map - the associated {@link Map} to be used
     * @constructor
     */
    constructor(map) {
        this.map = map;
        this.array = new google.maps.MVCArray([]);
        this.api = new google.maps.visualization.HeatmapLayer({
            data: this.array
        });
        this.api.setMap(this.map.api);
        this.api.setValues({
            gradient,
            maxIntensity: 1,
            opacity: 0.75,
            radius: 25
        });

        this.load();
    }

    /**
     * Loads the heatmap data from the server via an asynchronous request.
     *
     * @returns {jQuery.Promise} A promise which can be used to track the XHR.
     * @method load
     */
    load() {
        return $.ajax({
            method: 'GET',
            url: '/api/places/heatmap',
            dataType: 'json'
        })
        .done(this[updaterSymbol]());
    }

    /**
     * Returns a closure which can be used to handle the updating of the underlying data.
     *
     * @returns {function} The closure to be called with the updated data.
     * @private
     */
    [updaterSymbol]() {
        return (places) => {
            this.array.clear();

            $.each(places, (index, place) => {
                this.array.push(new google.maps.LatLng(place.position.latitude, place.position.longitude));
            });
        };
    }
}
