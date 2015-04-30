Ext.define('se_main.model.ExpensePaid', {
    extend: 'Ext.data.Model',
    alias: 'widget.expensepaid',
    fields: [
        // expense
        { name: 'trip_id', type: 'string' },
        { name: 'expense_id', type: 'string' },        
        { name: 'expense_amount', type: 'float' },
        { name: 'expense_name', type: 'string' },
        { name: 'expense_date', type: 'date', dateFormat: 'c' },        
        
        // expense_paid
        { name: 'expense_paid_id', type: 'string' },
        //{ name: 'person_id', type: 'string' },
        { name: 'person_name', type: 'string' }
    ]
});