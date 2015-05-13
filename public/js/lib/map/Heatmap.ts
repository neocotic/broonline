/// <reference path="../../headers/tsd.d.ts" />

import $ = require('jquery');
import gmaps = require('googlemaps!');
import Map = require('./Map');

/**
 * Closure for the <code>updater</code> method that updates the underlying data when called.
 *
 * @param {PlaceModel[]} places - a list of places returned from the server to be handled
 * @type {function}
 */
interface HeatmapUpdaterClosure {

    (places: PlaceModel[]): void;
}

/**
 * Component for displaying heatmap of places with dominant answers.
 *
 * @class Heatmap
 */
class Heatmap {

    /**
     * Colors for the gradient used to paint the heatmap.
     *
     * @property gradient
     * @static
     * @type {string[]}
     */
    static gradient: string[] = [
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

    /**
     * Google Maps API object to be used by this {@link Heatmap}.
     *
     * @property api
     * @type {google.maps.visualization.HeatmapLayer}
     */
    api: google.maps.visualization.HeatmapLayer;

    /**
     * Google Maps API array to contain data for this {@link Heatmap}.
     *
     * @property array
     * @type {google.maps.MVCArray}
     */
    array: google.maps.MVCArray;

    /**
     * The {@link Map} associated with this {@link Heatmap}.
     *
     * @property map
     * @type {Map}
     */
    map: Map;

    /**
     * Creates a new instance of {@link Heatmap} for the <code>map</code> provided.
     *
     * @param {Map} map - the associated {@link Map} to be used
     * @constructor
     */
    constructor(map: Map) {
        this.map = map;
        this.array = new gmaps.MVCArray([]);
        this.api = new gmaps.visualization.HeatmapLayer({
            data: this.array
        });
        this.api.setMap(this.map.api);
        this.api.setValues({
            gradient: Heatmap.gradient,
            maxIntensity: 1,
            opacity: 0.75,
            radius: 25
        });

        this.load();
    }

    /**
     * Loads the heatmap data from the server via an asynchronous request.
     *
     * @method load
     * @returns {JQueryPromise<PlaceModel[]>} A promise which can be used to track the XHR.
     */
    load(): JQueryPromise<PlaceModel[]> {
        return $.ajax({
            method: 'GET',
            url: '/api/places/heatmap',
            dataType: 'json'
        })
        .done(this.updater());
    }

    /**
     * Returns a closure which can be used to handle the updating of the underlying data.
     *
     * @method updater
     * @returns {HeatmapUpdaterClosure} The closure to be called with the updated data.
     * @private
     */
    private updater(): HeatmapUpdaterClosure {
        return (places) => {
            this.array.clear();

            $.each(places, (index, place) => {
                this.array.push(new gmaps.LatLng(place.position.latitude, place.position.longitude));
            });
        };
    }
}

export = Heatmap;
