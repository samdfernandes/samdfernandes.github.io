# samdfernandes.github.io
Website that has relevant city data for anyone interested

## CityLife 
CityLife is a web application that makes use of the [Teleport API] (https://developers.teleport.org/api/)to display information on measured data for mig metropolitan areas world-wide.

My approach for this project was to use the data available on the API to gather scores on quality of life in the cities searched by the user.

You can see the live site [here] (https://samdfernandes.github.io/)

### Instalation instructions:
I started by creating the HTML and CSS files with a text input field and a submit button to display information on the searched city.

Next I examined the data to find out where to go to access the city name, and display it to the page.
To do this, I needed to make an API call with Ajax

To show any additional data, I needed to find and store a *geocode* for the city from the first API call, and use this info to pass it into a query and call all the aditional data.

**1st problem encountered**

This is where I had my first challenge with this project as I did not know a *proper way* to make an ajax call within a call. But after playing around with it, I found that it is ok to have them nested. 
When I first tried to nest them, nothing was working and it took me a half day of work and troubleshooting to find out I had a typo on my const name. Sigh...

The next API call gathers a summary information on the city and displays it to a card

The next API call after that gathers the information on quality of life scores

**2nd problem / stretch goal encountered**

After I was able to get the score data and display it to the page I was not satisfied that they were just words and numbers.

I wanted to find a visually pleasing way to display this raw data of the city scores. I thought of doing pie charts or column charts but didn't know the best way to represent this with code.

After some soul searching I gathered that column charts where a good way to show the scores and set out to find out how to create my divs to show this correctly. I found that setting the numbers to round with Math.round, then using those scores as a pixel size inside a 100px outer div, I was getting my bars to display quite pleasingly. 

The bigger challenge was figuring out how to use flexbox, margins, min/max-width to display every piece neatly, inside a card on any width display. Phew. This took several tries, playing around with those properties until I found the right ratio. 

**Stretch goal 2: accomplished**

The other thing I though would be nice to show along with the cards for the summary and the scores, was a map with the location of the page. 

I thought I would need to use a google api for this, but upon some research I learned that this was a paid feature of google.

I continued to look for a way to embed the map to my page and perhaps use lat and long information to gather date and display the map accordingly. I found I could use iframe to display the map on the main page.

Changing the location proved difficult as google will prevent you from refreshing the information on the map.

My work around was using jquery to add the whole html for the map to the page, along with the other information I was using about the city. The map is my third and final card.

**CSS goal: Modal**

I realized I needed to add some CSS functionality to my site so I used a modal box with the about information on my nav bar.

I used code inspired by our class exemple.

**CSS Goal 2: make it responsive**

I made the mistake of *not* designing it for the smaller screen, so I had to go back and make my cards a bit smaller and adjust some fonts/widths/margins to small screens. Done.

**CSS more! Modal was too easy**

I used a transition property to smooth out the transition I was seeing on my resizing of the input text box. In smaller screens, my text box needs to be much smaller to still look pretty.

**CSS goal fail: toggle navigation menu**

On Friday afternoon I tried to add one more functionality as my site was otherwise done. I made an attempt to add a nav icon for when the page got to a certain width, but had no luck with that. I found on google an option to use $(window).on(resize, function...) to grab the resizing event and was able to successfully switch the nav links for an img. 

I then created another 'modal-type' of box to display the hidden nav options. I could never get this to show, for some reason. 
At this point, it was Friday afternoon and I ended up dropping it because I need a finished project to deliver Monday. 





