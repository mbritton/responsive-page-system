/**
 * PureMVC JS Demo: Responsive Page System
 * @author Mike Britton
 */
puremvc.define({
    name : 'rps.ViewPortComponent',
    constructor : function(event) {
    }
},

// INSTANCE MEMBERS
{
    signals : {
        readySignal : new signals.Signal(),
        testSignal : new signals.Signal(),
        logSignal : new signals.Signal()
    },

    handleEvent : function(event) {
        switch(event.type) {
            case 'click':
                this.dispatchClick();
                break;
            default:
                alert('ViewPortComponent\'s event handler received an unsupported event.');
                break;

        }
    },

    build : function(pageData) {
        // Identify component element
        var pgX = '<div class="pagesX" style="height:' + pageData.dimensions.height + 'px;width:' + pageData.items.length * pageData.dimensions.width + 'px;"></div>';
        var pgY = '<div class="pagesY" style="height:' + pageData.items.length * pageData.dimensions.height + 'px;width:' + pageData.dimensions.width + 'px;"></div>';

        $('.viewPort').append(pgX);
        $('.viewPort').append(pgY);
        $('.pagesX,.pagesY').css({
            left : '0px',
            top : '0px'
        });

        var gridItem = '<div class="gridRowMain" style="width:100%;">grid row</div>';

        var targ = this;
        var pgXTemplate, pgYTemplate, xPageContent, yPageContent, contentTemplate;
        $.each(pageData.items, function(i, item) {

            contentTemplate = $('#' + item.templateName).html();

            pgXTemplate = '<div id="' + item.id + 'X" style="float:left;width:' + pageData.dimensions.width + 'px;" class="pageContent"></div>';
            pgYTemplate = '<div id="' + item.id + 'Y" style="width:' + pageData.dimensions.width + 'px;height:' + pageData.dimensions.height + 'px;">&nbsp;</div>';

            // Create X Pages
            $('.pagesX').append(pgXTemplate);
            // Create Y Pages
            $('.pagesY').append(pgYTemplate);

            $('#' + item.id + 'X').append(_.template(contentTemplate, {
                title : item.title,
                text : item.text,
                items : item.items
            }));

        });

        this.redraw(pageData);
        this.signals.readySignal.dispatch(rps.ViewPortComponent.SIGNAL_READY);
    },

    maintainSelectedPage : function(pageData, selectedPageIndex) {
        $('.pagesX').css({
            marginLeft : -selectedPageIndex * pageData.dimensions.width + 'px'
        });
        $('.pagesY').css({
            marginTop : -selectedPageIndex * pageData.dimensions.height + 'px'
        });
    },

    redraw : function(pageData) {
        var vpY = 0, vpX = 0, vpLeft = 0;
        var pgstrX = '', pgstrY = '', bottomMarginHeight, contentHeight, contentYPos;

        if (pageData.contentConfig.topNavActivated) {
            vpY = pageData.dimensions.topNavHeight;
        }

        if (pageData.contentConfig.orientation == rps.AppConstants.PORTRAIT_MODE) {
            vpY = vpY + pageData.dimensions.navHeight;

        } else {
            if (pageData.contentConfig.menuActivated) {
                vpLeft = 300;
            }
        }

        $('.viewPort').css({
            width : pageData.dimensions.width + 'px',
            height : pageData.dimensions.height - vpY + 'px',
            top : pageData.contentConfig.topNavActivated ? pageData.dimensions.topNavHeight + 'px' : '0px',
            left : vpLeft + 'px'
        });

        $('.pagesX').css({
            width : pageData.items.length * pageData.dimensions.width + 'px',
            height : pageData.dimensions.height + 'px'
        });

        $('.pagesY').css({
            width : pageData.dimensions.width + 'px',
            height : pageData.items.length * pageData.dimensions.height + 'px',
        });

        $.each(pageData.items, function(index, item) {
            pgstrX += '#' + item.id + 'X,'
            pgstrY += '#' + item.id + 'Y,'

        });

        $(pgstrX + pgstrY).css({
            width : pageData.dimensions.width + 'px',
            height : pageData.dimensions.height + 'px',
        });

        // Width and height of each page's content area
        $('.pageContent').css({
            width : pageData.dimensions.width + 'px',
            height : pageData.dimensions.height - vpY + 'px',
            overflowY : 'auto' // marker for deletion
        });

    },

    gotoPage : function(pageData) {
        var nextPageIndex = jQuery.inArray(pageData.currentPage, pageData.items);
        var nextPositionX = nextPageIndex * pageData.dimensions.width;
        var nextPositionY = nextPageIndex * pageData.dimensions.height;

        if ($('.pagesX').length > 0) {
            $('.pagesX').animate({
                marginLeft : -nextPositionX,
            }, {
                duration : 500,
                easing : 'easeInOutSine'
            });
        }
        if ($('.pagesY')) {
            $('.pagesY').animate({
                marginTop : -nextPositionY
            }, {
                duration : 500,
                easing : 'easeInOutSine'
            });
        }
    }
},

// CLASS MEMBERS
{
    NAME : 'ViewPortComponent',
    SIGNAL_READY : 'readySignal',
});
