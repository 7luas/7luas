var data;

fetch('data.json')
  .then(response => {
    // Check if the request was successful
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the JSON data
  })
  .then(theData => {
    // Use the loaded JSON data
    console.log(theData);
	data = theData;
  })
  .catch(error => {
    // Handle any errors
    console.error('There was a problem with the fetch operation:', error);
  });

alert(data["projects"][1].name);


if(0){
getText("text1.txt","demo1");
getText("text2.txt","demo2");
getText("text3.txt","demo3");
}

async function getText(file,id) {
  let x = await fetch(file);
  let y = await x.text();
  alert(y);
  document.getElementById(id).innerHTML = y;
}