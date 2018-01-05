angular
    .module('HolaSpanishWorld')
    .controller('AddLessonController', AddLessonController);

function AddLessonController($uibModalInstance, lessonDate, currentUser, lesson, user) {
    var vm = this;
    var lessonMoment = moment(lessonDate);

    vm.date = lessonDate.format('ddd MMM D YYYY');
    vm.start = lessonDate.format('h:mm a');
    vm.length = 60;
    vm.type = 'Group';
    vm.instructors = '';

    if(currentUser.type == 'instructor'){
        console.log(currentUser);
        vm.instructor = currentUser._id;
        vm.disableInstructor = true;
    }else{
        user.getInstructors().then(function(response) {
            vm.instructors = response;
            console.log(vm.instructors);
        }, function(response){
            console.log(response);
        });
        console.log(vm.instructors);
    }
    
    vm.onSubmit = function() {
        //console.log(vm.form.length);
        if(!vm.disableInstructor && vm.form.instructor.$invalid){
            vm.errorMessage = 'Instructor is required';
            return;
        }

        // TODO validation
        var fields = {
            instructor: vm.instructor,
            description: vm.description,
            start: lessonDate,
            end: moment(lessonDate).add(vm.length, 'minutes'),
            type: vm.type
        }
        lesson.addLesson(fields).then(function () {
            $uibModalInstance.close('success');
        }, function() {
            vm.errorMessage = response;
        });
    }

    vm.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    }
}
