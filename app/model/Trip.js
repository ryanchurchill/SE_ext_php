Ext.define('se_main.model.Trip', {
    extend: 'Ext.data.Model',
    alias: 'widget.trip',
    fields: [
        { name: 'trip_id', type: 'string' },
        { name: 'user_id', type: 'string' },
        { name: 'trip_name', type: 'string' },
        { name: 'start_date', type: 'date', dateFormat: 'c' },
        { name: 'end_date', type: 'date', dateFormat: 'c' }
    ]
});