angular.module('open-data').component('about', {
    templateUrl: '/javascript/components/about/about.html',
    controller: 'AboutController',
});


angular.module('open-data').controller('AboutController', function ($scope, $location, $routeParams, $http) {
    
    $scope.members = [
        {name: 'Thomas Lam', role: 'Project Manager', url: 'member-1.jpg', linkedin: 'https://www.linkedin.com/in/thomas-lam-882269b9/'  },
        {name: 'Edita Tamasauskaite', role: 'Front End Developer', url: 'member-2.jpg', linkedin: 'https://www.linkedin.com/in/edita-tamasauskaite/' },
        {name: 'Marcos Tam', role: 'Front End Developer', url: 'member-3.jpg', linkedin: 'https://www.linkedin.com/in/marcos-tam-aa415ab9/' },
        {name: 'George Jensen', role: 'Full Stack Developer', url: 'member-4.jpg', linkedin: 'https://www.linkedin.com/in/georgejensen/' },
        {name: 'Richard Cook', role: 'Full Stack Developer', url: 'member-5.jpg', linkedin: 'https://www.linkedin.com/in/richard-cook-29ab3549/' },
    ]
    
    $scope.sources = [
        {name: 'GOV.UK', url: 'data-source-4.png'},
        {name: 'The National Archives', url: 'data-source-2.png'},
        {name: 'Office for National Statistics', url: 'data-source-1.png'},
        {name: 'Google Places API', url: 'data-source-5.png'},
        {name: 'data.police.uk', url: 'data-source-3.png'},
    ]
    
    $scope.viewLinkedIn = function (address) {
        let win = window.open(address, '_blank');
    }
    
});