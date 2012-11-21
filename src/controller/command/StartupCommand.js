/**
 * PureMVC JS Demo: Responsive Page System
 * @author Mike Britton
 */
puremvc.define({
    name : 'rps.StartupCommand',
    parent : puremvc.MacroCommand
},

// INSTANCE MEMBERS
{
    /** @override */
    initializeMacroCommand : function() {
        // Register Commands with the Facade
        this.addSubCommand(rps.PrepareControllerCommand);
        this.addSubCommand(rps.PrepareModelCommand);
        this.addSubCommand(rps.PrepareViewCommand);

    }
});
