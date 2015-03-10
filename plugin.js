
CKEDITOR.plugins.add( 'sfl_widgets', {
    requires: 'widget',

    icons: 'sflIcon,messageBox',


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
                if ( this.element.hasClass( 'sflicon' ) ){
                    this.setData( 'icon', '' );
                    // Remove the main class temporally to work with the other class easily
                    this.element.removeClass( 'sflicon' );
                }
                var otherclass =  this.element.getAttribute( 'class' ),
                classre = new RegExp( '\b^sflicon-[a-z]+\b' );
                if (classre.exec(otherclass) !== null)
                    this.setData( 'icon', otherclass );

                // Add the main class at the end.
                this.element.addClass( 'sflicon' );
            },

            data: function() {

                var newData = this.data,
                    oldData = this.oldData;

                // Remove old .sflicon-* class.
                if ( oldData && newData.icon != oldData.icon ) {
                    this.element.removeClass( 'sflicon-' + oldData.icon );
                }

                // Icons needs to be specified in order to apply formatting.
                if ( newData.icon ) {
                    // Apply new .sflicon-* class.
                    this.element.addClass( 'sflicon-' + newData.icon );
                }

                // Save oldData.
                this.oldData = CKEDITOR.tools.copy( newData );
            }
        } );

        editor.widgets.add( 'messageBox', {

            button : 'Create a message box',

            template : '<div class="box--message">'+
                         '<h3 class="title--form">Box title</h3>'+
                         '<div>Box text</div>'+
                       '</div>',

            editables: {
                title: {
                    selector: '.box--message > .title--form',
                    allowedContent: 'br strong em'
                },
                content: {
                    selector: '.box--message > div',
                    allowedContent: 'p br ul ol li strong em'
                }
            },

            allowedContent: 'div(!box--message,title--form); p',

            requiredContent: 'div(box--message)',

            //dialog: 'messageBox',

            upcast: function( element ) {
                return element.name == 'div' && element.hasClass( 'box--message' );
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
