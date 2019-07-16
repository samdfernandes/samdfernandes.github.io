


const handleData = (data) => {
    
let simpleData = data._embedded['city:search-results'][0];

let cityName = simpleData.matching_full_name ;

const $cityTitle = $('<h2>');
$cityTitle.text(cityName);
console.log($cityTitle);

$('#city-section').removeClass('hidden')

$('.jumbotron').after($cityTitle);

let geoLink = simpleData['_links']['city:item']['href']

console.log(data);//shows city data
console.log(cityName); //logs city name
console.log(geoLink);//logs geotag link

const useGeoData = (data) => {
    let geoNameId = 5391959;
    let urban_areaLink = `data._links['city:urban_area']`
    console.log(urban_areaLink);
    }
$.ajax({url: urban_areaLink}).then(setTimeout(3000, useGeoData))
    
}



$('.submit-btn').on('click', (event) =>{
    event.preventDefault();
    const city = $('.text-box').val().toLowerCase();
    console.log(city);
    
    const endpoint = `https://api.teleport.org/api/cities/?search=${city}&limit=1`
    $.ajax({url: endpoint}).then(handleData)
})

///// Get Scores /////

// https://api.teleport.org/api/urban_areas/slug:san-francisco-bay-area/scores/
// example of data.categories (extracted from categories array)
// {
//     "color": "#f3d630",
//     "name": "Cost of Living",
//     "score_out_of_10": 2.618
//   }
// `https://api.teleport.org/apicities/?search=${cityname}&embed=city%3Asearch-results%2Fcity%3Aitem%2Fcity%3Aurbanarea%2Fua%3Ascores`

//// Get Photos ///////
// `https://api.teleport.org/api/urban_areas/slug:san-francisco-bay-area/images`

//// API Reference //////

