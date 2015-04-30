Ext.define('se_main.model.Person', {
    extend: 'Ext.data.Model',
    alias: 'widget.person',
    fields: [
        { name: 'user_id', type: 'string' },
        { name: 'person_id', type: 'string' },
        { name: 'person_name', type: 'string' }
    ]
});