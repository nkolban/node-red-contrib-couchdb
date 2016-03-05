/**
 * Copyright 2015 Neil Kolban.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
 
/**
 * Implement a CoachDB accessor within a Node-RED environment.
 * The configuration parameters for the node are:
 * * serverUrl - The URL to reach the CouchDB server ... eg. http://localhost:5984
 * * database - The name of the database
 * * retrievalType - How we should retrieve a document
 *   * byId
 *   * byView
 * * designDoc - The name of the design document
 * * viewName - The name of a view
 * This module makes extensive use of the project called "dscape/nano"
 * found on Github at:
 * 
 * https://github.com/dscape/nano
 * 
 * 
 */
module.exports = function(RED) {
/**
 * The CouchDBNode provides the implementation for retrieving data from the CouchDB
 * database.
 */
  function CouchDBNode(config) {
    
    var thisNode = this;
    var nano = require("nano")(config.serverUrl);
    var db = nano.use(config.database);
    
    this.on("input", function(msg) {
      // Process the request here
      if (config.retrievalType == "byId") {
        db.get(msg.payload, function(err, body) {
          if (!err) {
            msg.payload = body;
            thisNode.send(msg);
          }
        }); // End of db.get
      } // End of byId
      else if (config.retrievalType == "byView") {
        db.view(config.designDoc, config.viewName, {
          key: msg.payload,
          include_docs: true
        }, function(err, body) {
          if (!err) {
            msg.payload = body.rows;
            thisNode.send(msg);
          }
        }); // End of db.view
      } // End of byView
    }); // End of on "input"
    RED.nodes.createNode(thisNode, config);
  } // End of CouchDBNode definition

/**
 * Insert data into the database
 * * serverUrl - The URL to reach the CouchDB server ... eg. http://localhost:5984
 * * database - The name of the database
 */
  function CouchDBInsertNode(config) {
    var thisNode = this;
    var nano = require("nano")(config.serverUrl);
    var db = nano.use(config.database);
    this.on("input", function(msg) {
      // Process the insertion request here
      db.insert(msg.payload, function(err, body) {
        // Nothing to do on the callback
        if (err) {
          thisNode.warn("[" + config.type + ":" + config.name + "]: Error: " + JSON.stringify(err));
        }
      }); // End of db.insert
    }); // End of on "input"
  } // End of CouchDBInsertNode
  
  RED.nodes.registerType("couchdb", CouchDBNode);
  RED.nodes.registerType("couchdbinsert", CouchDBInsertNode);
} // End of module.exports
// End of file