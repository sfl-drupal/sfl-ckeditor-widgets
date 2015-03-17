CKEDITOR.dialog.add( 'sflIcon', function( editor ) {
    return {
        title: 'Edit sflIcon',
        minWidth: 100,
        minHeight: 100,
        contents: [
            {
                id: 'info',
                elements: [
                    {
                        id: 'icon',
                        type: 'text',
                        label: 'CSS icon class (should be like <strong>sflicon-classname</strong>)<br >Have a look to Font demo to see a complete icons list.',
                        width: '150px',
                        setup: function( widget ) {
                            this.setValue( widget.data.icon );
                        },
                        commit: function( widget ) {
                            widget.setData( 'icon', this.getValue() );
                        }
                    }
                ]
            }
        ]
    };
} );
