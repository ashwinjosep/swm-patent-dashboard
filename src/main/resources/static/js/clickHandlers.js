function changeSection(elt)
{

  console.log(elt);

//  Switch sections
  var elements = document.getElementById("sidenav__list");
  for(i=0;i<elements.children.length;i++)
  {
    if(elements.children[i].id==elt.id){
      elements.children[i].classList.add("active_sidenav");
    }
    else {
      elements.children[i].classList.remove("active_sidenav");
    }
  }

// Make changes for tab change
  setHeading(elt.innerText);
}

// this function sets the main heading according to the change in sections
function setHeading(text)
{
  var heading_div = document.getElementById("main-header__heading");
  heading_div.innerText = text;
}
