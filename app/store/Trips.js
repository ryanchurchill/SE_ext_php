Ext.define('se_main.store.Trips', {
    extend: 'Ext.data.Store',
    model: 'se_main.model.Trip',
    autoLoad: true,
    autoSync: false,
    
    /*
    data: [
        { trip_id: '1', user_id: 'rchurchill', start_date: '2014-01-02', end_date: '2014-01-04', trip_name: 'Miami Trip' },
        { trip_id: '2', user_id: 'rchurchill', start_date: '2014-02-02', end_date: '2014-02-07', trip_name: 'Cali Trip 1' },
        { trip_id: '3', user_id: 'rchurchill', start_date: '2014-03-14', end_date: '2014-03-16', trip_name: 'Cali Trip 2' }
    ],
    */

    proxy:
    {
    	type: 'ajax',
    	api:
        {
            read: 'php/trips.php',
            create: '../DBSetTrips.aspx?action=new',
            update: '../DBSetTrips.aspx?action=update',
            destroy: '../DBSetTrips.aspx?action=delete'
        },
        //type: 'ajax',
        /*
        api:
        {
            read: '../DBGetTrips.aspx',
            create: '../DBSetTrips.aspx?action=new',
            update: '../DBSetTrips.aspx?action=update',
            destroy: '../DBSetTrips.aspx?action=delete'
        },
        */
       /*
       api:
        {
            read: 'http://localhost:3000/trips',
            create: 'http://localhost:3000/trips/new',
            update: 'http://localhost:3000/trips/update',
            destroy: 'http://localhost:3000/trips/destroy'
        },
        */
       	/*//
        type: 'rest',		       
       	//url: 'http://localhost:3000/trips',
       	//url: 'https://morning-ridge-5206.herokuapp.com/trips',
       	url: '../trips',
       	*/
       	
       	
        reader:
        {
            type: 'json',
            root: 'trips',
            successProperty: 'success',
            //totalProperty: 'total',
            idProperty: 'trip_id'
        },
        writer:
        {
            type: 'json',
            writeAllFields: true,
            allowSingle: false
            //root: 'trips'
            //returnJson: true
        }
        
    }    
});