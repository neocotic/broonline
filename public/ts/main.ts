/// <reference path="headers/tsd.d.ts" />

require.config({
    shim: {
        'bootstrap': {
            deps: ['jquery']
        }
    }
});

import $ = require('jquery');
import Map = require('./lib/map/Map');
import AutoComplete = require('./lib/map/AutoComplete');
import Heatmap = require('./lib/map/Heatmap');
import Marker = require('./lib/map/Marker');
import SiteLinks = require('./lib/SiteLinks');

/**
 * The main entry point for this application.
 *
 * @class Application
 */
class Application {

    /**
     * The {@link AutoComplete} associated with this {@link Application}.
     *
     * @property autoComplete
     * @type {AutoComplete}
     */
    autoComplete: AutoComplete;

    /**
     * The {@link Heatmap} associated with this {@link Application}.
     *
     * @property heatmap
     * @type {Heatmap}
     */
    heatmap: Heatmap;

    /**
     * The {@link Map} associated with this {@link Application}.
     *
     * @property map
     * @type {Map}
     */
    map: Map;

    /**
     * The {@link Marker} associated with this {@link Application}.
     *
     * @property marker
     * @type {Marker}
     */
    marker: Marker;

    /**
     * The {@link SiteLinks} associated with this {@link Application}.
     *
     * @property siteLinks
     * @type {SiteLinks}
     */
    siteLinks: SiteLinks;

    /**
     * Creates a new instance of {@link Application}.
     *
     * @constructor
     */
    constructor() {
        let $autoComplete: JQuery = $('#pac-input');
        let $map: JQuery = $('#map-canvas');
        let $siteLinks: JQuery = $('.navbar-site-links');

        this.siteLinks = new SiteLinks($siteLinks);

        if ($autoComplete.length && $map.length) {
            this.map = new Map($map);
            this.heatmap = new Heatmap(this.map);
            this.marker = new Marker(this.map, this.heatmap);
            this.autoComplete = new AutoComplete($autoComplete, this.map, this.marker);
        }
    }
}

export = new Application();
