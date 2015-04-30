Ext.define('se_main.view.peerpayments.NewBalanceGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
        'Ext.grid.plugin.*'
    ],
    id: 'newbalancegrid',
    alias: 'widget.newbalancegrid',    
    
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },

    store: 'NewBalances',

    title: 'Balances After Actions',
    
    columns: {
        items: [
        {
            header: 'Person',
            dataIndex: 'person_name'
        },
        {
            header: 'Owes',
            dataIndex: 'owes',
            renderer: 'usMoney'
        },
        {
            header: 'Paid',
            dataIndex: 'paid',
            renderer: 'usMoney'
        },
        {
            header: 'Balance',
            dataIndex: 'balance',
            renderer: 'usMoney'
        }
        ]
    }
});