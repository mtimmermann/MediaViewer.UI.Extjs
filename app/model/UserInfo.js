Ext.define('App.model.UserInfo', {
    extend: 'Ext.data.Model',
    fields: ['id', 'email', 'firstName', 'lastName', 'roles', 'created', 'modified'],
    isLoggedIn: false,
    idProperty: 'id',

    // proxy: {
    //     type: 'rest',
    //     //type: 'json',
    //     url : 'services/v1/user'
    // },

    getUserInfoSync: function() {
        var self = this;
        Ext.Ajax.request({
            //url: App.settings.baseServiceUrl + 'user',
            url: 'services/v1/user',
            async: false,
            success: function(response/*, opts*/) {
                self.data = Ext.decode(response.responseText);
                self.isLoggedIn = true;
            },
            failure: function(response, opts) {
                self.isLoggedIn = false;
            }
        });
    },

    reset: function() {
        this.data = {};
        this.isLoggedIn = false;
    },

    isUserInRole: function(roles) {
        for (var i=0; i<roles.length; i++) {
            //if (Ext.Array.contains(this.getRoles(), roles[i])) {
            if (Ext.Array.contains(this.data.roles, roles[i])) {
                return true;
            }
        }
        return false;;
    }

});