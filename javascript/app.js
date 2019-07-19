


const handleData = (data) => {

    console.log(data);
    
    
    let myData = data._embedded['city:search-results'][0];
    let cityName = myData.matching_full_name; //find the city Name in the returned object

    const $cityTitle = $('<h2>');
    $cityTitle.text(cityName) //prints the city name on the webpage

    $('#city-section').removeClass('hidden')
    $('#title').append($cityTitle);

    const geoLink = myData['_links']['city:item']['href'] //retrieves geographical information needed for additional api

    //////////////////////////////////////////////////////////////////////
    ////// FETCHING GEODATA INFORMATION TO DISPLAY OTHER DETAILS /////////
    //////////////////////////////////////////////////////////////////////

    const useGeoData = (geodata) => {

        ///establish an if statement for the case that there may not be a city:urban_area field.

        if(geodata._links['city:urban_area'] === undefined) {
            console.log('yup, it is undefined...');
            
            const $urban = $('<p>')
            $urban.html(`There currently is no information available for ${cityName}. <br><br>Try looking for a bigger city nearby to get some interesting insight.`)
          
            $('#title').append($urban)

            const $scores = $('<h4>')
            $scores.text('City Scores')

            $('#city-scores').append($scores)

            const $scoresExcuse = $('<p>')
            $scoresExcuse.html(`Again, sorry, there is no scores data for ${cityName}`)

            $scoresExcuse.css('font-size', '.85em')

            $('#city-scores').append($scoresExcuse)


        }
     
       

        let urban_areaLink = geodata._links['city:urban_area']['href'] //find the nearest urban area to display info
        let urbanAreaName = geodata._links['city:urban_area']['name']

        


        // console.log(urban_areaLink);
        // console.log(`${urban_areaLink}images`);
        
        /////////////////////////////////////////////////////////////////
        ///// remove default embedded map and replace with new iframe////
        /////////////////////////////////////////////////////////////////

        const lat = geodata.location.latlon.latitude
        const lon = geodata.location.latlon.longitude
        console.log(`lat is ${lat} lon is ${lon}`);

        $('#map').empty()
        $('#map').html( /// map stretch goal: accomplished! wooohoooo!
       `     <iframe class='map' 
            width="370" 
            height="400"     
            frameborder="0" 
            scrolling="no" 
            marginheight="0" 
            marginwidth="0" 
            src='https://maps.google.com/maps?q=${lat},${lon}&hl=es;z=18&amp;output=embed'>
            </iframe>`)
         
    
        ///////////////////////////////////////////////
        ////// DISPLAYING IMAGES //////////////////////
        ///////////////////////////////////////////////

        const displayImages = (imageData) => {
        const cityImage = imageData.photos[0]['image']['web'];
        console.log(imageData);
        
        $('.jumbotron').css('background-image', `url(${cityImage})`)
        $('.jumbotron').css('height', `20em`)
 
        }


        ////// DISPLAYING SCORES INFORMATION ////////////////////
        const displayScores = (scoreData) => {
            // console.log(scoreData);

            const $citySummary = $(scoreData.summary);
            
            const $urban = $('<p>')
            $urban.text(`${cityName} is part of the ${urbanAreaName} urban area.`)
            
            $cityTitle.after($citySummary);
            $cityTitle.after($urban);

            const categoriesArr = scoreData.categories
            // console.log(categoriesArr);

            
            for (let i = 0; i < categoriesArr.length; i++){
                let curCategory = categoriesArr[i];
                let catName = curCategory.name;
                let catScore = Math.round(curCategory.score_out_of_10);
                let catColor = curCategory.color;

                const $div = $('<div>')
                $div.addClass('scores')
                $div.attr('id', `scoreDiv` + i)
                $('#city-scores').append($div)

                
                const $p = $('<p>')
                $p.text(`${catName}: `); //text for each category
                $(`#scoreDiv${i}`).append($p);

                
                const $bar = $('<div>') //gray bar to style
                $bar.css('min-width', '100px')
                $bar.css('height', '14px')
                $bar.css('border', '1px solid black')
                $bar.css('position', 'relative')
                $(`#scoreDiv${i}`).append($bar)


                const $colorWithinBar = $('<div>') //colored bar represeting rating within
                $colorWithinBar.css('width', `${catScore}0px`)
                $colorWithinBar.css('height', '14px')
                $colorWithinBar.css('background-color', `${catColor}`)
                $colorWithinBar.css('position', 'absolute')
                $bar.append($colorWithinBar)

                const $p2 = $('<p>')
                $p2.text(`${catScore} of 10 `); //text and value for category score          
                $(`#scoreDiv${i}`).append($p2)
            }

            let $sectionName = $('<h4>')
            $sectionName.text('City Ratings')
            $("#city-scores").prepend($sectionName)
         
        }
    
        $.ajax({url: `${urban_areaLink}scores`}).then(displayScores)
        $.ajax({url: `${urban_areaLink}images`}).then(displayImages)
    
    }
$.ajax({url: geoLink}).then(useGeoData) 

}



$('.submit-btn').on('click', (event) =>{
    event.preventDefault();
    $('#city-section').removeClass('hidden')
    $('#title').empty();
    $('#city-scores').empty();
    const city = $('.text-box').val().toLowerCase();
    console.log(city);
    
    const endpoint = `https://api.teleport.org/api/cities/?search=${city}&limit=1`
    $.ajax({url: endpoint}).then(handleData)

})

$('#home').on('click', ()=>{
    location.reload() // learned how to reload the page from stackoverflow
})

$('#about').on('click', ()=> {
    $('#modal').css('display','block')
})

$('button').on('click', () => {
    $('#modal').css('display','none')
})

// $(window).on("resize",function(){  
    
//     if($(window).width() < 736){
//         const $hamb = $('<img>')
//         $hamb.attr('src','../images/menu.svg')
//         $hamb.addClass('hamburger')
//         $('.links').empty();
//         $('.links').append($hamb);
//      }   
//     else if ($(window).width() > 736) {
//         $('.links').empty();
//         const $homeLink = $('<a>')
//         const $aboutLink = $('<a>')
//         $homeLink.text('Home');
//         $aboutLink.text('About');
//         $homeLink.attr('href', '#home')
//         $homeLink.attr('id', 'home')
//         $aboutLink.attr('id','about')
//         $('.links').append($homeLink)
//         $('.links').append($aboutLink)
//     }
//  })

//  if($(window).width() < 736){
//     const $hamb = $('<img>')
//     $hamb.attr('src','../images/menu.svg')
//     $hamb.addClass('hamburger')
//     $('.links').empty();
//     $('.links').append($hamb);
// }    

// $('.hamburger').on('click', ()=>{
//     if($('#menu').css('display') === 'none'){
//     $('#menu').css('display','block')
//     }
//     else {
//     $('#menu').css('display','none')
//     }
// })