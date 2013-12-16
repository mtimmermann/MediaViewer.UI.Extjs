Ext.define('App.model.Video', {
    extend: 'Ext.data.Model',
    fields: [
        'id', 'ownerId', 'uri', 'thumbnail', 'fileId', 'title', 'subTitle', 
        'notes','userLabel','created','modified'
    ],
    idProperty: 'id'
});