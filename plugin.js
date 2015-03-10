
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
