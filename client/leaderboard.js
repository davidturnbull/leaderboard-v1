// "Catch" the selection of data from the Meteor.publish function
  Meteor.subscribe('thePlayers');

  // Helper functions execute code within templates
  Template.leaderboard.helpers({
    'player': function(){

      // Get the ID of the current user
      var currentUserId = Meteor.userId();

      // Retrieve data that belongs to the current user
      return PlayersList.find({createdBy: currentUserId},
                              {sort: {score: -1, name: 1}});

    },
    'selectedClass': function(){

        // Get the ID of the player being iterated through
        var playerId = this._id;

        // Get the ID of the player that's been clicked
        var selectedPlayer = Session.get('selectedPlayer');

         // Do these IDs match?
        if(playerId == selectedPlayer){

            // Return a CSS class
            return "selected"

        }

    },
    'showSelectedPlayer': function(){

      // Get the ID of the player that's been clicked
      var selectedPlayer = Session.get('selectedPlayer');

      // Retrieve a single document from the collection
      return PlayersList.findOne(selectedPlayer)

    }
  });

  // Events trigger code when certain actions are taken
  Template.leaderboard.events({
      'click .player': function(){

          // Retrieve the unique ID of the player that's been clicked
          var playerId = this._id;

          // Create a session to store the unique ID of the clicked player
          Session.set('selectedPlayer', playerId);

      },
      'click .increment': function(){

        // Get the ID of the player that's been clicked
        var selectedPlayer = Session.get('selectedPlayer');

        // Call a Meteor method and pass through selected player's ID and a value to increment by
        Meteor.call('modifyPlayerScore', selectedPlayer, 5);

      },
      'click .decrement': function(){

        // Get the ID of the player that's been clicked
        var selectedPlayer = Session.get('selectedPlayer');

        // Call a Meteor method and pass through selected player's ID and a value to decrement by
        Meteor.call('modifyPlayerScore', selectedPlayer, -5);

      },
      'click .remove': function(){

        // Get the ID of the player that's been clicked
        var selectedPlayer = Session.get('selectedPlayer');

        // Call a Meteor method and pass through selected player's ID
        Meteor.call('removePlayerData', selectedPlayer);

      }
  });

  Template.addPlayerForm.events({
    'submit form': function(event){

        // Prevent the browser from applying default behaviour to the form
        event.preventDefault();

        // Get the value from the "playerName" text field
        playerNameVar = event.target.playerName.value;

        // Call a Meteor method and pass through a name
        Meteor.call('insertPlayerData', playerNameVar);

    }
  });