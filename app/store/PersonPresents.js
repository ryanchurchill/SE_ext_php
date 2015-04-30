Ext.define('se_main.store.PersonPresents', {
    extend: 'Ext.data.Store',
    model: 'se_main.model.PersonPresent',
    autoLoad: false,
    autoSync: false,

    proxy:
    {
    		/*
        type: 'ajax',
        api:
        {
            read: 'http://localhost:3000/personpresents',
            create: '../DBSetPersonPresents.aspx?action=new',
            update: '../DBSetPersonPresents.aspx?action=update',
            destroy: '../DBSetPersonPresents.aspx?action=delete'
        },
        */
       	type: 'rest',
       	//url: 'http://localhost:3000/personpresents',
       	url: '../personpresents',
        reader:
        {
            type: 'json',
            root: 'pps',
            successProperty: 'success',
            totalProperty: 'total',
            idProperty: 'person_present_id'
        },
        writer:
        {
            type: 'json',
            writeAllFields: true,
            allowSingle: false
        }
    }

});