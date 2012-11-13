/**
 * @author Mike Britton
 *
 * @class NavMediator
 *
 */

puremvc.define({
    name : 'rps.view.mediator.BottomNavMediator',
    parent : puremvc.Mediator
}, {
    /** @override */
    listNotificationInterests : function() {
        return [rps.AppConstants.NOTE_PAGES_RETRIEVED, rps.AppConstants.NOTE_APP_RESIZE, rps.AppConstants.NOTE_HIDE_PAGEMENU, rps.AppConstants.NOTE_SHOW_PAGEMENU];
    },
    /** @override */
    onRegister : function() {
        this.setViewComponent(new rps.view.component.BottomNavComponent);

        this.doSignals();
    },
    /** @override */
    handleNotification : function(note) {
        var view = this.getViewComponent();
        var proxy = this.facade.retrieveProxy(rps.model.proxy.PageProxy.NAME);
        switch (note.getName()) {
            case rps.AppConstants.NOTE_PAGES_RETRIEVED:
                view.build(note.getBody());
                break;
            case rps.AppConstants.NOTE_APP_RESIZE:
                view.redraw(note.getBody());
                this.doSignals();
                break;
            case rps.AppConstants.NOTE_SHOW_PAGEMENU:
                view.toggleMenuButtonStyle(proxy.getData());
                break;
            case rps.AppConstants.NOTE_HIDE_PAGEMENU:
                view.toggleMenuButtonStyle(proxy.getData());
                break;

        }
    },
    doSignals : function() {
        // For access and scope in event handler
        var target = this;
        $.each(this.getViewComponent().signals, function(index, item) {
            if (!item.has(target.handleEvent)) {
                item.add(target.handleEvent, target);
            }
        });
    },
    handleEvent : function(signal) {
        var proxy = this.facade.retrieveProxy(rps.model.proxy.PageProxy.NAME);
        switch(signal) {
            case rps.view.component.BottomNavComponent.SIGNAL_NEXT:
                this.sendNotification(rps.AppConstants.NOTE_PAGE_CHANGE, {
                    type : rps.AppConstants.PAGE_CHANGE_DIRECTION,
                    val : rps.view.component.BottomNavComponent.SIGNAL_NEXT
                });
                break;
            case rps.view.component.BottomNavComponent.SIGNAL_PREVIOUS:
                this.sendNotification(rps.AppConstants.NOTE_PAGE_CHANGE, {
                    type : rps.AppConstants.PAGE_CHANGE_DIRECTION,
                    val : rps.view.component.BottomNavComponent.SIGNAL_PREVIOUS
                });
                break;
            case rps.view.component.BottomNavComponent.SIGNAL_SHOW_PAGEMENU:
                this.sendNotification(rps.AppConstants.NOTE_SHOW_PAGEMENU);
                break;
            case rps.view.component.BottomNavComponent.SIGNAL_HIDE_PAGEMENU:
                this.sendNotification(rps.AppConstants.NOTE_HIDE_PAGEMENU);
                break;
            case rps.view.component.BottomNavComponent.SIGNAL_BACK:
                this.sendNotification(rps.AppConstants.NOTE_PAGE_CHANGE, {
                    type : rps.AppConstants.PAGE_CHANGE_BACK
                });
                break;
            default:
                alert('NavMediator received an unsupported signal from its viewComponent.');
                break;
        }

    },
},
// STATIC MEMBERS
{
    /**
     * @static
     * @type {string}
     */
    NAME : 'BottomNavMediator'
});
