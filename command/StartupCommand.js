/**
 * @author Mike Britton
 *
 * @class StartupCommand
 */

puremvc.define(
{
    name : 'rps.command.StartupCommand',
    parent : puremvc.MacroCommand
},
{
    /** @override */
    initializeMacroCommand : function() {
        // Register Commands with the Facade
        this.addSubCommand(rps.command.ModelPrepCommand);
        this.addSubCommand(rps.command.ViewPrepCommand);

    }
});
