/*
    author : daotrancong@vccorp.vn
*/

(function() {
  'use strict';

  angular.module('app', ['irontec.simpleChat']);

  angular.module('app').controller('Shell', Shell);

  function Shell($scope) {

    var vm = this;

    vm.messages = [
      {
        'username': 'User',
        'content': 'Hi!'
      },
      {
        'username': 'Boss',
        'content': 'Whats up?'
      }
    ];

    vm.username = 'Boss';

    vm.sendMessage = function(message, username) {
      if(message && message !== '' && username) {

        var data = {
          'username': username,
          'content': message
        };

        socket.emit('publish', {topic : 'chat', content : message, username : username});
      }
    };

    var socket = io.connect('127.0.0.1:5000');
      socket.on('connect', function () {
        socket.on('mqtt', function (msg) {
          if(msg.topic == 'chat') {
            vm.messages.push(msg);
            $scope.$apply();
          }
        });
        socket.emit('subscribe',{topic:'chat'});
      });

  }

})();
