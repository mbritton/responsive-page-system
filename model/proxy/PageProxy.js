/**
 * @author Mike Britton
 *
 * @class PageProxy
 *
 */

puremvc.define({
    name : 'rps.model.proxy.PageProxy',
    parent : puremvc.Proxy
}, {
    /** @override */
    onRegister : function() {
        var targ = this;
        $(window).resize(function() {
            // Recalculate dimensions
            targ.data.dimensions.width = document.documentElement.clientWidth;
            targ.data.dimensions.height = document.documentElement.clientHeight;
            targ.data.contentConfig.orientation = targ.getAspectRatioMode();
            targ.sendNotification(rps.AppConstants.NOTE_APP_RESIZE, targ.data);
        });

        window.addEventListener('orientationchange', function() {
            // alert(document.documentElement.clientHeight);            targ.sendNotification(rps.AppConstants.NOTE_APP_RESIZE, targ.data);
        });
    },
    /**
     * Mode can be portrait or landscape. 
     */
    getAspectRatioMode : function() {
        var mode;
        if (Modernizr.mq('(orientation: portrait)')) {
            mode = rps.AppConstants.PORTRAIT_MODE;
        } else {
            mode = rps.AppConstants.LANDSCAPE_MODE;
        }
        return mode;
    },
    getCurrentIndex : function() {
        return jQuery.inArray(this.getCurrentPage(), this.data.items);
    },
    getCurrentPage : function() {
        return this.data.currentPage;
    },
    setCurrentPage : function(pageID) {
        var target = this;
        $.each(this.data.items, function(index, item) {
            if (item.id == pageID) {
                target.data.currentPage = item;
                if (index < 1)
                    target.data.contentConfig.isHome = true;
                else
                    target.data.contentConfig.isHome = false;
            }
        });
    },
    /**
     * Get all pages in the site 
     */
    getPages : function() {
        this.data = {
            currentPage : {},
            history : [],
            dimensions : {
                width : document.documentElement.clientWidth,
                height : document.documentElement.clientHeight,
                navHeight : 55,
                topNavHeight : 55,
                topNavY : 10,
                backButtonWidth : 45,
                menuButtonWidth : 150,
                homeButtonWidth : 90,
            },
            contentConfig : {
                mainGesture : Modernizr.touch ? 'touchstart' : 'click',
                isHome : false,
                menuActivated : false,
                topNavActivated : (this.getAspectRatioMode() == rps.AppConstants.PORTRAIT_MODE) ? false : true,
                alwaysShowHome : false,
                orientation : this.getAspectRatioMode(),
                nextText : 'Next',
                previousText : 'Previous',
                pageMenuText : 'Menu',
                menuText : '',
                homeText : 'Home',
                backText : '',
                navBGColor : '#ffffff',
                navTextColor : '#ffffff',
                topHeaderColor : '#ffffff',
                headerTextColor : '#ffffff',
                menuButtonColor : '#ffff00',
                homeButtonColor : '#cecece',
                backButtonColor : '#6f6f6f',
            },
            text : 'pages',
            items : [{
                id : this.getUuid(),
                title : 'Page 1',
                backgroundcolor : '#e4e1e1',
                text : 'Lorem ipsum dolor sit amet, <a href="http://www.mikebritton.com" target="_blank">consectetur</a> adipiscing elit. Duis ac commodo nibh. Maecenas orci eros, vulputate nec facilisis ac, imperdiet sed velit. Quisque mattis elit sit amet tellus vehicula condimentum. Nam sodales sapien eu tortor tincidunt at porta velit fringilla. Curabitur et tellus vitae mi venenatis imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lobortis lorem vitae nunc porta pharetra. Praesent sed velit eu velit porta faucibus. Morbi eget eros quis nulla congue accumsan. Nam bibendum fringilla lectus sit amet posuere. Donec tempus placerat ultrices. In porta semper feugiat.  Praesent dapibus lobortis aliquet. Nunc non enim in ante condimentum fringilla. Nunc vehicula nunc nec sapien scelerisque egestas. Nulla elementum, arcu vel auctor cursus, nunc arcu vehicula nulla, ac sollicitudin elit libero ac nisl. Integer blandit commodo quam dignissim scelerisque. Morbi pellentesque ultricies metus, eget vulputate purus cursus vitae. Mauris odio augue, laoreet lobortis suscipit nec, gravida in tellus. Quisque elementum condimentum mi, sed semper sapien pharetra vitae. Pellentesque vestibulum ultricies ultricies. Duis tristique sem id eros semper elementum. Duis eu risus ac ligula iaculis egestas sed nec lorem. Sed pharetra facilisis dignissim.  <a href="http://www.mikebritton.com" target="_blank">consectetur</a>Lorem ipsum dolor sit amet, <a href="http://www.mikebritton.com" target="_blank">consectetur</a> adipiscing elit. Duis ac commodo nibh. Maecenas orci eros, vulputate nec facilisis ac, imperdiet sed velit. Quisque mattis elit sit amet tellus vehicula condimentum. Nam sodales sapien eu tortor tincidunt at porta velit fringilla. Curabitur et tellus vitae mi venenatis imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lobortis lorem vitae nunc porta pharetra. Praesent sed velit eu velit porta faucibus. Morbi eget eros quis nulla congue accumsan. Nam bibendum fringilla lectus sit amet posuere. Donec tempus placerat ultrices. In porta semper feugiat.  Praesent dapibus lobortis aliquet. Nunc non enim in ante condimentum fringilla. Nunc vehicula nunc nec sapien scelerisque egestas. Nulla elementum, arcu vel auctor cursus, nunc arcu vehicula nulla, ac sollicitudin elit libero ac nisl. Integer blandit commodo quam dignissim scelerisque. Morbi pellentesque ultricies metus, eget vulputate purus cursus vitae. Mauris odio augue, laoreet lobortis suscipit nec, gravida in tellus. Quisque elementum condimentum mi, sed semper sapien pharetra vitae. Pellentesque vestibulum ultricies ultricies. Duis tristique sem id eros semper elementum. Duis eu risus ac ligula iaculis egestas sed nec lorem. Sed pharetra facilisis dignissim.  <a href="http://www.mikebritton.com" target="_blank">consectetur</a><p>Lorem ipsum dolor sit amet, <a href="http://www.mikebritton.com" target="_blank">consectetur</a> adipiscing elit. Duis ac commodo nibh. Maecenas orci eros, vulputate nec facilisis ac, imperdiet sed velit. Quisque mattis elit sit amet tellus vehicula condimentum. Nam sodales sapien eu tortor tincidunt at porta velit fringilla. Curabitur et tellus vitae mi venenatis imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lobortis lorem vitae nunc porta pharetra. Praesent sed velit eu velit porta faucibus. Morbi eget eros quis nulla congue accumsan. Nam bibendum fringilla lectus sit amet posuere. Donec tempus placerat ultrices. In porta semper feugiat.  Praesent dapibus lobortis aliquet. Nunc non enim in ante condimentum fringilla. Nunc vehicula nunc nec sapien scelerisque egestas. Nulla elementum, arcu vel auctor cursus, nunc arcu vehicula nulla, ac sollicitudin elit libero ac nisl. Integer blandit commodo quam dignissim scelerisque. Morbi pellentesque ultricies metus, eget vulputate purus cursus vitae. Mauris odio augue, laoreet lobortis suscipit nec, gravida in tellus. Quisque elementum condimentum mi, sed semper sapien pharetra vitae. Pellentesque vestibulum ultricies ultricies. Duis tristique sem id eros semper elementum. Duis eu risus ac ligula iaculis egestas sed nec lorem. Sed pharetra facilisis dignissim.  <a href="http://www.mikebritton.com" target="_blank">consectetur</a>Lorem ipsum dolor sit amet, <a href="http://www.mikebritton.com" target="_blank">consectetur</a> adipiscing elit. Duis ac commodo nibh. Maecenas orci eros, vulputate nec facilisis ac, imperdiet sed velit. Quisque mattis elit sit amet tellus vehicula condimentum. Nam sodales sapien eu tortor tincidunt at porta velit fringilla. Curabitur et tellus vitae mi venenatis imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lobortis lorem vitae nunc porta pharetra. Praesent sed velit eu velit porta faucibus. Morbi eget eros quis nulla congue accumsan. Nam bibendum fringilla lectus sit amet posuere. Donec tempus placerat ultrices. In porta semper feugiat.  Praesent dapibus lobortis aliquet. Nunc non enim in ante condimentum fringilla. Nunc vehicula nunc nec sapien scelerisque egestas. Nulla elementum, arcu vel auctor cursus, nunc arcu vehicula nulla, ac sollicitudin elit libero ac nisl. Integer blandit commodo quam dignissim scelerisque. Morbi pellentesque ultricies metus, eget vulputate purus cursus vitae. Mauris odio augue, laoreet lobortis suscipit nec, gravida in tellus. Quisque elementum condimentum mi, sed semper sapien pharetra vitae. Pellentesque vestibulum ultricies ultricies. Duis tristique sem id eros semper elementum. Duis eu risus ac ligula iaculis egestas sed nec lorem. Sed pharetra facilisis dignissim.  <a href="http://www.mikebritton.com" target="_blank">consectetur</a></p>',
                textcolor : '#000000',
                home : true,
                templateName : 'pageXTmpl',
            }, {
                id : this.getUuid(),
                title : 'Page 2',
                backgroundcolor : '#cdcbcb',
                text : 'Lorem ipsum dolor sit amet, <a href="http://www.mikebritton.com" target="_blank">consectetur</a> adipiscing elit. Duis ac commodo nibh. Maecenas orci eros, vulputate nec facilisis ac, imperdiet sed velit. Quisque mattis elit sit amet tellus vehicula condimentum. Nam sodales sapien eu tortor tincidunt at porta velit fringilla. Curabitur et tellus vitae mi venenatis imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lobortis lorem vitae nunc porta pharetra. Praesent sed velit eu velit porta faucibus. Morbi eget eros quis nulla congue accumsan. Nam bibendum fringilla lectus sit amet posuere. Donec tempus placerat ultrices. In porta semper feugiat.  Praesent dapibus lobortis aliquet. Nunc non enim in ante condimentum fringilla. Nunc vehicula nunc nec sapien scelerisque egestas. Nulla elementum, arcu vel auctor cursus, nunc arcu vehicula nulla, ac sollicitudin elit libero ac nisl. Integer blandit commodo quam dignissim scelerisque. Morbi pellentesque ultricies metus, eget vulputate purus cursus vitae. Mauris odio augue, laoreet lobortis suscipit nec, gravida in tellus. Quisque elementum condimentum mi, sed semper sapien pharetra vitae. Pellentesque vestibulum ultricies ultricies. Duis tristique sem id eros semper elementum. Duis eu risus ac ligula iaculis egestas sed nec lorem. Sed pharetra facilisis dignissim.  <a href="http://www.mikebritton.com" target="_blank">consectetur</a>Lorem ipsum dolor sit amet, <a href="http://www.mikebritton.com" target="_blank">consectetur</a> adipiscing elit. Duis ac commodo nibh. Maecenas orci eros, vulputate nec facilisis ac, imperdiet sed velit. Quisque mattis elit sit amet tellus vehicula condimentum. Nam sodales sapien eu tortor tincidunt at porta velit fringilla. Curabitur et tellus vitae mi venenatis imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lobortis lorem vitae nunc porta pharetra. Praesent sed velit eu velit porta faucibus. Morbi eget eros quis nulla congue accumsan. Nam bibendum fringilla lectus sit amet posuere. Donec tempus placerat ultrices. In porta semper feugiat.  Praesent dapibus lobortis aliquet. Nunc non enim in ante condimentum fringilla. Nunc vehicula nunc nec sapien scelerisque egestas. Nulla elementum, arcu vel auctor cursus, nunc arcu vehicula nulla, ac sollicitudin elit libero ac nisl. Integer blandit commodo quam dignissim scelerisque. Morbi pellentesque ultricies metus, eget vulputate purus cursus vitae. Mauris odio augue, laoreet lobortis suscipit nec, gravida in tellus. Quisque elementum condimentum mi, sed semper sapien pharetra vitae. Pellentesque vestibulum ultricies ultricies. Duis tristique sem id eros semper elementum. Duis eu risus ac ligula iaculis egestas sed nec lorem. Sed pharetra facilisis dignissim.  <a href="http://www.mikebritton.com" target="_blank">consectetur</a><p>Lorem ipsum dolor sit amet, <a href="http://www.mikebritton.com" target="_blank">consectetur</a> adipiscing elit. Duis ac commodo nibh. Maecenas orci eros, vulputate nec facilisis ac, imperdiet sed velit. Quisque mattis elit sit amet tellus vehicula condimentum. Nam sodales sapien eu tortor tincidunt at porta velit fringilla. Curabitur et tellus vitae mi venenatis imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lobortis lorem vitae nunc porta pharetra. Praesent sed velit eu velit porta faucibus. Morbi eget eros quis nulla congue accumsan. Nam bibendum fringilla lectus sit amet posuere. Donec tempus placerat ultrices. In porta semper feugiat.  Praesent dapibus lobortis aliquet. Nunc non enim in ante condimentum fringilla. Nunc vehicula nunc nec sapien scelerisque egestas. Nulla elementum, arcu vel auctor cursus, nunc arcu vehicula nulla, ac sollicitudin elit libero ac nisl. Integer blandit commodo quam dignissim scelerisque. Morbi pellentesque ultricies metus, eget vulputate purus cursus vitae. Mauris odio augue, laoreet lobortis suscipit nec, gravida in tellus. Quisque elementum condimentum mi, sed semper sapien pharetra vitae. Pellentesque vestibulum ultricies ultricies. Duis tristique sem id eros semper elementum. Duis eu risus ac ligula iaculis egestas sed nec lorem. Sed pharetra facilisis dignissim.  <a href="http://www.mikebritton.com" target="_blank">consectetur</a>Lorem ipsum dolor sit amet, <a href="http://www.mikebritton.com" target="_blank">consectetur</a> adipiscing elit. Duis ac commodo nibh. Maecenas orci eros, vulputate nec facilisis ac, imperdiet sed velit. Quisque mattis elit sit amet tellus vehicula condimentum. Nam sodales sapien eu tortor tincidunt at porta velit fringilla. Curabitur et tellus vitae mi venenatis imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lobortis lorem vitae nunc porta pharetra. Praesent sed velit eu velit porta faucibus. Morbi eget eros quis nulla congue accumsan. Nam bibendum fringilla lectus sit amet posuere. Donec tempus placerat ultrices. In porta semper feugiat.  Praesent dapibus lobortis aliquet. Nunc non enim in ante condimentum fringilla. Nunc vehicula nunc nec sapien scelerisque egestas. Nulla elementum, arcu vel auctor cursus, nunc arcu vehicula nulla, ac sollicitudin elit libero ac nisl. Integer blandit commodo quam dignissim scelerisque. Morbi pellentesque ultricies metus, eget vulputate purus cursus vitae. Mauris odio augue, laoreet lobortis suscipit nec, gravida in tellus. Quisque elementum condimentum mi, sed semper sapien pharetra vitae. Pellentesque vestibulum ultricies ultricies. Duis tristique sem id eros semper elementum. Duis eu risus ac ligula iaculis egestas sed nec lorem. Sed pharetra facilisis dignissim.  <a href="http://www.mikebritton.com" target="_blank">consectetur</a></p>',
                textcolor : '#000000',
                home : false,
                templateName : 'pageXTmpl',
            }, {
                id : this.getUuid(),
                title : 'Page 3',
                backgroundcolor : '#b5b6b6',
                text : 'Lorem ipsum dolor sit amet, <a href="http://www.mikebritton.com" target="_blank">consectetur</a> adipiscing elit. Duis ac commodo nibh. Maecenas orci eros, vulputate nec facilisis ac, imperdiet sed velit. Quisque mattis elit sit amet tellus vehicula condimentum. Nam sodales sapien eu tortor tincidunt at porta velit fringilla. Curabitur et tellus vitae mi venenatis imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lobortis lorem vitae nunc porta pharetra. Praesent sed velit eu velit porta faucibus. Morbi eget eros quis nulla congue accumsan. Nam bibendum fringilla lectus sit amet posuere. Donec tempus placerat ultrices. In porta semper feugiat.  Praesent dapibus lobortis aliquet. Nunc non enim in ante condimentum fringilla. Nunc vehicula nunc nec sapien scelerisque egestas. Nulla elementum, arcu vel auctor cursus, nunc arcu vehicula nulla, ac sollicitudin elit libero ac nisl. Integer blandit commodo quam dignissim scelerisque. Morbi pellentesque ultricies metus, eget vulputate purus cursus vitae. Mauris odio augue, laoreet lobortis suscipit nec, gravida in tellus. Quisque elementum condimentum mi, sed semper sapien pharetra vitae. Pellentesque vestibulum ultricies ultricies. Duis tristique sem id eros semper elementum. Duis eu risus ac ligula iaculis egestas sed nec lorem. Sed pharetra facilisis dignissim.  <a href="http://www.mikebritton.com" target="_blank">consectetur</a>Lorem ipsum dolor sit amet, <a href="http://www.mikebritton.com" target="_blank">consectetur</a> adipiscing elit. Duis ac commodo nibh. Maecenas orci eros, vulputate nec facilisis ac, imperdiet sed velit. Quisque mattis elit sit amet tellus vehicula condimentum. Nam sodales sapien eu tortor tincidunt at porta velit fringilla. Curabitur et tellus vitae mi venenatis imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lobortis lorem vitae nunc porta pharetra. Praesent sed velit eu velit porta faucibus. Morbi eget eros quis nulla congue accumsan. Nam bibendum fringilla lectus sit amet posuere. Donec tempus placerat ultrices. In porta semper feugiat.  Praesent dapibus lobortis aliquet. Nunc non enim in ante condimentum fringilla. Nunc vehicula nunc nec sapien scelerisque egestas. Nulla elementum, arcu vel auctor cursus, nunc arcu vehicula nulla, ac sollicitudin elit libero ac nisl. Integer blandit commodo quam dignissim scelerisque. Morbi pellentesque ultricies metus, eget vulputate purus cursus vitae. Mauris odio augue, laoreet lobortis suscipit nec, gravida in tellus. Quisque elementum condimentum mi, sed semper sapien pharetra vitae. Pellentesque vestibulum ultricies ultricies. Duis tristique sem id eros semper elementum. Duis eu risus ac ligula iaculis egestas sed nec lorem. Sed pharetra facilisis dignissim.  <a href="http://www.mikebritton.com" target="_blank">consectetur</a><p>Lorem ipsum dolor sit amet, <a href="http://www.mikebritton.com" target="_blank">consectetur</a> adipiscing elit. Duis ac commodo nibh. Maecenas orci eros, vulputate nec facilisis ac, imperdiet sed velit. Quisque mattis elit sit amet tellus vehicula condimentum. Nam sodales sapien eu tortor tincidunt at porta velit fringilla. Curabitur et tellus vitae mi venenatis imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lobortis lorem vitae nunc porta pharetra. Praesent sed velit eu velit porta faucibus. Morbi eget eros quis nulla congue accumsan. Nam bibendum fringilla lectus sit amet posuere. Donec tempus placerat ultrices. In porta semper feugiat.  Praesent dapibus lobortis aliquet. Nunc non enim in ante condimentum fringilla. Nunc vehicula nunc nec sapien scelerisque egestas. Nulla elementum, arcu vel auctor cursus, nunc arcu vehicula nulla, ac sollicitudin elit libero ac nisl. Integer blandit commodo quam dignissim scelerisque. Morbi pellentesque ultricies metus, eget vulputate purus cursus vitae. Mauris odio augue, laoreet lobortis suscipit nec, gravida in tellus. Quisque elementum condimentum mi, sed semper sapien pharetra vitae. Pellentesque vestibulum ultricies ultricies. Duis tristique sem id eros semper elementum. Duis eu risus ac ligula iaculis egestas sed nec lorem. Sed pharetra facilisis dignissim.  <a href="http://www.mikebritton.com" target="_blank">consectetur</a>Lorem ipsum dolor sit amet, <a href="http://www.mikebritton.com" target="_blank">consectetur</a> adipiscing elit. Duis ac commodo nibh. Maecenas orci eros, vulputate nec facilisis ac, imperdiet sed velit. Quisque mattis elit sit amet tellus vehicula condimentum. Nam sodales sapien eu tortor tincidunt at porta velit fringilla. Curabitur et tellus vitae mi venenatis imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lobortis lorem vitae nunc porta pharetra. Praesent sed velit eu velit porta faucibus. Morbi eget eros quis nulla congue accumsan. Nam bibendum fringilla lectus sit amet posuere. Donec tempus placerat ultrices. In porta semper feugiat.  Praesent dapibus lobortis aliquet. Nunc non enim in ante condimentum fringilla. Nunc vehicula nunc nec sapien scelerisque egestas. Nulla elementum, arcu vel auctor cursus, nunc arcu vehicula nulla, ac sollicitudin elit libero ac nisl. Integer blandit commodo quam dignissim scelerisque. Morbi pellentesque ultricies metus, eget vulputate purus cursus vitae. Mauris odio augue, laoreet lobortis suscipit nec, gravida in tellus. Quisque elementum condimentum mi, sed semper sapien pharetra vitae. Pellentesque vestibulum ultricies ultricies. Duis tristique sem id eros semper elementum. Duis eu risus ac ligula iaculis egestas sed nec lorem. Sed pharetra facilisis dignissim.  <a href="http://www.mikebritton.com" target="_blank">consectetur</a></p>',
                textcolor : '#000000',
                home : false,
                templateName : 'pageXTmpl',
            }]
        };

        this.setCurrentPage(this.data.items[0].id);

        this.sendNotification(rps.AppConstants.NOTE_PAGES_RETRIEVED, this.getData());

        this.changePage();
    },
    /**
     * Create a unique ID 
     */
    getUuid : function() {
        var i, random, uuid = '';
        for ( i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random) ).toString(16);
        }
        return uuid;
    },
    /**
     * Change the page on the model
     * @changeObj: Object - type: e.g. 'direction', 'home', 'back'.
     */
    changePage : function(changeObj) {
        var target = this;
        // Scope

        if (!changeObj) {
            changeObj = {
                type : rps.AppConstants.PAGE_CHANGE_ID,
                val : this.data.items[0].id
            };
        }

        switch(changeObj.type) {
            case rps.AppConstants.PAGE_CHANGE_DIRECTION:
                var nextIndex;
                $.each(this.data.items, function(index, item) {
                    if (item.id == target.getCurrentPage().id) {
                        if (changeObj.val == rps.view.component.BottomNavComponent.SIGNAL_PREVIOUS) {
                            if (index - 1 < 0) {
                                nextIndex = target.data.items.length - 1;
                            } else {
                                nextIndex = index - 1;
                            }
                        } else {
                            if (index + 1 > target.data.items.length - 1) {
                                nextIndex = 0;
                            } else {
                                nextIndex = index + 1;
                            }
                        }
                    }
                });
                this.setCurrentPage(this.data.items[nextIndex].id);
                this.data.history.push(this.getCurrentPage());
                break;
            case rps.AppConstants.PAGE_CHANGE_ID:
                target.setCurrentPage(changeObj.val);
                this.data.history.push(this.getCurrentPage());
                break;
            case rps.AppConstants.PAGE_CHANGE_HOME:
                this.setCurrentPage(changeObj.val);
                this.data.history = [];
                this.data.history.push(this.getCurrentPage());
                break;
            case rps.AppConstants.PAGE_CHANGE_BACK:
                this.data.history.splice(this.data.history.length - 1, 1);
                this.setCurrentPage(this.data.history[this.data.history.length - 1].id);
                break;
            case rps.AppConstants.PAGE_CHANGE_TITLE:
                $.each(this.data.items, function(index, item) {
                    if (item.title == changeObj.val) {
                        target.setCurrentPage(item.id);
                    }
                });
                this.data.history.push(this.getCurrentPage());
                break;
            default:
                console.log('Unsupported page direction passed to PageProxy::changePage');
                break;
        }
        this.sendNotification(rps.AppConstants.NOTE_PAGE_CHANGED, this.getData());
    }
},
// CLASS MEMBERS
{
    /**
     * @static
     * @type {string}
     */
    NAME : 'PageProxy'
});
