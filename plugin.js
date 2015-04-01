
CKEDITOR.plugins.add( 'sfl_widgets', {
    requires: 'widget',

    icons: 'sflIcon,messageBox,communicationBox',


    init: function( editor ) {
        CKEDITOR.dialog.add( 'sflIcon', this.path + 'dialogs/sflIcon.js' );
        //CKEDITOR.dialog.add( 'messageBox', this.path + 'dialogs/messageBox.js' );

        editor.widgets.add( 'sflIcon', {

            button: 'Create a simple icon',

            template: '<i class="sflicon"></i>',

            allowedContent: 'i(!sflicon*)',

            requiredContent: 'i(!sflicon*)',

            dialog: 'sflIcon',

            upcast: function( element ) {
                if (element.name != 'i') {
                    return;
                }
                if ( !element.hasClass( 'sflicon' ) ) {
                    return;
                };
                return element;
            },

            init: function() {
                var otherclass =  this.element.getAttribute( 'class' ).split(" "),
                classre = new RegExp( '\\b^sflicon[-\w]+\\b' );
                for (var i = 0; i < otherclass.length; i++) {
                    var classtomatch = otherclass[i];
                    var ma = classre.test(classtomatch);
                    if (ma)
                        this.setData( 'icon', otherclass[i] );
                }

            },

            data: function() {

                var newClass = this.data,
                    oldClass = this.oldClass;

                // Remove old .sflicon-* class.
                if ( oldClass && newClass.icon != oldClass.icon ) {
                    this.element.removeClass( oldClass.icon );
                }

                // Icons needs to be specified in order to apply formatting.
                if ( newClass.icon ) {
                    // Apply new .sflicon-* class.
                    this.element.addClass( newClass.icon );
                }

                // Save oldData.
                this.oldClass = CKEDITOR.tools.copy( newClass );
            }
        } );

        editor.widgets.add( 'messageBox', {

            button : 'Create a message box',

            template : '<div class="box--message__wrapper">'+
                         '<dl class="box--message">'+
                           '<dt class="box--message__title">Box title</dt>'+
                           '<dd class="box--message__content">Box content</dd>'+
                         '</dl>'+
                       '</div>',

            editables: {
                title: {
                    selector: '.box--message__title',
                    allowedContent: 'strong em'
                },
                content: {
                    selector: '.box--message__content',
                    allowedContent: 'strong em'
                }
            },

            allowedContent: 'div(!box--message__wrapper); dl(!box--message); dt(!box--message__title); dd(!box--message__content)',

            // requiredContent: 'dl(box--message)',

            //dialog: 'messageBox',

            upcast: function( element ) {
                console
                return element.name == 'div' && element.hasClass( 'box--message__wrapper' );
            },


        } );

        editor.widgets.add( 'communicationBox', {

            button : 'Create a communication box',

            template : '<div class="communicationBox__wrapper">'+
                         '<dl class="communicationBox">'+
                           '<dt class="communicationBox__title">Box title</dt>'+
                           '<dd class="communicationBox__content">Box content</dd>'+
                         '</dl>'+
                       '</div>',

            editables: {
                title: {
                    selector: '.communicationBox__title',
                    allowedContent: 'strong em'
                },
                content: {
                    selector: '.communicationBox__content',
                    allowedContent: 'strong em'
                }
            },

            allowedContent: 'div(!communicationBox__wrapper); dl(!communicationBox); dt(!communicationBox__title); dd(!communicationBox__content)',

            // requiredContent: 'dl(communicationBox)',

            //dialog: 'communicationBox',

            upcast: function( element ) {
                return element.name == 'div' && element.hasClass( 'communicationBox__wrapper' );
            },


        } );


        if (typeof editor.config.contentsCss == 'object') {
            editor.config.contentsCss.push(CKEDITOR.getUrl(this.path + 'contents.css'));
        }

        else {
            editor.config.contentsCss = [editor.config.contentsCss, CKEDITOR.getUrl(this.path + 'contents.css')];
        }
    }
} );
