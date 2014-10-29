// Transmit a selection of data into the ether
  Meteor.publish('thePlayers', function(){

    // Get the ID of the current user
    var currentUserId = this.userId;

    // Return players "owned" by the current user
    return PlayersList.find({createdBy: currentUserId})

  });

  // Methods execute on the server after being triggered from the client
  Meteor.methods({
    'insertPlayerData': function(playerNameVar){

        // Get the ID of the current user
        var currentUserId = Meteor.userId();

        // Insert the data of a new player
        PlayersList.insert({
            name: playerNameVar,
            score: 0,
            createdBy: currentUserId
        });

    },
    'removePlayerData': function(selectedPlayer){

      // Remove a document from the collection
      PlayersList.remove(selectedPlayer);

    },
    'modifyPlayerScore': function(selectedPlayer, scoreValue){

      // Update a document and either increment or decrement the score field
      PlayersList.update(selectedPlayer, {$inc: {score: scoreValue} });

    }
  });