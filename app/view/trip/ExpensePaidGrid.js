Ext.define('se_main.view.trip.ExpensePaidGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
        'Ext.grid.plugin.*'
    ],
    id: 'expensepaidgrid',
    alias: 'widget.expensepaidgrid',    
    
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },

    store: 'ExpensePaids',

    title: 'Expenses Paid',
    frame: true,    
    
    tbar: [{
        text: 'Add Expense',
        id: 'btnNewEP'
    },    
    {
        text: 'Calculate Payments',
        id: 'btnSeePayments'
    }],

    columns: {
        items: [
        {
            header: 'Expense',            
            dataIndex: 'expense_name',
            editor: {
                //allowBlank: false
            }          
        }
        ,{
            header: 'Amount',
            dataIndex: 'expense_amount',
            renderer: 'usMoney',
            editor: {
                xtype: 'numberfield'
                //allowBlank: false
            }
        }
        ,{
            header: 'Date',
            dataIndex: 'expense_date',
            renderer: Ext.util.Format.dateRenderer('M d, Y'),
            editor: {
                xtype: 'datefield',
                format: 'm/d/y',
                minValue: '01/01/06'
                //allowBlank: false
            }
        }
        ,{
            header: 'Paid By',
            dataIndex: 'person_name',
            
            // this works like person editor on Participant grid, except you cannot add a person who is not present.
            editor: {
                xtype: 'combobox',
                displayField: 'person_name',
                valueField: 'person_name',
                //allowBlank: false,
                forceSelection: true,                
                
                queryMode: 'remote',
                triggerAction: 'all',                
                store: 'epPeopleStore'
                                
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
                    this.up('grid').fireEvent('itemdeleteepbuttonclick', grid, rowIndex, colIndex);
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