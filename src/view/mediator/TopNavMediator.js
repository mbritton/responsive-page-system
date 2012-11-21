/**
 * PureMVC JS Demo: Responsive Page System
 * @author Mike Britton
 */
puremvc.define({
    name : 'rps.TopNavMediator',
    parent : puremvc.Mediator
},

// INSTANCE MEMBERS
{
    /** @override */
    listNotificationInterests : function() {
        return [rps.AppConstants.NOTE_PAGES_RETRIEVED, rps.AppConstants.NOTE_PAGE_CHANGED, rps.AppConstants.NOTE_APP_RESIZE, rps.AppConstants.NOTE_LOG_MESSAGE, rps.AppConstants.NOTE_SHOW_PAGEMENU, rps.AppConstants.NOTE_HIDE_PAGEMENU];
    },
    /** @override */
    onRegister : function() {
        this.setViewComponent(new rps.TopNavComponent);
        this.doSignals();
    },

    /** @override */
    handleNotification : function(note) {
        var view = this.getViewComponent();
        var proxy = this.facade.retrieveProxy(rps.PageProxy.NAME);
        var pageData = proxy.getData();
        switch (note.getName()) {
            case rps.AppConstants.NOTE_APP_RESIZE:
                view.redraw(note.getBody());
                this.doSignals();
                break;
            case rps.AppConstants.NOTE_PAGES_RETRIEVED:
                view.build(note.getBody());
                break;
            case rps.AppConstants.NOTE_SHOW_PAGEMENU:
                view.toggleMenuButtonStyle(pageData);
                break;
            case rps.AppConstants.NOTE_HIDE_PAGEMENU:
                if (proxy.getAspectRatioMode() == rps.AppConstants.LANDSCAPE_MODE) {
                    view.toggleLeftMenu(pageData);
                }
                break;
            case rps.AppConstants.NOTE_PAGE_CHANGED:
                if (proxy.getData().contentConfig.isHome) {
                    view.removeBackButton(proxy.getData());
                    view.removeHomeButton(proxy.getData());
                } else {
                    view.addBackButton(proxy.getData());
                    view.addHomeButton(proxy.getData());
                }
                view.redraw(pageData);
                break;
            default:
                console.log('TopNavMediator just received an unsupported Notification.');
                break;
        }
    },
    doSignals : function() {
        var target = this;
        $.each(this.getViewComponent().signals, function(index, item) {
            // Determine if the callback is present
            if (!item.has(target.handleEvent)) {
                // Second arg is scope
                item.add(target.handleEvent, target);
            } else {
                console.log('No callback specified for signals.');
            }
        });
    },
    handleEvent : function(signal) {
        var proxy = this.facade.retrieveProxy(rps.PageProxy.NAME);
        var view = this.getViewComponent();
        switch(signal) {
            case rps.TopNavComponent.SIGNAL_HOME:
                this.sendNotification(rps.AppConstants.NOTE_PAGE_CHANGE, {
                    type : rps.AppConstants.PAGE_CHANGE_HOME,
                    val : proxy.getData().items[0].id
                });
                break;
            case rps.TopNavComponent.SIGNAL_BACK:
                this.sendNotification(rps.AppConstants.NOTE_PAGE_CHANGE, {
                    type : rps.AppConstants.PAGE_CHANGE_BACK
                });
                break;
            // Hide / show left menu
            case rps.TopNavComponent.SIGNAL_TOGGLE_MENU:

                view.toggleLeftMenu(proxy.data);
                this.sendNotification(rps.AppConstants.NOTE_TOGGLE_PAGEMENU, view.getLeftMenuToggled());
                view.redraw(proxy.data);

                break;
            // Notify app that left menu is extended
            case rps.TopNavComponent.SIGNAL_MENU_EXTENDED:
                this.sendNotification(rps.AppConstants.NOTE_LEFT_MENU_EXTENDED);
                break;
            // Notify app that left menu is retracted
            case rps.TopNavComponent.SIGNAL_MENU_RETRACTED:
                this.sendNotification(rps.AppConstants.NOTE_LEFT_MENU_RETRACTED);
                break;
            case rps.TopNavComponent.SIGNAL_TOPNAV_HIDDEN:
                this.sendNotification(rps.AppConstants.NOTE_TOPNAV_HIDDEN);
                break;
            case rps.TopNavComponent.SIGNAL_TOPNAV_SHOWN:
                this.sendNotification(rps.AppConstants.NOTE_TOPNAV_SHOWN);
                break;
            default:
                console.log('TopNavMediator received unsupported Signal from its viewComponent.');
                break;
        };

    }
},

// STATIC MEMBERS
{
    NAME : 'TopNavMediator'
});
