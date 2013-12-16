Ext.define('App.view.Viewport', {
    renderTo: Ext.getBody(),
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.layout.container.Border',
        'Ext.toolbar.Toolbar',
        'Ext.panel.Panel'
    ],
    
    id: 'viewport',
    layout: 'border',

    items: [{
        xtype: 'toolbar',
        region: 'north',
        itemId: 'main-nav-toolbar',
        defaults: {
            scale: 'large',
            padding: '0 20',
            toggleGroup: 'main-nav',
            allowDepress: false
        },
        items: [{
            text: 'Media Viewer',
            itemId: 'home',
            pressed: true
        },{
            text: 'Videos',
            itemId: 'videos'
        }]
    },{
        xtype: 'container',
        itemId: 'viewport-target',
        region: 'center',
        layout: 'fit'
    }],

    initComponent: function() {
        this.items[0].items.push({
            text: 'Sign Out',
            itemId: 'logout',
            id: 'navbar-logout'
            //hidden: !isLoggedIn
        });
        this.items[0].items.push({
            text: 'Sign In',
            itemId: 'login',
            id: 'navbar-login'
            //hidden: isLoggedIn
        });
        Ext.apply(this, {items: this.items});

        this.callParent(arguments);
        //this._afterInitComponent();
    },

    updateNavToolbar: function() {
        var isLoggedIn = App.settings.userInfo.isLoggedIn || false,
            login = Ext.getCmp('navbar-login'),
            logout = Ext.getCmp('navbar-logout');
        if (isLoggedIn) {
            login.getEl().hide();
            logout.getEl().show();
        } else {
            logout.getEl().hide();
            login.getEl().show();
        }
        //this.doLayout();
    }

    // _afterInitComponent: function() {
    //     this.updateNavToolbar();
    // }

});