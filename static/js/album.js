function get_album(){
    console.log("Attempting to recieve pictures from parse...");

    // clear header (id: main) and pictures (id: freewall)
    // while(document.getElementById("main").firstChild)
    // {
    // 	document.getElementById("main").removeChild(document.getElementById("main").firstChild);
    // }
    // while(document.getElementById("freewall").firstChild)
    // {
    // 	document.getElementById("freewall").removeChild(document.getElementById("freewall").firstChild);
    // }



    //create main object
    // TODO: am going to have to implement sessions/user creation eventually.
    // var header = document.createElement("h1");
    // header.innerText = "Your Pictures";
    // var subheader = document.createElement("p");
    // subheader.innerText = "Click a picture to see more information about it!";
    // document.getElementById("main").appendChild(header);
    // document.getElementById("main").appendChild(subheader);

	// query parse server for pictures, and show all of them
	Parse.initialize("vKmkK5Bw25DIQeOySJPGyzp1gH2ax46Zh9n0Jebo", "wI58dZ5BgFYCOTQmAG0wB3OF68stJmqyG0uqXq9h");
    Parse.serverURL = "https://parseapi.back4app.com/";
    var TestFolder = Parse.Object.extend("EyeSnap_Testing");
	var queryObject = new Parse.Query(TestFolder);

	queryObject.find({
	    success: function (results) {
	    	if (results.length > 0)
	    	{
	    		console.log("Images recieved! Num images: " + results.length);
	    		for (var i = 0; i < results.length; i++) {
	    			// get rid of loading message
	    			document.getElementById("loading").style.display = "none";
	    			//create class for the images
	    			var style = document.createElement('style');
					style.type = 'text/css';
					style.innerHTML = '.cell { width: 200px; height: 200px; margin: 3px; cursor: pointer; }';
					document.getElementsByTagName('head')[0].appendChild(style);
					// create image thing, give it class "cell"
		            
		            var img_div = document.createElement("div");
		            var img = document.createElement("img");
		            
		            var picture = results[i];
					var imageFile = picture.get('pic_marked');
					var pic_id = picture.id;
					console.log('pic_id', pic_id);
					console.log('i', i);
					var imageURL = imageFile.url();

					img.src = imageURL;
					img.style.width = "100%";
					img.style.height = "100%";
					img.id = picture.id;
					img_div.className = "cell";
					img_div.onclick = function() {
						window.location.href = "/pic?id=" + this.firstChild.id;
						// document.ready(get_pic());
					};
					img_div.appendChild(img);
		            // place it in a the div with id "freewall"
		            // $("#freewall").appendChild(img);
		            document.getElementById("freewall").appendChild(img_div);
	        	}
	        	var wall = new Freewall("#freewall");
				wall.reset({
					selector: '.cell',
					animate: true,
					cellW: 200,
					cellH: 200,
					onResize: function() {
						wall.refresh();
					}
				});
				wall.fitWidth();
				// for scroll bar appear;
				$(window).trigger("resize");
	    	} 
	    	else 
	    	{
	    		$(".empty").show();
	        }
	    },
	    error: function (error) 
	    {
	        alert("Error: " + error.code + " " + error.message);
	    }
	});

	// show every picture
}

function pic_view_load(){
	//get value of "edit" button
	// if button is true, open editing view
	// if button is false, open regular view
	// make sure to do similar thing with 
}

