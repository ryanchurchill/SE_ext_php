Ext.define('se_main.view.peerpayments.PeerPaymentGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
        'Ext.grid.plugin.*'
    ],
    id: 'peerpaymentgrid',
    alias: 'widget.peerpaymentgrid',    
    
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },

    store: 'PeerPayments',

    title: 'Actions',
    
    tbar: [{
            text: 'Add Payment',
            id: 'btnNewPayment'
        },
        {
            text: 'Calculate Balances',
            id: 'btnCalcNewBalances'
    }],
    
    columns: {
        items: [
        {
            header: 'Active',
            dataIndex: 'is_active',
            xtype: 'checkcolumn',
            width: 50
        },
        {
            header: 'Source',
            dataIndex: 'src_person_name',
            editor: {
                xtype: 'combobox',
                displayField: 'person_name',
                valueField: 'person_name',
                allowBlank: false,
                forceSelection: true,                                
                queryMode: 'remote',
                triggerAction: 'all',                
                store: 'epPeopleStore'               
            }           
        },
        {
            header: 'Destination',
            dataIndex: 'dst_person_name',
            editor: {
                xtype: 'combobox',
                displayField: 'person_name',
                valueField: 'person_name',
                allowBlank: false,
                forceSelection: true,
                queryMode: 'remote',
                triggerAction: 'all',                
                store: 'epPeopleStore'               
            }
        },
        {
            header: 'Amount',
            dataIndex: 'payment_amt',
            renderer: 'usMoney',
            width: 75,
            editor: {
                xtype: 'numberfield',
                allowBlank: false
            }
        }
        ,{            
            xtype: 'actioncolumn',
            sortable: 'false',
            menuDisabled: 'true',
            width: 30,
            items: [{
                icon: 'resources/delete.gif',
                tooltip: 'Remove Entry',
                handler: function(grid, rowIndex, colIndex){
                    this.up('grid').fireEvent('itemdeletep2pbuttonclick', grid, rowIndex, colIndex);
                }                    
            }]        
        }        
        ]
    },
    
    plugins: [
        //Ext.create('Ext.grid.plugin.CellEditing', {        
        Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2
        })
    ]
});