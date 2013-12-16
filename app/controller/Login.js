Ext.define('App.controller.Login', {
    extend: 'Ext.app.Controller',
    
    init: function() {
        this.control({
            'loginform': {
                login: this.login
            }
        });
    },
    
    index: function() { },

    login: function(loginDialog, loginForm, loginCredentials) {
        var self = this;

        // Authenticate
        Ext.Ajax.request({
            url: 'services/v1/login',
            headers: { 'Content-Type': 'application/json' },
            jsonData: { username: loginCredentials.username, password: loginCredentials.password },
            // params: {
            //     username: loginCredentials.username,
            //     password: loginCredentials.password
            // },
            success: function(response) {

                //var jsonResp = Ext.util.JSON.decode(response.responseText);
                var data = Ext.decode(response.responseText);

                //if (data.firstName) {
                if (data.IsSuccess) {

                    // Instantiate user info in global scope for easy referencing
                    // App.User = Ext.create(
                    //     'App.user.Profile', self._getUserInfo());

                    // Destroy the login dialog
                    loginDialog.destroy();

                    //Ext.Msg.alert('Login Successful');
                    // Ext.Msg.alert("Login Successful",
                    //     Ext.String.format("Welcome {0} {1}",
                    //     App.User.getFirstName(),
                    //     App.User.getLastName());
                    // );

                    App.settings.userInfo.getUserInfoSync();
                    var viewport = Ext.getCmp('viewport');
                    viewport.updateNavToolbar();
                    Ext.Router.redirect('');

                } else {
                    Ext.Msg.alert("Invalid credentials","You entered invalid credentials.", function() {
                        loginForm.getForm().reset();
                    })
                }
            }
        });
    },

    logout: function() {
        Ext.Ajax.request({
            //url: App.settings.baseServiceUrl + 'logout',
            url: 'services/v1/logout',
            async: false,
            success: function(/*response, opts*/) {
                App.settings.userInfo.reset();
                var viewport = Ext.getCmp('viewport');
                viewport.updateNavToolbar();
                Ext.Router.redirect('login');
            }
            // failure: function(response, opts) {
            //     // TODO:
            // }
        });
    }

});