Ext.define('se_main.view.trip.TripGrid', {
    extend: 'Ext.grid.Panel',    

    alias: 'widget.tripgrid',
    title: 'Trips',
    id: 'tripgrid',
    store: 'Trips',   
    //xtype: 'cell-editing', 


    tbar: [{
        text: 'New Trip',
        id: 'btnNewTrip'         
    }],

    columns: {
        items:
        [
            {
                header: 'Trip',
                dataIndex: 'trip_name',
                id: 'colTripName',
                editor: {
                    // defaults to textfield if no xtype is supplied
                    //allowBlank: false
                }             
            },
            {                
                dataIndex: 'start_date',
                header: 'From Date',
                renderer: Ext.util.Format.dateRenderer('M d, Y'),
                editor: {
                    xtype: 'datefield',
                    format: 'm/d/y',
                    minValue: '01/01/06'
                }
            }
            ,
            {                
                dataIndex: 'end_date',
                header: 'To Date',
                renderer: Ext.util.Format.dateRenderer('M d, Y'),
                editor: {
                    xtype: 'datefield',
                    format: 'm/d/y',
                    minValue: '01/01/06'
                }
            },
            {
                xtype: 'actioncolumn',
                sortable: 'false',
                menuDisabled: 'true',
                width: 50,
                items: [
                {
                    icon: 'resources/delete.gif',
                    tooltip: 'Delete Trip',
                    handler: function(grid, rowIndex, colIndex){
                        this.up('grid').fireEvent('deletetripclick', grid, rowIndex, colIndex);
                    }
                },
                {
                    icon: 'resources/green-arrow-right.png',
                    tooltip: 'Select Trip',
                    handler: function(grid, rowIndex, colIndex){
                        this.up('grid').fireEvent('selecttripclick', grid, rowIndex, colIndex);
                    }                    
                }]                
            }
        ],        
        selModel: {
            selType: 'cellmodel'
        }   
    },    
    plugins: [    
        Ext.create('Ext.grid.plugin.RowEditing', {
        //Ext.create('Ext.grid.plugin.CellEditing', { // could not get cell editing working with validations (didn't try very hard)
            clicksToEdit: 2
        })
    ]
    
});