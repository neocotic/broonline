/// <reference path="../headers/tsd.d.ts" />

declare let FreshWidget: any;

import $ = require('jquery');
require('bootstrap');
require('https://s3.amazonaws.com/assets.freshdesk.com/widget/freshwidget.js');

class SiteLinks {

    $el: JQuery;
    el: HTMLElement;

    constructor($el: JQuery) {
        this.$el = $el;
        this.el = this.$el[0];

        FreshWidget.init('', {
            queryString: '&widgetType=popup&screenshot=no&attachFile=no',
            widgetType: 'popup',
            alignment: '4',
            offset: '-1500px',
            formHeight: '500px',
            screenshot: 'no',
            url: 'https://thebroonline.freshdesk.com'
        });

        this.$el.find('.navbar-link[title]').tooltip({
            container: 'body',
            placement: 'bottom'
        });

        this.$el.on('click', '.navbar-link-support', (event) => {
            event.preventDefault();

            this.showFeedback();
        });
    }

    hideFeedback(): void {
        FreshWidget.close();
    }

    showFeedback(): void {
        FreshWidget.show();
    }
}

export = SiteLinks;
