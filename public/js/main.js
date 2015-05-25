import * as $ from 'jquery';
import AutoComplete from './lib/map/auto-complete';
import Heatmap from './lib/map/heatmap';
import Map from './lib/map/map';
import Marker from './lib/map/marker';
import SiteLinks from './lib/site-links';

/**
 * The main entry point for this application.
 *
 * @class Application
 */
export class Application {

    /**
     * The {@link AutoComplete} associated with this {@link Application}.
     *
     * @type {AutoComplete}
     * @property autoComplete
     */
    autoComplete;

    /**
     * The {@link Heatmap} associated with this {@link Application}.
     *
     * @type {Heatmap}
     * @property heatmap
     */
    heatmap;

    /**
     * The {@link Map} associated with this {@link Application}.
     *
     * @type {Map}
     * @property map
     */
    map;

    /**
     * The {@link Marker} associated with this {@link Application}.
     *
     * @type {Marker}
     * @property marker
     */
    marker;

    /**
     * The {@link SiteLinks} associated with this {@link Application}.
     *
     * @type {SiteLinks}
     * @property siteLinks
     */
    siteLinks;

    /**
     * Creates a new instance of {@link Application}.
     *
     * @constructor
     */
    constructor() {
        let $autoComplete = $('#pac-input');
        let $map = $('#map-canvas');
        let $siteLinks = $('.navbar-site-links');

        this.siteLinks = new SiteLinks($siteLinks);

        if ($autoComplete.length && $map.length) {
            this.map = new Map($map);
            this.heatmap = new Heatmap(this.map);
            this.marker = new Marker(this.map, this.heatmap);
            this.autoComplete = new AutoComplete($autoComplete, this.map, this.marker);
        }
    }
}

export default new Application();
