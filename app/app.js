/*
 * == Old Sencha Command (v <= 2)
 *
 * You need to specify the path for Ext.ux.Router here using Ext.Loader.setConfig
 *
 * Ext.Loader.setConfig({
 *     enabled: true,
 *     paths: {
 *         'Ext.ux.Router': '../../Router.js'
 *     }
 * });
 *
 * == New Sencha Command 3+
 *  
 * Add the path to your .sencha/app/sencha.cfg. Notice that .sencha folder is a hidden folder.
 *
 *      app.classpath=${app.dir}/app,${app.dir}/../../Router.js
 *
 * After that run "sencha app refresh" to refresh the dependencies on bootstrap.js.
 * Ext.ux.Router will be added over there and you can simply use it.
 */

Ext.application({
    name: 'App',
    //autoCreateViewport: true,
    autoCreateViewport: false,
    
    requires: [
        'Ext.ux.Router', // Require the UX
        'Ext.window.MessageBox'
        //'App.model.UserInfo'
    ],

    stores: [
        'Videos'
    ],
    
    controllers: [
        'Home',
        'Videos'
    ],
    
    views: [
        'videos.Index',
        'videos.Details',
        'videos.Edit',
        'login.Index'
    ],
    
    /**
     * The default is true. Optionally, this can be set to false
     * in order to customize Ext.ux.Router.init() and manualy invoke.
     */
    enableRouter: true,
    
    /**
     * Route definitions
     */
    routes: {
        '/'               : 'videos#index',
        'videos'          : 'videos#index',
        'videos/:id'      : 'videos#details',
        'videos/edit/:id' : 'videos#edit',
        'login'           : 'login#index',
        'logout'          : 'login#logout'
    },

    launch: function() {

        //console.log('launch');

        App.settings = { userInfo: Ext.create('App.model.UserInfo', {}) };
        App.settings.userInfo.getUserInfoSync();

        // Load main UI
        Ext.create("App.view.Viewport");

        var viewport = Ext.getCmp('viewport');
        viewport.updateNavToolbar();

        /**
         * Ext.ux.Router provides some events for better controlling
         * dispatch flow
         */
        Ext.ux.Router.on({
            
            routemissed: function(token) {
                Ext.Msg.show({
                    title:'Error 404',
                    msg: 'Route not found: ' + token,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            },
            
            beforedispatch: function(token, match, params) {
                console.log('beforedispatch ' + token);
            },
            
            /**
             * Using the dispatch event to render the view
             * based on the token. Each route points to a controller and action. 
             * Using these 2 information to get the view and render.
             */
            dispatch: function(token, match, params, controller) {
                var view, viewClass, action,
                    viewport    = Ext.getCmp('viewport'),
                    target      = viewport.down('#viewport-target'),
                    navToolbar  = viewport.down('#main-nav-toolbar');

                // Adjust controller and action names    
                action      = Ext.String.capitalize(match.action);
                controller  = match.controller.charAt(0).toLowerCase() + match.controller.substr(1);
    
                // Try to get the view by controller + action names
                viewClass   = Ext.ClassManager.get('App.view.' + controller + '.' + action);
    
                if (viewClass) {
        
                    // Create view
                    view = Ext.create(viewClass, {
                        border: false
                    });
        
                    // Clear target and add new view
                    target.removeAll();
                    target.add(view);

                    // Adjust top toolbar
                    if (navToolbar.child('#' + controller)) {
                        navToolbar.child('#' + controller).toggle(true);
                    }
                }
            }
        });
    }
});