Ext.define('se_main.model.PersonPresent', {
    extend: 'Ext.data.Model',
    alias: 'widget.personpresent',
    fields: [
        { name: 'person_present_id', type: 'string' },
        { name: 'trip_id', type: 'string' },        
        { name: 'start_date', type: 'date', dateFormat: 'c' },
        { name: 'end_date', type: 'date', dateFormat: 'c' },        
        //{ name: 'person_id', type: 'string' },
        { name: 'person_name', type: 'string' }
    ]
});