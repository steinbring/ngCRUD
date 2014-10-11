var myApp = angular.module("myApp",[]);

// The modal stuff
myApp.directive('modalDialog', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
  };
});

myApp.controller('RecordsCtrl', function($scope, $http){
	// Actually fetch the feed
    $http.get('data/getAll.php').success(function (data) {
        $scope.records = data;

        // We need to be able to hold the array index after sorts, so we can target individual records and $index doesn't work well with paging, so ...
        for (var i = 0; i < $scope.records.length; i++) {
            $scope.records[i].index = i;
        }
    });

    // Default the targetRecord
    $scope.targetRecord = {
        'id': -1,
        'fname': '',
        'lname': '',
        'address': '',
        'city': '',
        'state': '',
        'zip': '',
        'occupation': '',
        'email': '',
        'website': ''
    };

    // Pagination settings
	$scope.currentPage = 0;
    $scope.pageSize = 5;
    $scope.numberOfPages=function(){
        return Math.ceil($scope.records.length/$scope.pageSize);                
    };

    // Modal Stuff
    $scope.modalShown = false;
    $scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
    };

    $scope.sort = {
        column: '',
        descending: false
    };   

    $scope.changeSorting = function(column) {

        var sort = $scope.sort;

        if (sort.column == column) {
            sort.descending = !sort.descending;
        } else {
            sort.column = column;
            sort.descending = false;
        }
    };

    $scope.deleteRecord = function(id){
    	swal({
		  title: "Are you sure?",
		  text: "You will not be able to undelete this record.",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "Yes, delete it"
		}, 
		function(){
			// Delete the item from the database
			$http.get('data/deleteItem.php?id='+$scope.records[id].id).success(function (data) {
				// Was the DB delete a success?
				if (data) {
					// Delete the item from the local array variable
					$scope.records.splice(id, 1);
				}
				else
					alert('Error!');
			});
		});
    };
    
    $scope.editRecord = function(record){
        $scope.resetModal();
        $scope.targetRecord = record;
        $scope.toggleModal();
    };
    
    $scope.newRecord = function(){
        $scope.resetModal();
        $scope.toggleModal();
    };

    $scope.saveRecord = function(){
        form = document.getElementById("modalForm");
        var record = {};
        for(i =0; i < form.length; i++) 
        {
            if(form[i].name)
                record[form[i].name] = form[i].value;
        }

        // Is it a preexisting record?
        if (record.index !== ''){
            // Process a record 'edit'
            $scope.records[Number(record.index)] = record;
        }else{
            // Process a record 'creation'
            record.index = $scope.records.length;
            $scope.records.push(record);
        }
        $scope.closeModal();
    };

    $scope.resetModal = function(){
        document.getElementById("modalForm").reset();
        $scope.targetRecord = {
            'id': -1,
            'fname': '',
            'lname': '',
            'address': '',
            'city': '',
            'state': '',
            'zip': '',
            'occupation': '',
            'email': '',
            'website': ''
        };
    };

    $scope.closeModal = function(){
        $scope.resetModal();
        $scope.toggleModal();
    };
});

// A filter for 'startFrom'
myApp.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
	}
});
