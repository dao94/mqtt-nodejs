(function() {
  'use strict';

  angular.module('app', ['irontec.simpleChat']);

  angular.module('app').controller('Shell', Shell);

  function Shell() {

    var vm = this;

    vm.messages = [
      {
        'username': 'Matt',
        'content': 'Hi!'
      },
      {
        'username': 'Elisa',
        'content': 'Whats up?'
      }
    ];

    vm.username = 'Matt';

    vm.sendMessage = function(message, username) {
      if(message && message !== '' && username) {

        var data = {
          'username': username,
          'content': message
        };

        vm.messages.push(data);
        socket.emit('publish', {topic : 'chat', content : message, username : username});
      }
    };

    var socket = io.connect('127.0.0.1:5000');
      socket.on('connect', function () {
        socket.on('mqtt', function (msg) {
          if(msg.topic == 'chat') {
          }
        });
        socket.emit('subscribe',{topic:'chat'});
      });

  }

})();
