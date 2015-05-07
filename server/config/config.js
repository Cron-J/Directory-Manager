module.exports = {
    server: {
        
            host: '0.0.0.0',
            port: 8001
    },
    database: {
        host: '127.0.0.1',
        port: 27017,
        db: 'directory-db',
        username: '',
        password: ''
    },
    map: {
        tenants         : 'Tenants',
        global          : 'Global',
        export_files    : 'Export-files',
        import_files    : 'Import-files',
        product_files   : 'Product-files',
        export_formats  : 'Export-formats',
        import_formats  : 'Import-formats',
        logs            : 'logs'
    }   

    // map: {
    //     header1 : 'FolderA',
    //     header2 : 'FolderB',
    //     type1   : 'FolderC',
    //     type2   : 'FolderD'
    // } 
};
