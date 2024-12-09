const API_URL = `http://api.weatherapi.com/v1/current.json?key=deb33e8e2b734e5aabe150423240812`;


const city = document.getElementById('city').addEventListener('change', function() {
    var selectedCity = this.options[this.selectedIndex].text;
    console.log('Selected city:', selectedCity);
});


