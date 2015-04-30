// ryan, check this: http://stackoverflow.com/questions/15634636/load-data-to-form-in-mvc
Ext.define('se_main.controller.Main', {
    // ext stuff
    extend: 'Ext.app.Controller',

    stores: [
        'Trips',
        'PersonPresents',
        'Persons',
        'ExpensePaids',
        'Balances',
        'NewBalances',
        'PeerPayments'
    ],
    models: [
        'Trip',
        'PersonPresent',
        'Person',
        'ExpensePaid',
        'Balance',
        'PeerPayment'
    ],
    views: [
        'trip.TripGrid',        
        'trip.PersonPresentGrid',
        'trip.ExpensePaidGrid',        
        'FullTripPanel',        
        'peerpayments.BalanceGrid',
        'peerpayments.NewBalanceGrid',
        'peerpayments.PeerPaymentGrid',        
    ],

    // controller vars
    currentTrip: null,    
    userID: "1", // TODO!
    isBalanceOutOfSync: true, // use setter: do not change this directly
    epPeopleStore: Ext.create('se_main.store.Persons', {
        storeId: 'epPeopleStore'
    }),

    // initializing, events, listeners
    init: function() {
        this.control({
            tripgrid: {
                edit: this.onTripEdit,
                deletetripclick: this.onDeleteTrip,
                selecttripclick: this.onSelectTrip,
                validateedit: this.validateTripRecord
            },
            button: {
                click: this.onButtonClicked
            },
            personpresentgrid:{
                edit: this.onPPRowEdit,
                itemdeleteppbuttonclick: this.personPresentDelete,
                validateedit: this.validatePersonPresentRecord
            },
            expensepaidgrid:{
                edit: this.onEPRowEdit,
                itemdeleteepbuttonclick: this.genericRowDelete,
                validateedit: this.validateExpensePaidRecord
            },
            peerpaymentgrid:{
                itemdeletep2pbuttonclick: this.onP2PRowDelete
            }
        });
        
        var peerPaymentsStore = this.getPeerPaymentsStore();
        //peerPaymentsStore.addListener('load', this.afterPeerPaymentsLoad);
        peerPaymentsStore.addListener('refresh', this.afterPeerPaymentsRefresh);
        
        var balancesStore = this.getBalancesStore();        
        balancesStore.addListener(
            'refresh', 
            Ext.Function.bind(
                this.afterBalancesRefresh,
                null,
                [this],
                1 // starts passing the binded paramater at position 1
            )
        );
        
        var expensesPaidsStore = this.getExpensePaidsStore();
        expensesPaidsStore.addListener(
            'refresh', 
            Ext.Function.bind(
                this.afterExpensePaidsRefresh,
                null,
                [this],
                1 // starts passing the binded paramater at position 1
            )
        );
        
        var personPresentsStore = this.getPersonPresentsStore();
        personPresentsStore.addListener(
            'refresh', 
            Ext.Function.bind(
                this.afterPersonPresentsRefresh,
                null,
                [this],
                1 // starts passing the binded paramater at position 1
            )
        );
    },
    
    // buttons
    onButtonClicked: function(button) {
        if (button.id == "btnSaveTrip") {
            this.saveTrip();
        }
        if (button.id == "btnDeleteTrip") {
            this.deleteTrip();
        }
        if (button.id == "btnNewPP") {
            this.newPersonPresent(button);
        }
        if (button.id == "btnNewTrip"){
            this.newTrip(button);
        }
        if (button.id == "btnNewEP"){
            this.newExpensePaid(button);
        }
        if (button.id == "btnSeePayments"){
            this.seePayments(button);
        }
        if (button.id == "btnCalcNewBalances"){
            this.calcNewBalances(button);
        }
        if (button.id == "btnNewPayment"){
            this.newPayment(button);
        }
    },
    
    // shared functions
    
    // standard delete for any row. Can be used directly as listener
    genericRowDelete: function(grid, rowIndex, colIndex){
        grid.getStore().removeAt(rowIndex); 
        grid.getStore().sync(); // sync store with database
    },
    
    clearBalancesAndPayments: function(){
        // clear balance before actions
        Ext.data.StoreManager.get("Balances").loadData([],false);
        
        // clear peer payments
        Ext.data.StoreManager.get("PeerPayments").loadData([],false);
        
        // clear balance after actions
        Ext.data.StoreManager.get("NewBalances").loadData([],false);
    },
    
    // trips
    newTrip: function(button){        
        var record = new se_main.model.Trip({
            user_id: this.userID
        });
        
        // get store and index
        var storeTrips = Ext.data.StoreManager.lookup('Trips');
        var index = storeTrips.count();
        
        // insert record into the store
        storeTrips.insert(index, record);
        
        // Position the user to edit the record
        var tripGrid = button.up('grid');        
        tripGrid.editingPlugin.startEdit(index, 0);
        
    },
    
    onDeleteTrip: function(grid, rowIndex, colIndex){
        Ext.MessageBox.confirm(
            'Delete Trip', 
            'Are you sure you want to delete this trip? This will delete all expenses.',              
            Ext.Function.bind(
                function(btnText, controller, grid, rowIndex, colIndex){
                     if (btnText == "yes"){
                         controller.genericRowDelete(grid, rowIndex, colIndex);
                     }
                 },
                 null, // scope
                 [this, grid, rowIndex, colIndex],
                 1 // starts passing the binded parameters at position 1
            )            
         );
         return true;
    },
    
    validateTripRecord: function(editor, e){        
        if (!e.newValues.trip_name || e.newValues.trip_name == ""){
            Ext.MessageBox.alert('Validation Error', 'Trip must have a name.');
            return false;
        }
        if (!e.newValues.start_date){
            Ext.MessageBox.alert('Validation Error', 'Trip must have a start date.');
            return false;
        }
        if (!e.newValues.end_date){
            Ext.MessageBox.alert('Validation Error', 'Trip must have a end date.');
            return false;
        }
        if (e.newValues.start_date > e.newValues.end_date){
            Ext.MessageBox.alert('Validation Error', 'End Date may not be earlier than Start Date.');
            return false;
        }
        // todo: if we already have trip id, verify dates
    },
    
    onSelectTrip: function(grid, rowIndex, colIndex){
          var record = grid.getStore().getAt(rowIndex);
          this.currentTrip = record;
          this.setTrip();
          
          Ext.getCmp('full-trip-panel').expand(true); // reveal new panel
    },
    
    
    // updates everything for currentTrip
    setTrip: function(){      
        
        if (this.currentTrip != null){        
                    
            // load store for Person Present Grid
            var ppStore = Ext.data.StoreManager.get("PersonPresents");        
            ppStore.load({
                params: { trip_id: this.currentTrip.get('trip_id') }
            });
            
            // load store for Expense Grid
            var epStore = Ext.data.StoreManager.get("ExpensePaids");
            epStore.load({
                params: { trip_id: this.currentTrip.get('trip_id') }
            });
            
            // create and set store for Expense Grid people dropdown              
            
            this.epPeopleStore.proxy.extraParams = { trip_id: this.currentTrip.get('trip_id')}; // necessary for the filter to happen in the first place (I tried without it)
            //epPeopleStore.sync();
            this.epPeopleStore.load({
                params: { trip_id: this.currentTrip.get('trip_id') }
            });
            
            this.clearBalancesAndPayments();
                        
            // set title
            Ext.getCmp('tripSelectionPanel').setTitle(
                this.currentTrip.get('trip_name') + ': ' + 
                Ext.Date.format(this.currentTrip.get('start_date'), 'm-d-Y') + ' - ' + 
                Ext.Date.format(this.currentTrip.get('end_date'), 'm-d-Y')
            );                        
        }
        else {
            // if we don't have a record, clear the stores
            Ext.data.StoreManager.get("PersonPresents").loadData([],false);
            Ext.data.StoreManager.get("ExpensePaids").loadData([],false);
        }
    },

    
    
    onTripEdit: function(editor, e){
        Ext.data.StoreManager.lookup('Trips').sync();
    },
    
    // Person Present

    newPersonPresent: function(button) {
        if (!this.currentTrip) {
            Ext.MessageBox.alert('No Trip Selected', 'Please select or create a trip.');
            return;
        }


        // create new record, default to trip dates
        var record = new se_main.model.PersonPresent({
            trip_id: this.currentTrip.get('trip_id'),
            start_date: this.currentTrip.get('start_date'),
            end_date: this.currentTrip.get('end_date')
        });
        
        // get store and index
        var storePersonPresents = Ext.data.StoreManager.lookup('PersonPresents');
        var index = storePersonPresents.count();

        // insert record into the store
        storePersonPresents.insert(index, record);
        
        // Position the user to edit the record
        Ext.getCmp('personpresentgrid').editingPlugin.startEdit(index, 0);
        
    },
    
    afterPersonPresentsRefresh: function(store, controller){
        // when we make changes to people that were present, balance is out of sync
        controller.setIsBalanceOutOfSync(true);  
        
        // update the dropdown for people
        controller.epPeopleStore.load({
            params: { trip_id: controller.currentTrip.get('trip_id') }
        });
    },
    
    onPPRowEdit: function(editor, e){
        Ext.data.StoreManager.lookup('PersonPresents').sync();
    },
    
    personPresentDelete: function(grid, rowIndex, colIndex){
        // ensure person is not used in any expenses
        var record = grid.getStore().getAt(rowIndex);
        var personName = record.get('person_name');
        if (this.checkExpensesForPerson(personName)){
            Ext.MessageBox.alert('Cannot Remove Person', personName + ' has at least one expense. Must clear this person\'s expenses before you can remove this person from trip.');
            return;
        }
        
        // if all okay, delete
        this.genericRowDelete(grid, rowIndex, colIndex);
    },       
    
    validatePersonPresentRecord: function(editor, e){        
        if (!e.newValues.person_name || e.newValues.person_name == ""){
            Ext.MessageBox.alert('Validation Error', 'Person must have a name.');
            return false;
        }
        
        // make sure person with name is not in trip already        
        if (e.store.findRecord('person_name', e.newValues.person_name)){
            Ext.MessageBox.alert('Validation Error', 'Cannot have two people with the same name in the same trip.');
            return false;
        } 
                      
        if (!e.newValues.start_date){
            Ext.MessageBox.alert('Validation Error', 'Person must have a start date.');
            return false;
        }
        if (!e.newValues.end_date){
            Ext.MessageBox.alert('Validation Error', 'Person must have a end date.');
            return false;
        }
        if (e.newValues.start_date > e.newValues.end_date){
            Ext.MessageBox.alert('Validation Error', 'End Date may not be earlier than Start Date.');
            return false;
        }
        // check that date range is inside trip date range
        if (
            e.newValues.start_date < this.currentTrip.get('start_date')
            ||e.newValues.end_date > this.currentTrip.get('end_date')
            )
        {
            Ext.MessageBox.alert('Validation Error', 'Present Date Range must be within Trip Date Range.');
            return false;     
        }
        
        // check if person has expenses that fall outside of date range
        var expenseName = this.checkExpensesForPersonOutOfDateRange(e.newValues.person_name, e.newValues.start_date, e.newValues.end_date);
        if (expenseName){
            Ext.MessageBox.alert('Validation Error', 'Cannot set date values for ' + e.newValues.person_name + '. This person has expense ' + expenseName + ' outside entered date range.');
            return false;
        }
        
    },
    
    // Expense Paids
    
    newExpensePaid: function(button){
        if (!this.currentTrip) {
            Ext.MessageBox.alert('No Trip Selected', 'Please select or create a trip.');
            return;
        }
        
        var record = new se_main.model.ExpensePaid({
            trip_id: this.currentTrip.get('trip_id'),
            expense_date: this.currentTrip.get('start_date')            
        });
        
        // get store and index
        var storeExpensePaids = Ext.data.StoreManager.lookup('ExpensePaids');
        var index = storeExpensePaids.count();
        
        // insert record into the store
        storeExpensePaids.insert(index, record);
        
        // Position the user to edit the record
        Ext.getCmp('expensepaidgrid').editingPlugin.startEdit(index, 0);
    },
    
    onEPRowEdit: function(editor, e){
        Ext.data.StoreManager.lookup('ExpensePaids').sync();
    },
       
    
    // shows the default payments and new balances
    seePayments: function(button){
            
        // load balance store - backend calculates the balances and stores in db        
        var balStore = Ext.data.StoreManager.get("Balances");        
        balStore.load({
            params: { trip_id: this.currentTrip.get('trip_id') }
        });
        
        // load peer payments store - backend calculates the payments and stores in db
        // this must happen after Balances store has loaded
        // happens automatically in BalancesStore afterLoad
                
        // load new balance store - uses the balances and peer payments that were saved to database above
        // happens automatically in peerPaymentStore afterLoad
        
    },
    
    onP2PRowDelete: function(grid, rowIndex, colIndex){
        grid.getStore().removeAt(rowIndex);
    },
    
    calcNewBalances: function(button){
        //var newBalStore = Ext.data.StoreManager.get("NewBalances");
        var p2pStore = Ext.data.StoreManager.get("PeerPayments");
        
        p2pStore.sync(); // sync p2p store - will save any p2p changes to database        
        // syncing p2p store will automatically call afterPeerPaymentsRefresh, which syncs the balance store as well
        
    },
    
    afterExpensePaidsRefresh: function (store, controller){
        // when we make changes to expense paids, balances are out of sync
        controller.setIsBalanceOutOfSync(true);  
    },
    
    // returns true if there is at least one expense for this person
    checkExpensesForPerson: function (personName){
        var expensesStore = this.getExpensePaidsStore();
        if (expensesStore.findRecord('person_name', personName)){
            return true;
        } else{
            return false;
        }
    },
    
    // returns expense name if one is found
    checkExpensesForPersonOutOfDateRange: function(personName, fromDate, toDate){
        var expensesStore = this.getExpensePaidsStore();        
        var expenseRow = expensesStore.findBy(
            function(record, id){
                if (
                    record.get('person_name') == personName
                    && (
                        record.get('expense_date') < fromDate
                        || record.get('expense_date') > toDate
                    )
                ){
                    return true;
                }
            }
        );
        if (expenseRow >= 0){
            return expensesStore.getAt(expenseRow).get('expense_name');
        }
        return null;
    },
    
    validateExpensePaidRecord: function(editor, e){        
        if (!e.newValues.expense_name || e.newValues.expense_name == ""){
            Ext.MessageBox.alert('Validation Error', 'Expense must have a name.');
            return false;
        }
        if (!e.newValues.expense_amount || e.newValues.expense_amount == ""){
            Ext.MessageBox.alert('Validation Error', 'Expense must have an amount.');
            return false;
        }
        if (!e.newValues.person_name || e.newValues.person_name == ""){
            Ext.MessageBox.alert('Validation Error', 'Expense must have a Person.');
            return false;
        }
        if (!e.newValues.expense_date){
            Ext.MessageBox.alert('Validation Error', 'Expense must have a date.');
            return false;
        }
        
        // check that date range is inside trip date range
        if (
            e.newValues.expense_date < this.currentTrip.get('start_date')
            ||e.newValues.expense_date > this.currentTrip.get('end_date')
            )
        {
            Ext.MessageBox.alert('Validation Error', 'Expense Date must be within Trip Date Range.');
            return false;
        }
        
    },
    
    // Balances
    
    // after "Balances Before Actions" is loaded, we also load "Peer Payments" store/grid. 
    afterBalancesRefresh: function (store, controller){
        if (store.getCount() > 0){
            var peerPaymentsStore = Ext.data.StoreManager.get("PeerPayments");
            var controller = se_main.app.getController('Main');
            var trip_id = controller.currentTrip.get('trip_id');
            peerPaymentsStore.load({
                params: { 
                    trip_id: trip_id,
                    set_defaults: true
                }
            });
            
            // balances are now in sync
            controller.setIsBalanceOutOfSync(false);
        }
        
        
    },
    
    // after "Peer Payments" grid is refreshed, we also load "Balance After Actions" store/grid
    afterPeerPaymentsRefresh: function (store) {
        var newBalStore = Ext.data.StoreManager.get("NewBalances");
        if (store.getCount() > 0){
            var trip_id = store.getAt(0).get('trip_id');
            newBalStore.load({
                params: { trip_id: trip_id }
            });
        } else{
            newBalStore.loadData([],false);
        }
    },
    
    // sets the button on the peer payment grid to enabled if balances in sync, disabled otherwise
    setPeerPaymentButtonsEnabled: function(){        
        Ext.getCmp('btnNewPayment').setDisabled(this.isBalanceOutOfSync);
        Ext.getCmp('btnCalcNewBalances').setDisabled(this.isBalanceOutOfSync);        
    },
    
    // should always be setter for boolean isBalanceOutOfSync
    setIsBalanceOutOfSync: function(value){
        this.isBalanceOutOfSync = value;
        this.setPeerPaymentButtonsEnabled();
        
        if (value == true){
            // if we are out of sync, clear balances/payments panel
            this.clearBalancesAndPayments();
        }
    },
    
    newPayment: function(button){
        if (!this.currentTrip) {
            Ext.MessageBox.alert('No Trip Selected', 'Please select or create a trip.');
            return;
        }
        
        var record = new se_main.model.PeerPayment({
            trip_id: this.currentTrip.get('trip_id'),
            is_active: true
        });
        
        // get store and index
        var storePeerPayments = Ext.data.StoreManager.lookup('PeerPayments');
        var index = storePeerPayments.count();
        
        // insert record into the store
        storePeerPayments.insert(index, record);
        
        // Position the user to edit the record
        Ext.getCmp('peerpaymentgrid').editingPlugin.startEdit(index, 0);
    },

});