function get_pic(){
	var url = window.location.href;
	var url_split = url.split("=");
	var param = url_split[1];
	console.log('param', param);

	// clear header (id: main) and pictures (id: freewall)
    // while(document.getElementById("main").firstChild)
    // {
    // 	document.getElementById("main").removeChild(document.getElementById("main").firstChild);
    // }
    // while(document.getElementById("freewall").firstChild)
    // {
    // 	document.getElementById("freewall").removeChild(document.getElementById("freewall").firstChild);
    // }

    // create new header
    // create back button
    var back_button = document.createElement("button");
    back_button.innerText = "Back to Album";
    back_button.onclick = function() {
    	document.location.href = "/";
    };
    document.getElementById("main").appendChild(back_button);
    
    //create "edit" button
    // var edit_button = document.createElement("button");
    // edit_button.innerText = "Edit";
    // edit_button.onclick = function(){
    // 	document.location.href = "/pic/edit?id=" + param;
    // };
    // document.getElementById("main").appendChild(edit_button);

    // show image in center of screen
    Parse.initialize("vKmkK5Bw25DIQeOySJPGyzp1gH2ax46Zh9n0Jebo", "wI58dZ5BgFYCOTQmAG0wB3OF68stJmqyG0uqXq9h");
    Parse.serverURL = "https://parseapi.back4app.com/";
    var TestFolder = Parse.Object.extend("EyeSnap_Testing");
    console.log('TestFolder', TestFolder);
	var queryObject = new Parse.Query(TestFolder);
	console.log('queryObject', queryObject);
	console.log("attempting to retrieve picture");
	queryObject.get(param, {
		success: function(result) {
			// get rid of loading message 
			document.getElementById("loading").style.display = "none";

			//show pic and it's information
			var pic_div = document.createElement("div");
			var this_pic = document.createElement("img");
			var picture = result;
			console.log('picture', picture);
			var imageFile = picture.get('pic_marked');
			var imageURL = imageFile.url();
			this_pic.src = imageURL;
			pic_div.appendChild(this_pic);
			document.getElementById("freewall").appendChild(pic_div);

			// something that shows information. My test files don't have dummy data, really. But i could make some...
			// name
			// age
			// height
			// weight
			// diagnosis

		},
		error: function (object, error) {
			console.log("wrong!");
			alert("Error: " + error.code + " " + error.message);
		}
	});

    // thats it for now, but I'm sure more will come later

}

function get_edit_pic(){
	var url = window.location.href;
	var url_split = url.split("=");
	var param = url_split[1];
	console.log('param', param);

	// clear header (id: main) and pictures (id: freewall)
    // while(document.getElementById("main").firstChild)
    // {
    // 	document.getElementById("main").removeChild(document.getElementById("main").firstChild);
    // }
    // while(document.getElementById("freewall").firstChild)
    // {
    // 	document.getElementById("freewall").removeChild(document.getElementById("freewall").firstChild);
    // }

    // create new header
    var header = document.createElement("p");
    header.innerText = "Editing picture...";
    document.getElementById("main").appendChild(header);
    // create back button
    var back_button = document.createElement("button");
    back_button.innerText = "Back to Album";
    back_button.onclick = function() {
    	document.location.href = "/";
    };
    document.getElementById("main").appendChild(back_button);
    
    //create "edit" button
    // var edit_button = document.createElement("button");
    // edit_button.innerText = "Edit";
    // edit_button.onclick = function(){
    // 	document.location.href = "/pic/edit?id=" + param;
    // };

    // show image in center of screen
    Parse.initialize("vKmkK5Bw25DIQeOySJPGyzp1gH2ax46Zh9n0Jebo", "wI58dZ5BgFYCOTQmAG0wB3OF68stJmqyG0uqXq9h");
    Parse.serverURL = "https://parseapi.back4app.com/";
    var TestFolder = Parse.Object.extend("EyeSnap_Testing");
    console.log('TestFolder', TestFolder);
	var queryObject = new Parse.Query(TestFolder);
	console.log('queryObject', queryObject);
	console.log("attempting to retrieve picture");
	queryObject.get(param, {
		success: function(result) {
			//show pic and it's information
			var pic_div = document.createElement("div");
			var this_pic = document.createElement("img");
			var picture = result;
			console.log('picture', picture);
			var imageFile = picture.get('pic_marked');
			var imageURL = imageFile.url();
			this_pic.src = imageURL;
			pic_div.appendChild(this_pic);
			document.getElementById("freewall").appendChild(pic_div);

			// something that shows information. My test files don't have dummy data, really. But i could make some...
			// these are going to be prompts with corresponding text entry areas
			var info_el = document.getElementById("information");
			
			var table_el = document.createElement("tb"); // this very well may not be correct
			//ugh

			// name

			// age
			// height
			// weight
			// diagnosis

		},
		error: function (object, error) {
			console.log("wrong!");
			alert("Error: " + error.code + " " + error.message);
		}
	});
    // thats it for now, but I'm sure more will come later

}






