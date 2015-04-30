Ext.define('se_main.view.Main', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],
    
    xtype: 'app-main',

    layout: 'accordion',

    items: [
    {
        title: 'Trip Selection',
        xtype: 'tripgrid',
        id: 'tripSelectionPanel'        
    }    
    ,
    {
        title: 'Expenses and Balances',
        xtype: 'fulltrippanel',
        id: 'full-trip-panel'
    }   
    ],    
    
    initComponent: function () {
        this.callParent(arguments);
    }
});