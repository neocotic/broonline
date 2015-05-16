/// <reference path="../../headers/tsd.d.ts" />

import Map = require('./Map');
import Marker = require('./Marker');
import gmaps = require('googlemaps!');

/**
 * Component for displaying the auto-completion input field to find and select places.
 *
 * @class AutoComplete
 */
class AutoComplete {

    /**
     * The underlying jQuery-wrapped element for this {@link AutoComplete}.
     *
     * @property $el
     * @type {JQuery}
     */
    $el: JQuery;

    /**
     * The jQuery-wrapped input element for this {@link AutoComplete}.
     *
     * @property $input
     * @type {JQuery}
     */
    $input: JQuery;

    /**
     * Google Maps API object to be used by this {@link AutoComplete}.
     *
     * @property api
     * @type {google.maps.places.Autocomplete}
     */
    api: google.maps.places.Autocomplete;

    /**
     * The underlying DOM element for this {@link AutoComplete}.
     *
     * @property el
     * @type {HTMLElement}
     */
    el: HTMLElement;

    /**
     * The DOM input element for this {@link AutoComplete}.
     *
     * @property input
     * @type {HTMLInputElement}
     */
    input: HTMLInputElement;

    /**
     * The {@link Map} associated with this {@link AutoComplete}.
     *
     * @property map
     * @type {Map}
     */
    map: Map;

    /**
     * The {@link Marker} associated with this {@link AutoComplete}.
     *
     * @property marker
     * @type {Marker}
     */
    marker: Marker;

    /**
     * Creates a new instance of {@link AutoComplete} for the <code>map</code> and <code>marker</code> provided.
     *
     * @param {JQuery} $el - the jQuery-wrapped element to be used
     * @param {Map} map - the associated {@link Map} to be used
     * @param {Marker} marker - the associated {@link Marker} to be used
     * @constructor
     */
    constructor($el: JQuery, map: Map, marker: Marker) {
        this.$el = $el;
        this.el = this.$el[0];
        this.$input = this.$el.find('input');
        this.input = <HTMLInputElement> this.$input[0];
        this.map = map;
        this.marker = marker;

        this.api = new gmaps.places.Autocomplete(this.input);
        this.api.bindTo('bounds', this.map.api);
        this.api.setTypes(['establishment']);

        this.map.api.controls[gmaps.ControlPosition.TOP_LEFT].push(this.el);

        this.$el.on('click', '.btn-clear', () => {
            this.clear();
        });

        gmaps.event.addListener(this.api, 'place_changed', () => {
            this.place = this.api.getPlace();
        });
    }

    /**
     * Clears the input field and ensures that the associated {@link Marker} is hidden.
     *
     * @method clear
     */
    clear(): void {
        this.$input.val('');
        this.marker.hide();
    }

    /**
     * Returns the active place for the associated {@link Marker}.
     *
     * @property place
     * @returns {google.maps.places.PlaceResult} The active place.
     */
    get place(): google.maps.places.PlaceResult {
        return this.marker.place;
    }

    /**
     * Sets the active place for the associated {@link Marker} to <code>place</code>.
     * <p/>
     * If <code>place</code> is not specified or it has no <code>geometry</code> assigned to it, then the associated
     * {@link Marker} will simply be hidden and nothing else will happen.
     *
     * @property place
     * @param {google.maps.places.PlaceResult} [place] - the place to be set
     */
    set place(place: google.maps.places.PlaceResult) {
        this.marker.hide();

        if (!(place && place.geometry)) {
            return;
        }

        if (place.geometry.viewport) {
            this.map.api.fitBounds(place.geometry.viewport);
        } else {
            this.map.api.setCenter(place.geometry.location);
            this.map.api.setZoom(17);
        }

        this.marker.place = place;
    }
}

export = AutoComplete;
