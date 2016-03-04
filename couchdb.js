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
 *   * ???
 * This module makes extensive use of the project called "dscape/nano"
 * found on Github at:
 * 
 * https://github.com/dscape/nano
 * 
 * 
 */
module.exports = function(RED) {
  function CouchDBNode(config) {
    console.log("CouchDBNode: config: " + JSON.stringify(config));
    var thisNode = this;
    var nano = require("nano")(config.serverUrl);
    var db = nano.use(config.database);
    this.on('input', function(msg) {
      // Process the request here
      db.get(msg.payload, function(err, body) {
        console.log("We got a document: " + body);
        if (!err) {
          msg.payload = body;
          thisNode.send(msg);
        }
      });
      console.log("Process message: " + JSON.stringify(msg));
    });
    RED.nodes.createNode(thisNode, config);
  } // End of couchDBNode definition
  
  RED.nodes.registerType("couchdb", CouchDBNode);
}
// End of file