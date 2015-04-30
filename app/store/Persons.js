Ext.define('se_main.store.Persons', {
    extend: 'Ext.data.Store',
    model: 'se_main.model.Person',
    autoLoad: false,
    autoSync: true,
    
    proxy:
    {
    		/*
        type: 'ajax',
        api:
        {
            read: '../DBGetPersons.aspx',
            create: '../DBSetPersons.aspx?action=new',
            update: '../DBSetPersons.aspx?action=update',
            destroy: '../DBSetPersons.aspx?action=delete'
        },
        */
        type: 'rest',		       
       	//url: 'http://localhost:3000/persons',
       	url: '../persons',
        reader:
        {
            type: 'json',
            root: 'persons',
            successProperty: 'success',
            totalProperty: 'total'
            //idProperty: 'person_id'
        },
        writer:
        {
            type: 'json',
            writeAllFields: true,
            allowSingle: false
        }
    }
    
});