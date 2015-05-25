/**
 * Primary component responsible for displaying the map.
 *
 * @class Map
 */
export class Map {

    /**
     * The underlying jQuery-wrapped element for this {@link Map}.
     *
     * @type {jQuery}
     * @property $el
     */
    $el;

    /**
     * Google Maps API object to be used by this {@link Map}.
     *
     * @type {google.maps.Map}
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
     * Creates a new instance of {@link Map}.
     *
     * @param {jQuery} $el - the jQuery-wrapped element to be used
     * @constructor
     */
    constructor($el) {
        this.$el = $el;
        this.el = this.$el[0];

        this.api = new google.maps.Map(this.el, {
            center: new google.maps.LatLng(55.9410656, -3.2053836),
            zoom: 8
        });
    }
}
