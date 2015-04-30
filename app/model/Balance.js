Ext.define('se_main.model.Balance', {
    extend: 'Ext.data.Model',
    alias: 'widget.balance',
    fields: [        
        { name: 'person_id', type: 'string' },
        { name: 'person_name', type: 'string' },        
        { name: 'owes', type: 'float' },
        { name: 'paid', type: 'float' },
        { name: 'balance', type: 'float' }
    ]
});