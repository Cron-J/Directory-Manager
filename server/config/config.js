module.exports = {
    server: {
        
            host: '0.0.0.0',
            port: 8000
    },
    database: {
        host: '127.0.0.1',
        port: 27017,
        db: 'directory-db',
        username: '',
        password: ''
    },
    // map: {
    //     header1 : 'Tenants',
    //     header2 : 'Global',
    //     type1   : 'Export-files',
    //     type2   : 'Import-files',
    //     type3   : 'Product-files',
    //     type4   : 'Export-formats',
    //     type5   : 'Import-formats',
    //     type6   : 'logs'
    // }   

    map: {
        header1 : 'FolderA',
        header2 : 'FolderB',
        type1   : 'FolderC',
        type2   : 'FolderD'
    } 
};
