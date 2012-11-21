/**
 * PureMVC JS Demo: Responsive Page System
 * @author Mike Britton
 */
puremvc.define({
    name : 'rps.ChangeObject',
    constructor : function(type, val) {
        this.type = type;
        this.val = val;
    }
},

// INSTANCE MEMBERS
{
    type : '',
    val : ''

},

// CLASS MEMBERS
{
    // Miscellaneous
    PORTRAIT_MODE : 'portrait_mode',
    LANDSCAPE_MODE : 'landscape_mode',
    PAGE_CHANGE_DIRECTION : 'direction',
    PAGE_CHANGE_ID : 'id',
    PAGE_CHANGE_HOME : 'home',
    PAGE_CHANGE_BACK : 'back',
});
