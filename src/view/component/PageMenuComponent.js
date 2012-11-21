/**
 * PureMVC JS Demo: Responsive Page System
 * @author Mike Britton
 */
puremvc.define({
    name : 'rps.PageMenuComponent',
    constructor : function(event) {
    }
},

// INSTANCE MEMBERS
{
    signals : {
        readySignal : new signals.Signal(),
        logSignal : new signals.Signal(),
        buttonClickSignal : new signals.Signal()
    },

    build : function(pageData) {

        var portraitSizePages = pageData.dimensions.height - (pageData.dimensions.topNavHeight + pageData.dimensions.navHeight) + 'px';
        var landscapeSizePages = pageData.dimensions.height - pageData.dimensions.topNavHeight + 'px';

        var pageButton;
        var targ = this;
        var newLineHeight;
        $.each(pageData.items, function(i, item) {

            pageButton = $('<div id="' + item.id + 'PageMenuButton" class="pageMenuButton">' + item.title + '</div>');

            $('.pageMenuButtons').append(pageButton);

            if (pageData.contentConfig.orientation == rps.AppConstants.LANDSCAPE_MODE) {
                newLineHeight = 40;
            } else {
                newLineHeight = 60;
            }

            $('.pageMenuButton').css({
                lineHeight : newLineHeight + 'px',
                height : newLineHeight + 'px'
            });

            $(document).off(pageData.contentConfig.mainGesture, '#' + item.id + 'ContentText');
            $(document).on(pageData.contentConfig.mainGesture, '#' + item.id + 'PageMenuButton', function(event) {
                targ.signals[rps.PageMenuComponent.SIGNAL_BUTTONCLICK].dispatch(rps.PageMenuComponent.SIGNAL_BUTTONCLICK, event.target);
                event.preventDefault();
            });
        });
        this.redraw(pageData);
        this.signals.readySignal.dispatch(rps.PageMenuComponent.SIGNAL_READY);
        delete pageData;
    },

    /**
     * Triggered by resize of window, and other events that require a UI update
     * Needs cleanup
     */
    redraw : function(pageData) {

        var isLandscapeMode = pageData.contentConfig.orientation == rps.AppConstants.LANDSCAPE_MODE;
        var pageYSize = pageData.dimensions.height;
        var pageXSize = pageData.dimensions.width;
        var pageYLocation = 0;
        var topPos, leftPos;
        var pageMenuButtonsWidth, pageMenuButtonsHeight;
        var baseYHeight, baseWidth;

        /**
         * Determine page height, width and top position in pixels based on
         * presence of the top nav.
         */
        if (pageData.contentConfig.topNavActivated) {
            if (isLandscapeMode) {
                pageYSize = pageData.dimensions.height;
                pageXSize = 300;
            } else {
                pageYSize = pageData.dimensions.height - (pageData.dimensions.topNavHeight + pageData.dimensions.navHeight);
                pageXSize = pageData.dimensions.width;
                pageYLocation = pageData.dimensions.topNavHeight;
            }
        } else {
            pageYSize = pageData.dimensions.height - pageData.dimensions.navHeight;
        }

        // Set width, height and top position
        $('.pageMenu').css({
            width : pageXSize + 'px',
            height : pageYSize + 'px',
            top : pageYLocation + 'px'
        });

        // Determine width of page menu buttons
        if (!isLandscapeMode) {
            pageMenuButtonsWidth = pageData.dimensions.width;
            pageMenuButtonsHeight = 80;
        } else {
            pageMenuButtonsWidth = pageXSize;
            pageMenuButtonsHeight = 40;
        }

        $('.pageMenuButton').css({
            width : pageMenuButtonsWidth + 'px',
            height : pageMenuButtonsHeight + 'px',
            lineHeight : pageMenuButtonsHeight + 'px'
        });

        baseYHeight = parseInt($('.pageMenuButtons').css('height').replace('px', ''));
        baseWidth = parseInt($('.pageMenuButtons').css('width'));
        if (pageData.contentConfig.isHome) {
            baseYHeight = baseYHeight + pageData.dimensions.navHeight;
        }

        /**
         * If the menu is activated, position relative to it.
         * Otherwise position in the center of the content area.
         */
        if (pageData.contentConfig.menuActivated) {
            if (isLandscapeMode) {
                topPos = pageData.dimensions.topNavHeight;
                leftPos = 0;
            } else {
                topPos = (pageData.dimensions.height / 2) - (baseYHeight / 2);
                leftPos = (pageData.dimensions.width / 2) - (baseWidth / 2);
            }
        } else {
            if (isLandscapeMode) {
                topPos = pageData.dimensions.topNavHeight;
                leftPos = -$('.leftNav').css('width').replace('px', '');
            } else {
                topPos = (pageData.dimensions.height / 2) - (baseYHeight / 2);
                leftPos = (pageData.dimensions.width / 2) - (baseWidth / 2);
            }
        }

        $('.pageMenuButtons').css({
            top : topPos + 'px',
            left : leftPos + 'px'
        });
        delete pageData;
    },

    showPageMenu : function(pageData) {
        $('.pageMenu,.pageMenuButtons').css({
            display : 'inline',
            left : '-300px'
        });
        $('.pageMenu,.pageMenuButtons').animate({
            left : '0px'
        }, {
            duration : (pageData.contentConfig.orientation == rps.AppConstants.LANDSCAPE_MODE) ? 250 : 0
        });
        delete pageData;
    },

    hidePageMenu : function(pageData) {
        $('.pageMenu,.pageMenuButtons').animate({
            left : '-300px'
        }, {
            duration : (pageData.contentConfig.orientation == rps.AppConstants.LANDSCAPE_MODE) ? 250 : 0,
            complete : function(e) {
                $('.pageMenu,.pageMenuButtons').css({
                    display : 'none'
                });
            }
        });
        delete pageData;
    }
},

// CLASS MEMBERS
{
    NAME : 'PageMenuComponent',
    SIGNAL_READY : 'readySignal',
    SIGNAL_BUTTONCLICK : 'buttonClickSignal'
});
