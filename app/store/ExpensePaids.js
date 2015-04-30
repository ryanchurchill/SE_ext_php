Ext.define('se_main.store.ExpensePaids', {
    extend: 'Ext.data.Store',
    model: 'se_main.model.ExpensePaid',
    autoLoad: false,
    autoSync: false,

    proxy:
    {
    		/*
        type: 'ajax',
        api:
        {
            read: 'http://localhost:3000/expensepaids',
            create: '../DBSetExpensePaids.aspx?action=new',
            update: '../DBSetExpensePaids.aspx?action=update',
            destroy: '../DBSetExpensePaids.aspx?action=delete'
        },
        */
       	type: 'rest',		       
       	//url: 'http://localhost:3000/expensepaids',
       	url: '../expensepaids',
        reader:
        {
            type: 'json',
            root: 'eps',
            successProperty: 'success',
            totalProperty: 'total',
            idProperty: 'expense_paid_id'
        },
        writer:
        {
            type: 'json',
            writeAllFields: true,
            allowSingle: false
        }
    }

});