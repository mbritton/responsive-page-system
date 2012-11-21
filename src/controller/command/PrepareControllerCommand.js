/**
 * PureMVC JS Demo: Responsive Page System
 * @author Mike Britton
 */
puremvc.define({
    name : 'rps.PrepareControllerCommand',
    parent : puremvc.SimpleCommand
},

// INSTANCE MEMBERS
{
    /** @override */
    execute : function(note) {

        // Notes handled by the Page Command
        this.facade.registerCommand(rps.AppConstants.NOTE_GET_PAGES, rps.PageCommand);
        this.facade.registerCommand(rps.AppConstants.NOTE_PAGE_CHANGE, rps.PageCommand);
        this.facade.registerCommand(rps.AppConstants.NOTE_BACK, rps.PageCommand);
        this.facade.registerCommand(rps.AppConstants.NOTE_TOPNAV_HIDDEN, rps.PageCommand);
        this.facade.registerCommand(rps.AppConstants.NOTE_TOPNAV_SHOWN, rps.PageCommand);

        // Notes handled by the Menu Command
        this.facade.registerCommand(rps.AppConstants.NOTE_SHOW_PAGEMENU, rps.MenuCommand);
        this.facade.registerCommand(rps.AppConstants.NOTE_HIDE_PAGEMENU, rps.MenuCommand);
        this.facade.registerCommand(rps.AppConstants.NOTE_TOGGLE_PAGEMENU, rps.MenuCommand);
    }
});
