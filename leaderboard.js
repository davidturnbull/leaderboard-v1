
// Create a MongoDB Collection
PlayersList = new Mongo.Collection('players');

// Code that only runs on the client (within the web browser)
if(Meteor.isClient){

  // Helper functions execute code within templates
  Template.leaderboard.helpers({
    'player': function(){

        // Retrieve all of the data from the "PlayersList" collection
        return PlayersList.find()

    }
  });

  // Events trigger code when certain actions are taken
  Template.leaderboard.events({
    'click .player': function(){
      console.log("You clicked a .player element");
    }
  });

}

// Code that only runs on the server (where the application is hosted)
if(Meteor.isServer){

}