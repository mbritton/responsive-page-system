/**
 * PureMVC JS Demo: Responsive Page System
 * @author Mike Britton
 */
puremvc.define({
    name : 'rps.Application',
    constructor : function() {
        // Register the startup command and trigger it.
        this.facade.registerCommand(rps.AppConstants.STARTUP, rps.StartupCommand);
        this.facade.sendNotification(rps.AppConstants.STARTUP);
    }
},

// INSTANCE MEMBERS
{
    // Define the startup notification name
    STARTUP : 'startup',

    // Get an instance of the PureMVC Facade. This creates the Model, View, and Controller instances.
    facade : puremvc.Facade.getInstance(rps.AppConstants.CORE_NAME)
});
