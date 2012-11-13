/**
 * @author Mike Britton
 *
 * @class PageMenuMediator
 *
 */

puremvc.define({
    name : 'rps.view.mediator.PageMenuMediator',
    parent : puremvc.Mediator
}, {
    /** @override */
    listNotificationInterests : function() {
        return [rps.AppConstants.NOTE_SHOW_PAGEMENU, rps.AppConstants.NOTE_HIDE_PAGEMENU, rps.AppConstants.NOTE_PAGES_RETRIEVED, rps.AppConstants.NOTE_APP_RESIZE, rps.AppConstants.NOTE_LEFT_MENU_RETRACTED, rps.AppConstants.NOTE_LEFT_MENU_EXTENDED];
    },
    /** @override */
    onRegister : function() {

        // Create the viewComponent
        this.setViewComponent(new rps.view.component.PageMenuComponent);

        // Establish signal listeners
        this.doSignals();

    },
    /** @override */
    handleNotification : function(note) {
        var proxy = this.facade.retrieveProxy(rps.model.proxy.PageProxy.NAME);
        var view = this.getViewComponent();
        
        switch (note.getName()) {
            case rps.AppConstants.NOTE_APP_RESIZE:
                view.redraw(note.getBody());
                this.doSignals();
                break;
            case rps.AppConstants.NOTE_PAGES_RETRIEVED:
                view.build(note.getBody());
                break;
            case rps.AppConstants.NOTE_LEFT_MENU_EXTENDED:
                
                view.redraw(proxy.getData());
                view.showPageMenu(proxy.getData());
                
                break;
            case rps.AppConstants.NOTE_LEFT_MENU_RETRACTED:
                view.redraw(proxy.getData());
                view.hidePageMenu(proxy.getData());
                break;
            case rps.AppConstants.NOTE_SHOW_PAGEMENU:
                view.showPageMenu(proxy.getData());
                break;
            case rps.AppConstants.NOTE_HIDE_PAGEMENU:
                view.hidePageMenu(proxy.getData());
                break;
            default:
                console.log('PageMenuMediator received unsupported Notification');
                break;
        }
    },
    doSignals : function() {
        var target = this;
        $.each(this.getViewComponent().signals, function(index, item) {
            if (!item.has(target.handleEvent)) {
                // Second arg is scope
                item.add(target.handleEvent, target);
            }
        });
    },
    handleEvent : function(signal, data) {
        switch(signal) {
            case rps.view.component.PageMenuComponent.SIGNAL_READY:
                //console.log('PageMenuMediator::Signal '+signal+' received');
                break;
            case rps.view.component.PageMenuComponent.SIGNAL_BUTTONCLICK:
                this.sendNotification(rps.AppConstants.NOTE_HIDE_PAGEMENU);
                this.sendNotification(rps.AppConstants.NOTE_PAGE_CHANGE, {
                    type : rps.AppConstants.PAGE_CHANGE_TITLE,
                    val : data.innerHTML
                });
                break;
            default:
                alert('PageMenuMediator received an unsupported signal from its viewComponent');
                break;
        };

    }
}, {
    /**
     * @static
     * @type {string}
     */
    NAME : 'PageMenuMediator'
});
