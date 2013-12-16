Ext.define('App.controller.Videos', {
    extend: 'Ext.app.Controller',

    // Refs can be setup to access different views...
    // refs: [
    //     {
    //         ref: 'VideoDetails',
    //         selector: '[xtype="videoDetails"]'
    //     }
    // ],

    _videoId: null,

    init: function() {
        this.control({
            'videoList': {
                itemclick: this.listItemClick
            },
            'videoDetails': {
                afterrender: this.detailsAfterRender
            },
            'videoEdit': {
                afterrender: this.editAfterRender
            },
            'button[action=edit]': {
                click: this.editClick
            }
        });
    },

    index: function() { },

    listItemClick: function(list, video) {
        this._videoId = null;
        Ext.ux.Router.redirect('videos/' + video.getId());
    },

    details: function(params) {
        this._videoId = params.id;
    },
    detailsAfterRender: function(detailView) {
        var video = this._getVideo(this._videoId);
        if (video) {
            detailView.loadRecord(video);

            // Show Edit button if logged in user owns asset
            if (video.data.ownerId === App.settings.userInfo.data.id) {
                Ext.get('video-edit-btn').show();
            }

            // Update the template
            detailView.update(video);

            // TODO: Setup a directory of templates...
            // var tpl = new Ext.XTemplate(
            //     '<div class="inline-block region">'+
            //         '<div class="row">{data.title}</div>'+
            //         '<div class="row">{data.subTitle}</div>'+
            //         '<div class="row">{data.notes}</div>'+
            //     '</div>'+
            //     '<div class="inline-block region">'+
            //         '<video width="640" height="360" preload="" controls=""><source src="{data.uri}?t='+ new Date().getTime() +'"></video>'+
            //     '</div>');
            //     .append(Ext.getCmp('videoTpl').el, {data: video.data});
        }
    },

    editClick: function(/*button, e*/) {
        Ext.ux.Router.redirect('videos/edit/'+ this._videoId);
    },
    edit: function(params) {
        this._videoId = params.id;
    },
    editAfterRender: function(editView) {
        var video = this._getVideo(this._videoId);
        if (video) {
            // Show Edit button if logged in user owns asset
            if (video.data.ownerId === App.settings.userInfo.data.id) {
                editView.loadRecord(video);
            } else {
                 Ext.ux.Router.redirect('videos/'+ this._videoId);          
            }
        }
    },

    _getVideo: function(id) {
        var video = Ext.getStore('Videos').getById(this._videoId);
        if (!video) {
            Ext.Ajax.request({
                url: 'services/v1/videos/'+ this._videoId,
                async: false,
                success: function(response) {
                    var json = Ext.decode(response.responseText);
                    video = Ext.create('App.model.Video', json);
                }
            });
        }
        return video;
    }
});