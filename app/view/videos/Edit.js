Ext.define('App.view.videos.Edit', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.field.Text',
        'Ext.Button'
    ],
    
    xtype: 'videoEdit',
    bodyPadding: 20,
    buttonAlign: 'left',
    defaultType: 'textfield',
    autoScroll: true,
    fieldDefaults: {
        labelWidth: 50,
        msgTarget: 'side'
    },
    title: 'Video - Edit',
    items: [{
        xtype: 'button',
        ui: 'plain',
        margin: '0 0 10 0',
        text: '&#171; Back to List',
        href: '#videos',
        hrefTarget: '_self'
    },{
        fieldLabel: 'URI',
        name: 'uri'
    },{
        fieldLabel: 'Title',
        name: 'title'
    }, {
        fieldLabel: 'Sub Title',
        name: 'subTitle'
    }, {
        fieldLabel: 'Notes',
        name: 'notes'
    }]
});
