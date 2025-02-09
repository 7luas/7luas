getText("text1.txt","demo1");
getText("text2.txt","demo2");
getText("text3.txt","demo3");

async function getText(file,id) {
  let x = await fetch(file);
  let y = await x.text();
  alert(y);
  document.getElementById(id).innerHTML = y;
}