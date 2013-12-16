Ext.define('App.view.videos.Index', {
    extend: 'Ext.grid.Panel',

    //width: 700,
    //height: 500,
    title: 'Video List',
    cls: 'video-list-panel',
    xtype: 'videoList',
    store: 'Videos',

    //disableSelection: true,
    //loadMask: true,

    // Paging bar on the bottom
    // bbar: Ext.create('Ext.PagingToolbar', {
    //     store: 'Videos'
    // }),

    initComponent: function() {
        this.columns = [{
            text: 'Thumbnail',
            dataIndex: 'thumbnail',
            renderer: function(val) {
                return '<img src="'+ val +'" class="video-thumb" />';
            }
        },{
            text: 'URI',
            //width: '150',
            dataIndex: 'uri'
        },{
            text: 'Title',
            dataIndex: 'title'
        },{
            text: 'Sub Title',
            dataIndex: 'subTitle'
        },{
            text: 'Notes',
            dataIndex: 'notes'
        },{
            text: 'Uploaded By',
            dataIndex: 'userLabel'
        },{
            text: 'Created',
            dataIndex: 'created'
        },{
            text: 'Modified',
            dataIndex: 'modified'
        }];
        this.dockedItems = [{
            xtype : 'pagingtoolbar',
            store : 'Videos',
            dock : 'bottom',
            displayInfo : true
        }];
        this.callParent();
    }

});