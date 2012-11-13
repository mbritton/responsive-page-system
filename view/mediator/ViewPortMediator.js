/**
 * @author Mike Britton
 *
 * @class ViewPortMediator
 *
 */

puremvc.define({
    name : 'rps.view.mediator.ViewPortMediator',
    parent : puremvc.Mediator
}, {
    /** @override */
    listNotificationInterests : function() {
        return [rps.AppConstants.NOTE_PAGES_RETRIEVED, rps.AppConstants.NOTE_APP_RESIZE, rps.AppConstants.NOTE_PAGE_CHANGED];
    },
    /** @override */
    onRegister : function() {

        // Create the viewComponent
        this.setViewComponent(new rps.view.component.ViewPortComponent);

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
                view.maintainSelectedPage(note.getBody(), proxy.getCurrentIndex());

                this.doSignals();
                break;
            case rps.AppConstants.NOTE_PAGES_RETRIEVED:
                view.build(note.getBody());
                break;
            case rps.AppConstants.NOTE_PAGE_CHANGED:
                view.gotoPage(note.getBody(), this.facade.retrieveProxy(rps.model.proxy.PageProxy.NAME).getData());
                break;
            default:
                console.log('ViewPortMediator received unsupported Notification');
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
            case rps.view.component.ViewPortComponent.SIGNAL_LOG:
                console.dir(data);
                this.facade.sendNotification(rps.AppConstants.NOTE_LOG_MESSAGE, data);
                break;
            case rps.view.component.ViewPortComponent.SIGNAL_READY:
                //console.log('ViewPortMediator::Signal '+signal+' received');
                break;
            default:
                console.log('ViewPortMediator received unsupported signal.');
                break;
        };

    }
},
// STATIC MEMBERS
{
    /**
     * @static
     * @type {string}
     */
    NAME : 'ViewPortMediator'
});
