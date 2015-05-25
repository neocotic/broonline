import 'bootstrap';

/**
 * TODO: doc
 *
 * @class SiteLinks
 */
export class SiteLinks {

    /**
     * TODO: doc
     *
     * @type {jQuery}
     * @property $el
     */
    $el;

    /**
     * TODO: doc
     *
     * @type {HTMLElement}
     * @property el
     */
    el;

    /**
     * TODO: doc
     *
     * @param {jQuery} $el -
     * @constructor
     */
    constructor($el) {
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

    /**
     * TODO: doc
     *
     * @method hideFeedback
     */
    hideFeedback() {
        FreshWidget.close();
    }

    /**
     * TODO: doc
     *
     * @method showFeedback
     */
    showFeedback() {
        FreshWidget.show();
    }
}
