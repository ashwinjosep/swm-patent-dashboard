//function to be performed on loading webpage
function initializerFunction()
{
    //set first sidenav as initial option
    window.section = "sidenav_1";
}


//function to update patents table
function updatePatentsTable()
{
    $('#loadingText').html('Loading...');
    $('#patentList').html('');
    $.ajax({
        type:"GET",
        url: "/api/patent_citations",
        dataType: "JSON",
    }).then(function(data) {
        $('#loadingText').html('');
        window.patent_citations = data;
        $('#patentList').append("<ul id='patentListUl' class='patentListClass'></ul>");
        data.forEach(elt => $('#patentListUl').append("<li id='"+elt.patentId+
        "' onclick=updateChartsBasedOnPatent("+elt.patentId+") class='ripple'><div"+
        " class='patentListItemId'>"+elt.patentId+"</div><div class='patentListItemCount'>"+
        "400</div></li>"));
    });
}


// function to update all details based on patent
function updateChartsBasedOnPatent(elt) {

  //  set window.patent as the new element's id
  window.patentId = elt.id;

  //  Switch selection
  var elements = document.getElementById("patentListUl");
  for(i=0;i<elements.children.length;i++)
  {
    if(elements.children[i].id===elt.id){
      elements.children[i].classList.add("patentListClass_active");
    }
    else {
      elements.children[i].classList.remove("patentListClass_active");
    }
  }

  //update each card
  updateCard2();
  updateCard3();
  updateCard4();
  updateCard5();
}


//function to update card 2
function updateCard2() {
  $('#card2').html(window.patentId);
}


//function to update card 2
function updateCard3() {
  $('#card3').html(window.patentId);
}


//function to update card 2
function updateCard4() {
  $('#card4').html(window.patentId);
}


//function to update card 2
function updateCard5() {
  $('#card5').html(window.patentId);
}


// document ready function
$(document).ready(function() {

  initializerFunction();
  updatePatentsTable();
});


//function to change sections
function changeSection(elt)
{
//  set window.section as the new element's id
  window.section = elt.id;

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
  // setHeading(elt.innerText);
}


// this function sets the main heading according to the change in sections
function setHeading(text)
{
  var heading_div = document.getElementById("main-header__heading");
  heading_div.innerText = text;
}

