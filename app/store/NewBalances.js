Ext.define('se_main.store.NewBalances', {
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
            read: '../GetNewBalances.aspx'            
        },
        */
        type: 'rest',
        //url: 'http://localhost:3000/newbalances',
        url: '../newbalances',
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