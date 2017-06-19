CKEDITOR.dialog.add( 'messageBox', function( editor ) {
    return {
        title: 'Edit message box',
        minWidth: 100,
        minHeight: 100,
        contents: [
            {
                id: 'info',
                elements: [
                    {
                        id: 'title',
                        type: 'text',
                        label: 'Title',
                        width: '300px',
                        setup: function( widget ) {
                            this.setValue( widget.data.title );
                        },
                        commit: function( widget ) {
                            widget.setData( 'title', this.getValue() );
                        }
                    },
                    {
                        id: 'content',
                        type: 'textarea',
                        label: 'Content <ul><li>use <strong>strong</strong> tag to make text <strong>bold</strong></li><li>use <strong>em</strong> tag to make text <em>italic</em></li><li>use <strong>br</strong> tag to end line</li></ul>',
                        width: '300px',
                        setup: function( widget ) {
                            this.setValue( widget.data.content );
                        },
                        commit: function( widget ) {
                            widget.setData( 'content', this.getValue() );
                        }
                    }
                ]
            }
        ]
    };
} );
