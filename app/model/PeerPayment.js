Ext.define('se_main.model.PeerPayment', {
    extend: 'Ext.data.Model',
    alias: 'widget.peerpayment',
    fields: [        
        { name: 'peer_payment_id', type: 'string' },
        { name: 'trip_id', type: 'string' },
        //{ name: 'src_person_id', type: 'string' },
        { name: 'src_person_name', type: 'string' },
        //{ name: 'dst_person_id', type: 'string' },        
        { name: 'dst_person_name', type: 'string' },
        { name: 'payment_amt', type: 'float' },
        { name: 'is_active', type: 'bit'}
    ]
});