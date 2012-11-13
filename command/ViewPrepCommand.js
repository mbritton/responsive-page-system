/**
 * @author Mike Britton
 * 
 * @class ViewPrepCommand
 * 
 */

puremvc.define 
(
    {
        name:'rps.command.ViewPrepCommand',
        parent:puremvc.SimpleCommand
    },
    {
        /** @override */
        execute: function (note) {
            this.facade.registerMediator( new rps.view.mediator.ViewPortMediator );
            
            this.facade.registerMediator( new rps.view.mediator.TopNavMediator );
            this.facade.registerMediator( new rps.view.mediator.BottomNavMediator );
            this.facade.registerMediator( new rps.view.mediator.PageMenuMediator );
            
            this.sendNotification(rps.AppConstants.NOTE_GET_PAGES);
        }
    }     
);
