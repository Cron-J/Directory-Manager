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
        export_files    : 'old-files/Export-files_rename',
        import_files    : 'Import-files',
        productFiles    : 'Product-files',
        export_formats  : 'Export-formats',
        import_formats  : 'Import-formats',
        logs            : 'logs',
        Output          : 'some-folder/Out'
    }   
};
