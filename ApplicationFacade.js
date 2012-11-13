/**
 * @author Mike Britton
 *
 * @class ApplicationFacade
 *
 * PureMVC JavaScript responsive shell
 * 
 * @class rps.ApplicationFacade
 * @extends puremvc.Facade
 */
puremvc.define(
{
    name : 'rps.ApplicationFacade',
    parent : puremvc.Facade
},
{
    /**
     * A convenience method to start the PureMVC apparatus
     *
     * @return {void}
     */
    startup : function() {
        
        jQuery.easing.def = 'easeInOutSine';
        
        if (!this.initialized) {
            this.initialized = true;
            // associate the SetupCommand with the STARTUP notification
            this.registerCommand(rps.AppConstants.NOTE_STARTUP, rps.command.StartupCommand);
            this.registerCommand(rps.AppConstants.NOTE_GET_PAGES, rps.command.PageCommand);
            this.registerCommand(rps.AppConstants.NOTE_PAGE_CHANGE, rps.command.PageCommand);
            this.registerCommand(rps.AppConstants.NOTE_BACK, rps.command.PageCommand);
            this.registerCommand(rps.AppConstants.NOTE_TOPNAV_HIDDEN, rps.command.PageCommand);
            this.registerCommand(rps.AppConstants.NOTE_TOPNAV_SHOWN, rps.command.PageCommand);
            this.registerCommand(rps.AppConstants.NOTE_SHOW_PAGEMENU, rps.command.MenuCommand);
            this.registerCommand(rps.AppConstants.NOTE_HIDE_PAGEMENU, rps.command.MenuCommand);
            this.registerCommand(rps.AppConstants.NOTE_TOGGLE_PAGEMENU, rps.command.MenuCommand);

            this.sendNotification(rps.AppConstants.NOTE_STARTUP);
            
        }
    }
}, {
    /**
     * Retrieve an instance of ApplicationFacade. If one has not yet been
     * instantiated, one will be created for you.
     *
     * @static
     * @param {string} multitonKey
     * @return rps.ApplicationFacade
     */
    getInstance : function(multitonKey) {
        // all Facade instances, including Facade subclass instances, are stored
        // on Facade.instanceMap. When implementing you own #getInstance factory
        // method, ensure that follow the general pattern implemented here or else
        // puremvc.Facade#hasCore and puremvc.Facade#removeCore will not work if
        // you ever need to use them.
        var instanceMap = puremvc.Facade.instanceMap;
        instance = instanceMap[multitonKey];
        // read from the instance map

        if (instance) // if there is an instance...
            return instance;
        // return it

        // otherwise create a new instance and cache it on Facade.instanceMap;
        return instanceMap[multitonKey] = new rps.ApplicationFacade(multitonKey);
    },

    /**
     * @static
     * @type {string}
     */
    NAME : 'rps'
});
