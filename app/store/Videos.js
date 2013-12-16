Ext.define('App.store.Videos', {
    extend: 'Ext.data.Store',
    requires: 'App.model.Video',
    model: 'App.model.Video',
    // fields: [
    //     'id', 'uri', 'thumbnail', 'fileId', 'title', 'subTitle', 'notes'
    // ],
    //autoLoad: {start: 0, limit: 2},
    autoLoad: {start: 0, pageSize: 8},
    pageSize: 8,
    remoteSort: true,
    sorters: [{
        property : 'uri',
        direction: 'asc'
    }],
    proxy: {
        //type: 'json',
        type: 'rest',
        url: '/services/v1/videos',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'totalRecords'
        },
        // sends single sort as multi parameter
        //simpleSortMode: true

        pageParam: 'page',
        startParam: 'start',
        limitParam: 'pageSize',
        sortParam: 'sort_by'
    }
    // ,sorters: [{
    //     property: 'lastpost',
    //     direction: 'DESC'
    // }]

});