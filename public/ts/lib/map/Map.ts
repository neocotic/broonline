/// <reference path="../../headers/tsd.d.ts" />

/**
 * Primary component responsible for displaying the map.
 *
 * @class Map
 */
class Map {

    /**
     * The underlying jQuery-wrapped element for this {@link Map}.
     *
     * @property $el
     * @type {JQuery}
     */
    $el: JQuery;

    /**
     * Google Maps API object to be used by this {@link Map}.
     *
     * @property api
     * @type {google.maps.Map}
     */
    api: google.maps.Map;

    /**
     * The underlying DOM element for this {@link Map}.
     *
     * @property el
     * @type {HTMLElement}
     */
    el: HTMLElement;

    /**
     * Creates a new instance of {@link Map}.
     *
     * @param {JQuery} $el - the jQuery-wrapped element to be used
     */
    constructor($el: JQuery) {
        this.$el = $el;
        this.el = this.$el[0];

        this.api = new google.maps.Map(this.el, {
            center: new google.maps.LatLng(55.9410656, -3.2053836),
            zoom: 8
        });
    }
}

export = Map;
