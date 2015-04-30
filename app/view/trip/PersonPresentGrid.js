Ext.define('se_main.view.trip.PersonPresentGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
        'Ext.grid.plugin.*'
    ],
    id: 'personpresentgrid',
    alias: 'widget.personpresentgrid',    
    
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },

    store: 'PersonPresents',

    title: 'People Present',
    frame: true,
    //itemId: 'tripInfoForm',
    
    tbar: [{
        text: 'Add Person',
        id: 'btnNewPP'         
    }],

    columns: {
        items:
        [
            {
                dataIndex: 'person_name',
                header: 'Person',
                //flex: 1,

                editor: {//Ext.form.field.ComboBox({
                    xtype: 'combobox',
                    displayField: 'person_name',
                    valueField: 'person_name',
                    
                    typeAhead: true,
                               
                    queryMode: 'remote',
                    triggerAction: 'all',
                    store: 'Persons'
                    
                }


            },
            {
                //xtype: 'datefield',
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
                xtype: 'datecolumn',
                dataIndex: 'end_date',
                header: 'To Date',
                renderer: Ext.util.Format.dateRenderer('M d, Y'),
                editor: {
                    xtype: 'datefield',
                    format: 'm/d/y',
                    minValue: '01/01/06'
                }
            }
            ,
            {
                xtype: 'actioncolumn',
                sortable: 'false',
                menuDisabled: 'true',
                width: 30,
                items: [{
                    icon: 'resources/delete.gif',
                    tooltip: 'Remove Entry',
                    handler: function(grid, rowIndex, colIndex){
                        this.up('grid').fireEvent('itemdeleteppbuttonclick', grid, rowIndex, colIndex);
                    }                    
                }]
            }

        ]     

    }
    
    , plugins: [
    //Ext.create('Ext.grid.plugin.CellEditing', {
        Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2
        })
    ]
    

});