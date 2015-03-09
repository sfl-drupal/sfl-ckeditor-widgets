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
                        type: 'select',
                        label: 'Select icon',
                        items: [
                            [ '' ],
                            [ 'sflvault' ],
                            [ 'sflring' ],
                        ],
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