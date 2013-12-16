Ext.define('App.view.videos.Details', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.field.Text',
        'Ext.Button'
    ],
    
    xtype: 'videoDetails',
    bodyPadding: 20,
    buttonAlign: 'left',
    defaultType: 'textfield',
    autoScroll: true,
    fieldDefaults: {
        labelWidth: 50,
        msgTarget: 'side'
    },
    title: 'Video - Details',
    items: [
        {
            xtype: 'button',
            ui: 'plain',
            margin: '0 0 10 0',
            text: '&#171; Back to List',
            href: '#videos',
            hrefTarget: '_self'
        },
        {
            xtype: 'button',
            id: 'video-edit-btn',
            action: 'edit',
            margin: '0 0 10 10',
            text: 'Edit',
            hidden: true,
            hrefTarget: '_self'
        },
        // {
        //     xtype: 'box',
        //     id: 'videoTpl',
        //     autoEl: {
        //         tag: 'div',
        //         cls: 'video-details-panel',
        //         html: Ext.applyIf(this, {
        //             tpl: Ext.create('Ext.XTemplate',
        //                 '<div class="inline-block region">'+
        //                     '<div class="row">{data.title}</div>'+
        //                     '<div class="row">{data.subTitle}</div>'+
        //                     '<div class="row">{data.notes}</div>'+
        //                 '</div>'+
        //                 '<div class="inline-block region">'+
        //                     '<video width="640" height="360" preload="" controls=""><source src="{data.uri}?t='+ new Date().getTime() +'"></video>'+
        //                 '</div>')
        //         })
        //     }
        // }
    ],

    initComponent: function() {
        // TODO: Store templates in a separate directory...
        // http://www.marcusschiesser.de/2009/03/putting-extjs-templates-in-separate-files/
        Ext.applyIf(this, {
            tpl: Ext.create('Ext.XTemplate',
                '<div class="video-details-panel">'+
                    '<div class="inline-block region">'+
                        '<div class="row">{data.title}</div>'+
                        '<div class="row">{data.subTitle}</div>'+
                        '<div class="row">{data.notes}</div>'+
                    '</div>'+
                    '<div class="inline-block region">'+
                        '<video width="640" height="360" preload="" controls=""><source src="{data.uri}?t='+ new Date().getTime() +'"></video>'+
                    '</div>'+
                '</div>')
        });
        this.callParent(arguments);
    }

});
