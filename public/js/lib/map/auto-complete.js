/**
 * Component for displaying the auto-completion input field to find and select places.
 *
 * @class AutoComplete
 */
export class AutoComplete {

    /**
     * The underlying jQuery-wrapped element for this {@link AutoComplete}.
     *
     * @type {jQuery}
     * @property $el
     */
    $el;

    /**
     * The jQuery-wrapped input element for this {@link AutoComplete}.
     *
     * @type {jQuery}
     * @property $input
     */
    $input;

    /**
     * Google Maps API object to be used by this {@link AutoComplete}.
     *
     * @type {google.maps.places.Autocomplete}
     * @property api
     */
    api;

    /**
     * The underlying DOM element for this {@link AutoComplete}.
     *
     * @type {HTMLElement}
     * @property el
     */
    el;

    /**
     * The DOM input element for this {@link AutoComplete}.
     *
     * @type {HTMLInputElement}
     * @property input
     */
    input;

    /**
     * The {@link Map} associated with this {@link AutoComplete}.
     *
     * @type {Map}
     * @property map
     */
    map;

    /**
     * The {@link Marker} associated with this {@link AutoComplete}.
     *
     * @type {Marker}
     * @property marker
     */
    marker;

    /**
     * Creates a new instance of {@link AutoComplete} for the <code>map</code> and <code>marker</code> provided.
     *
     * @param {jQuery} $el - the jQuery-wrapped element to be used
     * @param {Map} map - the associated {@link Map} to be used
     * @param {Marker} marker - the associated {@link Marker} to be used
     * @constructor
     */
    constructor($el, map, marker) {
        this.$el = $el;
        this.el = this.$el[0];
        this.$input = this.$el.find('input');
        this.input = this.$input[0];
        this.map = map;
        this.marker = marker;

        this.api = new google.maps.places.Autocomplete(this.input);
        this.api.bindTo('bounds', this.map.api);
        this.api.setTypes(['establishment']);

        this.map.api.controls[google.maps.ControlPosition.TOP_LEFT].push(this.el);

        this.$el.on('click', '.btn-clear', () => {
            this.clear();
        });

        google.maps.event.addListener(this.api, 'place_changed', () => {
            this.place = this.api.getPlace();
        });
    }

    /**
     * Clears the input field and ensures that the associated {@link Marker} is hidden.
     *
     * @method clear
     */
    clear() {
        this.$input.val('');
        this.marker.hide();
    }

    /**
     * Returns the active place for the associated {@link Marker}.
     *
     * @returns {google.maps.places.PlaceResult} The active place.
     * @property place
     */
    get place() {
        return this.marker.place;
    }

    /**
     * Sets the active place for the associated {@link Marker} to <code>place</code>.
     * <p/>
     * If <code>place</code> is not specified or it has no <code>geometry</code> assigned to it, then the associated
     * {@link Marker} will simply be hidden and nothing else will happen.
     *
     * @param {google.maps.places.PlaceResult} [place] - the place to be set
     * @property place
     */
    set place(place) {
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
