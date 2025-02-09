alert("G");

fetch('data.json')
  .then(response => {
    // Check if the request was successful
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the JSON data
  })
  .then(data => {
    // Use the loaded JSON data
    console.log(data);
  })
  .catch(error => {
    // Handle any errors
    console.error('There was a problem with the fetch operation:', error);
  });

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