'use strict';

define([
    'jquery',
    './google-maps'
], function($, gmaps) {

    function Marker(options) {
        this.heatmap = options.heatmap;
        this.map = options.map;

        this.$el = $('<div class="map-info-window">').html($('#marker-template').html());
        this._infoWindow = new gmaps.InfoWindow({
            content: this.$el[0]
        });
        this._marker = new gmaps.Marker({
            anchorPoint: new gmaps.Point(0, -29),
            map: this.map.map
        });
        this._place = null;

        this.$el.on('click', '.btn[data-value]', $.proxy(function() {
            var answer = $(event.target).data('value');

            this.submit(answer);
        }, this));

        gmaps.event.addListener(this._marker, 'click', $.proxy(this.show, this));
    }

    Marker.prototype.hide = function() {
        this._infoWindow.close();
        this._marker.setVisible(false);

        return this;
    };

    Marker.prototype.load = function() {
        this._update({ loading: true })();

        return $.ajax({
            method: 'GET',
            url: '/api/places/' + encodeURIComponent(this._place.place_id),
            dataType: 'json',
            success: this._update(),
            error: this._update({ error: true })
        });
    };

    Marker.prototype.show = function() {
        this._marker.setVisible(true);
        this._infoWindow.open(this.map.map, this._marker);

        return this;
    };

    Marker.prototype.submit = function(answer) {
        this._update({ loading: true })();

        return $.ajax({
            method: 'POST',
            url: '/api/places/' + encodeURIComponent(this._place.place_id) + '/answer',
            data: {
                answer: answer,
                position: {
                    lat: this._place.geometry.location.lat(),
                    lng: this._place.geometry.location.lng()
                }
            },
            dataType: 'json',
            success: this._update({ reloadHeatmap: true }),
            error: this._update({ error: true })
        });
    };

    Marker.prototype._update = function(options) {
        options || (options = {});

        this.$el.data('place', this._place.place_id);

        return $.proxy(function(data) {
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
                this._updateResults(this.$el.find('.map-info-window-results'), data);
            }
        }, this);
    };

    Marker.prototype._updateResult = function($el, count, percentage) {
        $el.attr('aria-valuenow', percentage)
            .css('width', percentage + '%')
            .text(count);

        return this;
    };

    Marker.prototype._updateResults = function($el, data) {
        var total = data.answers.no + data.answers.yes;
        var percentages = {
            no: Math.round((data.answers.no / total) * 100),
            yes: Math.round((data.answers.yes / total) * 100)
        };

        $el
            .find('.map-info-window-results-empty')
                .toggleClass('hide', (total > 0))
                .end()
            .find('.progress')
                .toggleClass('hide', (total === 0))
                .end();

        this._updateResult($el.find('[data-result="no"]'), data.answers.no, percentages.no);
        this._updateResult($el.find('[data-result="yes"]'), data.answers.yes, percentages.yes);

        return this;
    };

    Marker.prototype.getPlace = function() {
        return this._place;
    };

    Marker.prototype.setPlace = function(place) {
        this.hide();

        this._place = place;

        if (place) {
            this._marker.setIcon({
                url: place.icon,
                size: new gmaps.Size(71, 71),
                origin: new gmaps.Point(0, 0),
                anchor: new gmaps.Point(17, 34),
                scaledSize: new gmaps.Size(35, 35)
            });
            this._marker.setPosition(place.geometry.location);
            this._marker.setTitle(place.name);

            this.load();
            this.show();
        }
    };

    return Marker;

});
