Ext.define('se_main.view.peerpayments.BalanceGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
        'Ext.grid.plugin.*'
    ],
    id: 'balancegrid',
    alias: 'widget.balancegrid',    
    
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },

    store: 'Balances',

    title: 'Starting Balances',
    
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