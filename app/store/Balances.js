Ext.define('se_main.store.Balances', {
    extend: 'Ext.data.Store',
    model: 'se_main.model.Balance',
    autoLoad: false,
    autoSync: false,
    sorters: [{ property: "person_name", direction: "ASC" }],

    proxy:
    {
        /*
        type: 'ajax',
        api:
        {
            read: '../GetBalances.aspx'            
        },
        */
        type: 'rest',
        //url: 'http://localhost:3000/balances',
        url: '../balances',
       
        reader:
        {
            method: 'POST',
            type: 'json',
            root: 'balances',
            successProperty: 'success',
            totalProperty: 'total'            
        }
    }

});