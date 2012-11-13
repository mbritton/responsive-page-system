/**
 * @author Mike Britton
 *
 * @class PageCommand
 *
 */

puremvc.define(
{
    name : 'rps.command.PageCommand',
    parent : puremvc.SimpleCommand
},
{
    /** @override */
    execute : function(note) {
        var proxy = this.facade.retrieveProxy(rps.model.proxy.PageProxy.NAME);
        switch(note.getName()) {
            case rps.AppConstants.NOTE_GET_PAGES:
                proxy.getPages();
                break
            case rps.AppConstants.NOTE_PAGE_CHANGE:
                proxy.changePage(note.getBody());
                break;
            case rps.AppConstants.NOTE_TOPNAV_HIDDEN:
                proxy.getData().contentConfig.topNavActivated = false;
                this.sendNotification(rps.AppConstants.NOTE_APP_RESIZE, proxy.getData());
                break;
            case rps.AppConstants.NOTE_TOPNAV_SHOWN:
                proxy.getData().contentConfig.topNavActivated = true;
                this.sendNotification(rps.AppConstants.NOTE_APP_RESIZE, proxy.getData());
                break;
            default:
                console.log('PageCommand received unsupported command.');
                break;
        }
    }
});
