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
                        label: 'CSS icon class',
                        width: '50px',
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