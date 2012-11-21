/**
 * PureMVC JS Demo: Responsive Page System
 * @author Mike Britton
 */
puremvc.define({
    name : 'rps.BottomNavComponent',
    constructor : function(event) {
    }
},

// INSTANCE MEMBERS
{
    signals : {
        nextSignal : new signals.Signal(),
        previousSignal : new signals.Signal(),
        showPageMenuSignal : new signals.Signal(),
        hidePageMenuSignal : new signals.Signal(),
        backSignal : new signals.Signal(),
    },

    build : function(pageData) {
        var target = this;
        var prevlink = '<div id="previousButton" class="navButtonPrevious">&nbsp;</div>';
        var nextlink = '<div id="nextButton" class="navButtonNext">&nbsp;</div>';
        var combobox = '<div id="pagesButton" class="navButtonMenu">&nbsp;</div>';

        $('.bottomNav').append(prevlink, combobox, nextlink);

        $('.bottomNav').css({
            left : '0px',
            right : '0px',
            bottom : '0px',
            height : pageData.dimensions.navHeight + 'px',
            width : pageData.dimensions.width + 'px',
            color : pageData.contentConfig.navTextColor,
            lineHeight : pageData.dimensions.navHeight + 'px',
            top : (pageData.contentConfig.orientation == rps.AppConstants.PORTRAIT_MODE ) ? pageData.dimensions.height - pageData.dimensions.navHeight + 'px' : '0px'
        });

        var numButtons = $('.bottomNav').children().length;

        $('.navButtonMenu,.navButtonPrevious,.navButtonNext').css({
            width : pageData.dimensions.width / numButtons + 'px'
        });

        // Always remove event before adding
        $(document).off(pageData.contentConfig.mainGesture, '.navButtonPrevious');
        $(document).on(pageData.contentConfig.mainGesture, '.navButtonPrevious', function(e) {
            target.signals[rps.BottomNavComponent.SIGNAL_PREVIOUS].dispatch(rps.BottomNavComponent.SIGNAL_PREVIOUS);
        });

        $(document).off(pageData.contentConfig.mainGesture, '.navButtonNext');
        $(document).on(pageData.contentConfig.mainGesture, '.navButtonNext', function(e) {
            target.signals[rps.BottomNavComponent.SIGNAL_NEXT].dispatch(rps.BottomNavComponent.SIGNAL_NEXT);
        });

        $(document).off(pageData.contentConfig.mainGesture, '.navButtonMenu');
        $(document).on(pageData.contentConfig.mainGesture, '.navButtonMenu', function(e) {
            var sig;
            if (!pageData.contentConfig.menuActivated) {
                sig = rps.BottomNavComponent.SIGNAL_SHOW_PAGEMENU;

            } else {
                sig = rps.BottomNavComponent.SIGNAL_HIDE_PAGEMENU;
            }
            target.signals[sig].dispatch(sig);
        });
        this.redraw(pageData);
    },

    toggleMenuButtonStyle : function(pageData) {
        var newCSS;
        if (pageData.contentConfig.menuActivated) {
            newCSS = {
                background : 'url(css/images/menu_white.png)',
                backgroundRepeat : 'no-repeat',
                backgroundPosition : 'center center',
                backgroundColor : '#000000'
            };
        } else {
            newCSS = {
                background : 'url(css/images/menu_black.png)',
                backgroundRepeat : 'no-repeat',
                backgroundPosition : 'center center',
                backgroundColor : '#FFFFFF'
            };
        }
        $('.navButtonMenu').css(newCSS);
    },

    redraw : function(pageData) {
        var numButtons = $('.bottomNav').children().length;

        this.toggleMenuButtonStyle(pageData);

        $('.bottomNav').css({
            width : pageData.dimensions.width + 'px',
            top : pageData.dimensions.height - pageData.dimensions.navHeight + 'px',
            display : (pageData.contentConfig.orientation == rps.AppConstants.PORTRAIT_MODE) ? 'inline' : 'none'
        });

        $('.navButtonMenu,.navButtonPrevious,.navButtonNext').css({
            width : pageData.dimensions.width / numButtons + 'px'
        });
    },
},

// STATIC MEMBERS
{
    NAME : 'BottomNavComponent',
    SIGNAL_NEXT : 'nextSignal',
    SIGNAL_PREVIOUS : 'previousSignal',
    SIGNAL_SHOW_PAGEMENU : 'showPageMenuSignal',
    SIGNAL_HIDE_PAGEMENU : 'hidePageMenuSignal',
    SIGNAL_BACK : 'backSignal',
});
