
CKEDITOR.plugins.add( 'sfl_widgets', {
    requires: 'widget',

    icons: 'sflIcon,communicationBox,messageBox',


    init: function( editor ) {

        CKEDITOR.dialog.add( 'sflIcon', this.path + 'dialogs/sflIcon.js' );
        editor.widgets.add( 'sflIcon', {

            button: 'Create a simple icon',

            template: '<i class="sflicon">&nbsp;</i>',

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
        editor.ui.addButton( 'sflIcon', {
            label : 'Create a simple icon',
            command : 'sflIcon',
            icons : CKEDITOR.getUrl(this.path + 'icons/sflIcon.png')
        } );

        CKEDITOR.dialog.add( 'communicationBox', this.path + 'dialogs/communicationBox.js' );
        editor.widgets.add( 'communicationBox', {

            // Button label
            button : 'Create a communication box',

            // Default template
            template : '<dl class="communicationBox">'+
                         '<dt class="communicationBox__title">Title</dt>'+
                         '<dd class="communicationBox__content">Content</dd>'+
                       '</dl >',

            // Editables elements
            // editables: {
            //     title: {
            //         selector: '.communicationBox__title',
            //         allowedContent: 'strong em'
            //     },
            //     content: {
            //         selector: '.communicationBox__content',
            //         allowedContent: 'strong em'
            //     }
            // },

            allowedContent: 'dl(!communicationBox,red,yellow,blue,green); dt(!communicationBox__title); dd(!communicationBox__content)',

            requiredContent: 'dl(communicationBox)',

            dialog: 'communicationBox',

            // Callback launched each time widget datas are modified
            data: function() {
                var box = this.element,
                    boxTitle = box.getChildren().getItem(0),
                    boxContent = box.getChildren().getItem(1);

                if (typeof this.data.level !== 'undefined') {
                    if (this.element.hasClass('black'))
                        this.element.removeClass('black');
                    if (this.element.hasClass('red'))
                        this.element.removeClass('red');
                    if (this.element.hasClass('yellow'))
                        this.element.removeClass('yellow');
                    if (this.element.hasClass('blue'))
                        this.element.removeClass('blue');
                    if (this.element.hasClass('green'))
                        this.element.removeClass('green');
                    this.element.addClass(this.data.level);
                }
                if (typeof this.data.title !== 'undefined' && boxTitle.hasClass('communicationBox__title'))
                    boxTitle.setHtml(this.data.title);
                if (typeof this.data.content !== 'undefined' && boxContent.hasClass('communicationBox__content'))
                    boxContent.setHtml(this.data.content);
            },

            // Widget initialization
            init: function() {

                // Level recognition
                this.setData('level', 'black');
                if (this.element.hasClass('red'))
                    this.setData('level', 'red');
                if (this.element.hasClass('yellow'))
                    this.setData('level', 'yellow');
                if (this.element.hasClass('blue'))
                    this.setData('level', 'blue');
                if (this.element.hasClass('green'))
                    this.setData('level', 'green');

                // Title and content recognition
                var title = this.element.getChildren().getItem(0),
                    content = this.element.getChildren().getItem(1);
                if (title.hasClass('communicationBox__title'))
                    this.setData('title', title.getHtml());
                if (content.hasClass('communicationBox__content'))
                    this.setData('content', content.getHtml());
            },

            // Widget recognition
            upcast: function( element ) {
                return element.name == 'dl' && element.hasClass( 'communicationBox' );
            },

        } );
        editor.ui.addButton( 'communicationBox', {
            label : 'Create a communication box',
            command : 'communicationBox',
            icons : CKEDITOR.getUrl(this.path + 'icons/communicationBox.png')
        } );

        CKEDITOR.dialog.add( 'messageBox', this.path + 'dialogs/messageBox.js' );
        editor.widgets.add( 'messageBox', {

            button : 'Create a message box',

            template : '<dl class="box--message">'+
                         '<dt class="box--message__title">Title</dt>'+
                         '<dd class="box--message__content">Content</dd>'+
                       '</dl>',

            // editables: {
            //     title: {
            //         selector: '.box--message__title',
            //         allowedContent: 'strong em'
            //     },
            //     content: {
            //         selector: '.box--message__content',
            //         allowedContent: 'strong em'
            //     }
            // },

            allowedContent: 'dl(!box--message); dt(!box--message__title); dd(!box--message__content)',

            requiredContent: 'dl(box--message)',

            dialog: 'messageBox',

            data: function() {
                var box = this.element,
                    boxTitle = box.getChildren().getItem(0),
                    boxContent = box.getChildren().getItem(1);

                if (typeof this.data.title !== 'undefined' && boxTitle.hasClass('box--message__title'))
                    boxTitle.setHtml(this.data.title);
                if (typeof this.data.content !== 'undefined' && boxContent.hasClass('box--message__content'))
                    boxContent.setHtml(this.data.content);
            },

            init: function() {
                var title = this.element.getChildren().getItem(0),
                    content = this.element.getChildren().getItem(1);

                if (title.hasClass('box--message__title'))
                    this.setData('title', title.getHtml());
                if (content.hasClass('box--message__content'))
                    this.setData('content', content.getHtml());
            },

            upcast: function( element ) {
                return element.name == 'dl' && element.hasClass( 'box--message' );
            },


        } );
        editor.ui.addButton( 'messageBox', {
            label : 'Create a message box',
            command : 'messageBox',
            icons : CKEDITOR.getUrl(this.path + 'icons/messageBox.png')
        } );


        if (typeof editor.config.contentsCss == 'object') {
            editor.config.contentsCss.push(CKEDITOR.getUrl(this.path + 'contents.css'));
        } else {
            editor.config.contentsCss = [editor.config.contentsCss, CKEDITOR.getUrl(this.path + 'contents.css')];
        }
    }
} );
