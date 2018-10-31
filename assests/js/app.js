$(document).ready(function()
{
	// Creating variable for default topics
	var topics = ['Rose', 'Sunflower', 'Marigold', 'Dahlia', 'Orchid'];

	// Default function for displaying topic data 
	function renderButtons()
	{
		// Deletes the topics prior to adding new topics (this is necessary otherwise you will have repeat buttons)
		$('#topicsView').empty();

		// Loops through the array of topics
		for (var i = 0; i < topics.length; i++)
		{
			// Dynamically generating buttons for each topic in the array
			var a = $('<button type="button">') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
			a.addClass('topicButton btn btn-primary'); // Adding class 
			a.attr('data-name', topics[i]); // Adding data-attribute
			a.text(topics[i]); // Adding text to a button
			$('#topicsView').append(a); // Adding button to html
		}
	}

		// On click event listener
		$('#addTopic').on('click', function(){

			console.log('button clicked');

			// Getting a value from the input field
			var topic = $('#topicInput').val().trim();
            // Logging a topic
			console.log(topic);


			// Adding a topic to an array
			topics.push(topic);
			
			// Runs a default function to display topics
			renderButtons();

			// Enables 'Enter' key for adding data
			return false;
		});


	//Function for displaying gifs and still images
	function displaytopicGif()
	{

		$('#gifView').empty();
		var topic = $(this).attr('data-name');
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10&offset=0";


        $.ajax({
                    url: queryURL, 
                    method: 'GET'
                })
		           .done(function(response) 
		{

			// Adding div to hold the topic
			var topicDiv = $('<div class="topicImage">');
			console.log(response);
			for (i=0; i < response.data.length; i++) 
			{
				var stillImage = response.data[i].images.fixed_height_still.url;
				console.log(stillImage);

				var playImage = response.data[i].images.fixed_height_downsampled.url;
				console.log("Moving"+ playImage);

				var rating = response.data[i].rating;
				console.log(rating);

				// Adding a <p> element to display ratings
				var pOne = $('<p>').text( "Rating: " + rating.toUpperCase());
				topicDiv.append(pOne);

				var image = $("<img>").attr("src", stillImage); //Passes still image link to the image src
				image.attr("playsrc", playImage); //Adding attribute and passes moving gif link to the image playsrc
				image.attr("stopsrc", stillImage); //Adding attribute and passes still image link to the image stopsrc
				
				topicDiv.append(image);

				// Puts the entire topic above the previous topic.
				$('#gifView').append(topicDiv);

				image.addClass('playClickedGif'); // Added a class to image tag


			}	
		});
	}

	function swapGif()
	{
		//Play Image 
		var playImage = $(this).attr('playsrc');

		console.log(playImage);


		//Stop Image 
		var stopImage = $(this).attr('stopsrc');

		console.log(stopImage);

		//Swap image condition
		if ($(this).attr('playsrc') == $(this).attr('src'))
		{
			//This changes the image src
			$(this).attr('src', stopImage);
		}

		else
		{
			$(this).attr('src', playImage);
		}
	}

	// Calling a default renderButtons() function
	renderButtons();

	// Default function for displaying the Gif
	$(document).on('click', '.topicButton', displaytopicGif);
	$(document).on('click', '.playClickedGif', swapGif);


});