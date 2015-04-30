Ext.define('se_main.store.PeerPayments', {
    extend: 'Ext.data.Store',
    model: 'se_main.model.PeerPayment',
    autoLoad: false,
    autoSync: false,

    proxy:
    {
        /*
        type: 'ajax',
        api:
        {
            read: '../GetPeerPayments.aspx',
            create: '../DBSetPeerPayments.aspx?action=new',
            update: '../DBSetPeerPayments.aspx?action=update',
            destroy: '../DBSetPeerPayments.aspx?action=delete'
        },
        */
        type: 'rest',               
        //url: 'http://localhost:3000/peerpayments',
        url: '../peerpayments',
        reader:
        {
            type: 'json',
            root: 'peer_payments',
            successProperty: 'success',
            totalProperty: 'total',
            idProperty: 'peer_payment_id'         
        },
        writer:
        {
            type: 'json',
            writeAllFields: true,
            allowSingle: false
        }
    }

});