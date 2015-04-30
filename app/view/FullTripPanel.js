Ext.define('se_main.view.FullTripPanel', {
    extend: 'Ext.Panel',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],
    
    xtype: 'fulltrippanel',

    layout: {
        type: 'border'
    },
    
    title: 'Trips',    

    items: [    
    {
        region: 'center',
        layout: 'border',
        border: false,
        split: true,        
        
        items:[
        {
            region: 'north',
            //layout: 'border',
            height: 200,
            title: 'Participants',
            xtype: 'personpresentgrid'
        },
        {
            title: 'Expenses',
            region: 'center',
            xtype: 'expensepaidgrid'        
        }
        ]
    },
    {
        region: 'east',
        layout: 'border',
        border: false,
        split: true,        
        width: 360,
        
        items:[     
        {
            title: 'Balance Before Actions',
            region: 'north',
            xtype: 'balancegrid'  
        }                      
        ,{
            title: 'Peer Payments',
            region: 'center',
            xtype: 'peerpaymentgrid'           
        }
        ,
        {
            title: 'Balance After Actions',
            region: 'south',
            xtype: 'newbalancegrid'
        }
        ] 
    }
    
    ]    
});