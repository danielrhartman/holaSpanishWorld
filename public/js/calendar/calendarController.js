angular.module('lessonCalendar', []);

angular
	.module('lessonCalendar')
	.controller('CalendarController', CalendarController);

function CalendarController($scope, $compile, $timeout, $uibModal, user, uiCalendarConfig, lesson) {

    /* alert on eventClick */
    $scope.onEventClick = function(lesson, jsEvent, view){
        //console.log(JSON.stringify(lesson));
        var start = moment(new Date(lesson.start));
        var end = moment(new Date(lesson.end));
        $scope.selected = lesson;
		$scope.selected.future = false;
        if(lesson.start.isAfter(moment())){
			$scope.selected.future = true;
		}
        $scope.selected.date = start.format('ddd MMM D, YYYY');
        $scope.selected.startString = start.format('h:mm a');
        $scope.selected.endString = end.format('h:mm a');
        return false;
    };
    
    lesson.getUserPrivateLessons().then(function(response) {
        $scope.bookedPrivateLessons = response;
    }, function(response) {
        console.log(response);
    });

    
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };

    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalendar = function(calendar) {
      $timeout(function() {
        if(uiCalendarConfig.calendars[calendar]){
          uiCalendarConfig.calendars[calendar].fullCalendar('render');
        }
      });
    };
     /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) {
        element.attr({'tooltip': event.title,
                      'tooltip-append-to-body': true});
        $compile(element)($scope);
    };
	
	$scope.dayClick = function(date, jsEvent, view) {
		if(date.isBefore(new Date)){
			console.log('before');
            return;
		}
		currentUser = {};
		user.getUser().then(function(response) {
            console.log('future');
			if(response.data.type == 'admin' || response.data.type == 'instructor') {
                console.log('admin/teach');
				var addLessonModal = $uibModal.open({
					templateUrl: './addLesson.html',
					controller: 'AddLessonController',
					controllerAs: 'lesson',
					resolve: {
						lessonDate: date,
						currentUser: response.data
					}
			});

			addLessonModal.result.then(function() {
				uiCalendarConfig.calendars['myCalendar'].fullCalendar('refetchEvents');
			});
			}
        });
	};

    /* config object */
    $scope.uiConfig = {
    	calendar:{
			defaultView: 'agendaWeek',
			timezone: 'local',
			height: 600,
			editable: false,
			allDaySlot: false,
			header:{
				left: 'title prev,next',
				center: '',
				right: ''
        	},
        	eventClick: $scope.onEventClick,
			eventRender: $scope.eventRender,
	 		dayClick: $scope.dayClick
      	}
    };

    $scope.bookedPrivate = {
        color: '#3E92CC',
        events: function(start, end, timezone, callback) {
            var events = lesson.getUserPrivateLessons().then(function(response) {
                callback(response);
            });
        }
    };

    $scope.openPrivate = {
        color: '#298D6C',
        events: function(start, end, timezone, callback) {
            var events = lesson.getOpenPrivateLessons().then(function(response) {
                callback(response);
            });
        }
    };

    $scope.group = {
        color: '#f38f22',
        url: '/api/lessons/group'
    };

    /* event sources array*/
    $scope.eventSources = [$scope.group, $scope.bookedPrivate, $scope.openPrivate];
}
