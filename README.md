# CouchDB nodes Node-RED
Accessor nodes for Apache CouchDB from Node-RED.

## Installation
Use `npm install node-red-contrib-couchdb` to install.

## Usage
This package provides some nodes that can be used in conjunction with an Apache CouchDB.  Specifically,
we can insert new documents and query/retrieve existing documents.  For the insertion, we supply the
JavaScript document in the `msg.payload` property which could include the `_id` property to
provide the identity.  If we are updating the document, then a valid `_rev` property should also be present.

For a query/retrieval, we have the choice of either retrieving by id value or by a design document view search.
For an id, specify the `_id` value as the `msg.payload`.  For a design document view retrieval, supply
the search key in `msg.payload`.

In both cases, the document is returned as the output `msg.payload`.

To connect to the database, the URL for the CouchDB server should be supplied along with the database name for
the database to be accessed. 


## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## History
* 2015-03-04 - First release

## Credits
Neil Kolban

## License
Apache 2.0