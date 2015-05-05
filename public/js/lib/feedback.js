'use strict';

define([
    'jquery',
    'https://s3.amazonaws.com/assets.freshdesk.com/widget/freshwidget.js'
], function($) {

    function Feedback(options) {
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

        this.$el.on('click', $.proxy(function(event) {
            event.preventDefault();

            this.show();
        }, this));
    }

    Feedback.prototype.hide = function() {
        FreshWidget.close();

        return this;
    };

    Feedback.prototype.show = function() {
        FreshWidget.show();

        return this;
    };

    return Feedback;

});
