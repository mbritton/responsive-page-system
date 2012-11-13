/**
 * @author Mike Britton
 *
 * @class MenuCommand
 *
 */

puremvc.define(
{
    name : 'rps.command.MenuCommand',
    parent : puremvc.SimpleCommand
},
{
    /** @override */
    execute : function(note) {
        var proxy = this.facade.retrieveProxy(rps.model.proxy.PageProxy.NAME);
        switch(note.getName()) {
            case rps.AppConstants.NOTE_SHOW_PAGEMENU:
                    proxy.data.contentConfig.menuActivated = true;
                break;
            case rps.AppConstants.NOTE_HIDE_PAGEMENU:
                proxy.data.contentConfig.menuActivated = false;
                break;
            case rps.AppConstants.NOTE_TOGGLE_PAGEMENU:
                proxy.data.contentConfig.menuActivated = note.getBody();
                break;
            default:
                console.log('MenuCommand received unsupported command.');
                break;
        }
    }
});
