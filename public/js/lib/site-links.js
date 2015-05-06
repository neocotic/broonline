'use strict';

define([
    'jquery',
    'bootstrap',
    'https://s3.amazonaws.com/assets.freshdesk.com/widget/freshwidget.js'
], function($) {

    function SiteLinks(options) {
        this.$el = options.$el;
        this.el = this.$el[0];

        FreshWidget.init('', {
            queryString: '&widgetType=popup&screenshot=no&attachFile=no',
            widgetType: 'popup',
            alignment: '4',
            offset: '-1500px',
            formHeight: '500px',
            url: 'https://thebroonline.freshdesk.com'
        });

        this.$el.find('.navbar-link[title]').tooltip({
            container: 'body',
            placement: 'bottom'
        });

        this.$el.on('click', '.navbar-link-support', $.proxy(function(event) {
            event.preventDefault();

            this.showFeedback();
        }, this));
    }

    SiteLinks.prototype.hideFeedback = function() {
        FreshWidget.close();

        return this;
    };

    SiteLinks.prototype.showFeedback = function() {
        FreshWidget.show();

        return this;
    };

    return SiteLinks;

});
