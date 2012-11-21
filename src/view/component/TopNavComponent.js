/**
 * PureMVC JS Demo: Responsive Page System
 * @author Mike Britton
 */
puremvc.define({
    name : 'rps.TopNavComponent',
    constructor : function(event) {
    }
},

// INSTANCE MEMBERS
{
    leftMenuToggled : false,
    topNavToggled : false,
    signals : {
        backSignal : new signals.Signal(),
        homeSignal : new signals.Signal(),
        toggleDebugSignal : new signals.Signal(),
        toggleMenuSignal : new signals.Signal(),
        menuExtendedSignal : new signals.Signal(),
        menuRetractedSignal : new signals.Signal(),
        topNavHiddenSignal : new signals.Signal(),
        topNavShownSignal : new signals.Signal(),
    },

    addBackButton : function(pageData) {
        var bb = '<div id="backButton" class="topNavButtonBack">&nbsp;</div>';
        var context = this;

        if (!pageData.contentConfig.isHome) {
            if ($('.topNavButtonBack').length < 1) {
                $('.topNav').append(bb);
            }

            $(document).off(pageData.contentConfig.mainGesture, '.topNavButtonBack');
            $(document).on(pageData.contentConfig.mainGesture, '.topNavButtonBack', function() {
                context.signals[rps.TopNavComponent.SIGNAL_BACK].dispatch(rps.TopNavComponent.SIGNAL_BACK);
            });

            this.updateButtons(pageData);
        }
    },

    addHomeButton : function(pageData) {
        var homeButton = '<div id="homeButton" class="topNavButtonHome">&nbsp;</div>';
        var context = this;

        if (!pageData.contentConfig.isHome) {
            if ($('.topNavButtonHome').length < 1) {
                $('.topNav').append(homeButton);
            }

            $(document).off(pageData.contentConfig.mainGesture, '.topNavButtonHome');
            $(document).on(pageData.contentConfig.mainGesture, '.topNavButtonHome', function() {
                context.signals[rps.TopNavComponent.SIGNAL_HOME].dispatch(rps.TopNavComponent.SIGNAL_HOME);
            });

            this.updateButtons(pageData);
        }
    },

    addMenuButton : function(pageData) {
        var menuButton = '<div id="menuButton" class="navButtonMenuTop">&nbsp;</div>';
        var target = this;

        if ($('.menuButton').length < 1) {
            $('.topNav').append(menuButton);
        }

        $(document).off(pageData.contentConfig.mainGesture, '.navButtonMenuTop');
        $(document).on(pageData.contentConfig.mainGesture, '.navButtonMenuTop', function() {
            target.signals[rps.TopNavComponent.SIGNAL_TOGGLE_MENU].dispatch(rps.TopNavComponent.SIGNAL_TOGGLE_MENU);
            target.toggleMenuButtonStyle(pageData);
        });

        this.updateButtons(pageData);
    },

    build : function(pageData) {
        var showTopNav = false;
        if (pageData.contentConfig.orientation == rps.AppConstants.LANDSCAPE_MODE)
            showTopNav = true;

        $('.topNav').css({
            top : (!showTopNav) ? -pageData.dimensions.topNavHeight + 'px' : '0px',
            width : pageData.dimensions.width + 'px',
            height : pageData.dimensions.topNavHeight + 'px',
            lineHeight : pageData.dimensions.topNavHeight + 'px', // Centers text in div
        });
        delete pageData;
    },

    getLeftMenuToggled : function() {
        return this.leftMenuToggled;
    },

    removeBackButton : function(pageData) {
        $('.topNavButtonBack').remove();
        this.updateButtons(pageData);
    },

    removeHomeButton : function(pageData) {
        $('.topNavButtonHome').remove();
        this.updateButtons(pageData);
    },

    removeMenuButton : function(pageData) {
        $('.navButtonMenuTop').remove();
        this.updateButtons(pageData);
    },

    setLeftMenuToggled : function(toggled) {
        this.leftMenuToggled = toggled;
    },

    toggleLeftMenu : function(pageData) {
        var target = this;
        var animData = {
            duration : 250,
            easing : 'easeInOutSine'
        };

        // Toggled means 'selected'
        if (!this.getLeftMenuToggled()) {

            // Tells menu view to turn on
            target.signals[rps.TopNavComponent.SIGNAL_MENU_EXTENDED].dispatch(rps.TopNavComponent.SIGNAL_MENU_EXTENDED);

            $('.leftNav').css({
                width : '100px',
                height : pageData.dimensions.height + 'px',
            });

            $('.leftNav').animate({
                left : '0px',
            }, animData);

            $('.topNav,.viewPort').animate({
                left : '300px'
            }, {
                easing : animData.easing,
                duration : animData.duration
            });

            this.setLeftMenuToggled(true);
        } else {

            // Tells menu view to turn on
            this.signals[rps.TopNavComponent.SIGNAL_MENU_RETRACTED].dispatch(rps.TopNavComponent.SIGNAL_MENU_RETRACTED);

            $('.leftNav').css({
                width : '0px',
                height : pageData.dimensions.height + 'px',
            });

            $('.leftNav').animate({
                left : '-300px'
            }, animData);

            $('.topNav,.viewPort').animate({
                left : '0px'
            }, {
                duration : animData.duration
            });

            this.setLeftMenuToggled(false);
        }
        delete pageData;
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
        $('.navButtonMenuTop').css(newCSS);
    },

    toggleTopNav : function(pageData) {
        var scope = this;

        /** Hide topHeader if it has no children, and the app is in portrait mode
         * Show header if the topNav has children (buttons and icons), and the app is in landscape mode.
         */
        var animData = {
            duration : 0,
            easing : 'easeInOutSine'
        };

        if ($('.topNav').children().length < 1 && pageData.contentConfig.orientation == rps.AppConstants.PORTRAIT_MODE) {
            if (this.topNavToggled) {
                animData.complete = function() {
                    animData.complete = {};
                    scope.signals.topNavHiddenSignal.dispatch(rps.TopNavComponent.SIGNAL_TOPNAV_HIDDEN);
                };

                $('.topNav').animate({
                    top : -pageData.dimensions.topNavHeight + 'px'
                }, animData);
                this.topNavToggled = false;
            }
        } else {
            if (!this.topNavToggled) {

                animData.complete = function() {
                    scope.signals.topNavHiddenSignal.dispatch(rps.TopNavComponent.SIGNAL_TOPNAV_SHOWN);
                };

                $('.topNav').animate({
                    top : '0px'
                }, animData);
                this.topNavToggled = true;
            }
        }

    },

    /**
     * All button-related updates (width and position) should happen here.
     * CSS classes should exist to do most of the work; here we're making
     * adjustments based on application state.
     */
    updateButtons : function(pageData) {
        var buttonWidth, menuButtonDisplay;
        var buttonIDs = [];
        var menuTopPos = 0, bl = 0;

        if (pageData.contentConfig.orientation == rps.AppConstants.LANDSCAPE_MODE) {
            if ($('.navButtonMenuTop').css('display') == 'block') {
                bl = pageData.dimensions.menuButtonWidth;
            }
        }

        if ($('.topNavButtonHome').length > 0) {
            $('.topNavButtonHome').css({
                'width' : pageData.dimensions.homeButtonWidth + 'px',
                'marginLeft' : pageData.dimensions.width - pageData.dimensions.homeButtonWidth + 'px',
                'marginTop' : -pageData.dimensions.topNavHeight + 'px',
            });
        }

        if ($('.navButtonMenuTop').length > 0) {
            $('.navButtonMenuTop').css({
                'width' : pageData.dimensions.menuButtonWidth + 'px',
                'marginLeft' : '0px',
                'marginTop' : -menuTopPos + 'px'
            });
        }

        if ($('.topNavButtonBack').length > 0) {
            $('.topNavButtonBack').css({
                'width' : pageData.dimensions.backButtonWidth + 'px',
                'marginLeft' : bl + 'px',
            });
        }
        delete pageData;
    },

    redraw : function(pageData) {
        var left, target = this;
        var isLandscape = pageData.contentConfig.orientation == rps.AppConstants.LANDSCAPE_MODE;

        if (pageData.contentConfig.menuActivated) {
            this.setLeftMenuToggled(true);
            if (isLandscape) {
                // Move.topNav left or right to accommodate menu in landscape mode
                $('.topNav').css({
                    left : '300px'
                });
            } else {
                $('.topNav').css({
                    left : '0px'
                });
            }
        } else {
            this.setLeftMenuToggled(false);
        }

        // Adjust width
        $('.topNav').css({
            width : pageData.dimensions.width + 'px'
        });

        // Show/hide leftNav based on device orientation
        if (pageData.contentConfig.orientation == rps.AppConstants.LANDSCAPE_MODE && pageData.contentConfig.topNavActivated) {
            this.addMenuButton(pageData);
            if (pageData.contentConfig.menuActivated) {
                var animData = {};
                animData.complete = function() {
                    //targ.signals[rps.TopNavComponent.SIGNAL_MENU_EXTENDED].dispatch(rps.TopNavComponent.SIGNAL_MENU_EXTENDED);
                };

                $('.leftNav').animate({
                    left : '0px',
                }, animData);

            }
        } else {
            $('.topNav').css({
                left : '0px'
            });
            this.removeMenuButton(pageData);
        }

        target.toggleMenuButtonStyle(pageData);

        // Update button size and position
        this.updateButtons(pageData);
        this.toggleTopNav(pageData);
    }
},

// CLASS MEMBERS
{
    NAME : 'TopNavComponent',
    SIGNAL_BACK : 'backSignal',
    SIGNAL_HOME : 'homeSignal',
    SIGNAL_TOGGLE_DEBUG : 'toggleDebugSignal',
    SIGNAL_TOGGLE_MENU : 'toggleMenuSignal',
    SIGNAL_MENU_EXTENDED : 'menuExtendedSignal',
    SIGNAL_MENU_RETRACTED : 'menuRetractedSignal',
    SIGNAL_TOPNAV_HIDDEN : 'topNavHiddenSignal',
    SIGNAL_TOPNAV_SHOWN : 'topNavShownSignal',
});
