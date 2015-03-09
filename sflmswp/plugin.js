
CKEDITOR.plugins.add( 'sflmswp', {
    requires: 'widget',

    icons: 'sflIcon,boitMessage',
   
    
    init: function( editor ) {
        CKEDITOR.dialog.add( 'sflIcon', this.path + 'dialogs/sflIcon.js' );
        //CKEDITOR.dialog.add( 'boitMessage', this.path + 'dialogs/boitMessage.js' );

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
                if ( this.element.hasClass( 'sflicon' ) )
                    this.setData( 'icon', '' );
                if ( this.element.hasClass( 'sflicon-sflvault' ) )
                    this.setData( 'icon', 'sflvault' );
                if ( this.element.hasClass( 'sflicon-sflring' ) )
                    this.setData( 'icon', 'sflring' );
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
        
        editor.widgets.add( 'boitMessage', {
            
            button : 'Create à boit de message',
            
            template : '<div class="box--message">'+
                        '<div class="title--form">Un petit texte de petit titre</div>'+
                        '<p>  du text </p>'+
                        '</div>',
            
            editables: {
                title: {
                    selector: '.title--form',
                    allowedContent: 'br strong em'
                },
                content: {
                    selector: '.box--message > p',
                    allowedContent: 'p br ul ol li strong em'
                }
            },

            allowedContent: 'div(!box--message,title--form); p',

            requiredContent: 'div(box--message)',

            //dialog: 'boitMessage',

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
