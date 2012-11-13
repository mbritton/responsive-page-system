/**
 * @author Mike Britton
 * 
 * @class ModelPrepCommand
 * 
 * 
 * 
 */

puremvc.define
(
    {
        name:'rps.command.ModelPrepCommand',
        parent:puremvc.SimpleCommand
    },
  
    // INSTANCE MEMBERS
    {
        /** @override */
        execute: function (note)
        {
            this.facade.registerProxy( new rps.model.proxy.PageProxy );
        }
    }    
);
