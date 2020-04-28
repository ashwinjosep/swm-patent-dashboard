//function to be performed on loading webpage
function initializerFunction() {
    //set first sidenav as initial option
    window.section = "sidenav_1";
    window.start = 0;
    window.limit = 20;
    window.page = 1;
}


//function to change page when nav buttons are Clicked
function pageChange(inp) {
  if(inp.id==='n')
  {
    if(window.page<50)
      changePages(window.page+1);
  }
  else if (inp.id==='p') {
    if(window.page>1)
      changePages(window.page-1);
  }
  else if (inp.id==='f') {
    changePages(1);
  }
  else {
    changePages(50);
  }
}


//function to update patents table
function updatePatentsTable() {
    // $('#loadingText').html('Loading...');
    $('#patentList').html('');
    $.ajax({
        type:"GET",
        url: "http://localhost:8080/api/patent_citations_range/",
        data: {
            "start": window.start,
            "limit": window.limit,
        },
        dataType: "JSON",
    }).then(function(data) {
        // $('#loadingText').html('');
        window.patent_citations = data;
        $('#patentList').append("<ul id='patentListUl' class='patentListClass'></ul>");
        data.forEach(elt => $('#patentListUl').append("<li id='"+elt.patentId+
        "' onclick=updateChartsBasedOnPatent("+elt.patentId+") class='ripple'><div"+
        " class='patentListItemId'>"+elt.patentId+"</div><div class='patentListItemCount'>"+
        elt.citationCount+"</div></li>"));
    });
}


// function to update all details based on patent
function updateChartsBasedOnPatent(elt) {

  //  set window.patent as the new element's id
  window.patentId = elt.id;
  $('#patentTitle').html(window.patentId);

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
  // $('#card2Content').html(window.patentId);
  $('#patentKeywordList').html('No Data');
  $.ajax({
      type:"GET",
      url: "http://localhost:8080/api/patent_keywords/",
      data: {
          "patent_id": window.patentId,
      },
      dataType: "JSON",
  }).then(function(data) {
      // $('#loadingText').html('');
      window.patent_keywords = data;
      if(data.length!==0)
      {
        $('#patentKeywordList').html('');
        var keywords = data.keyword.split(',');
        keywords.forEach(elt => $('#patentKeywordList').append("<div class='"+
        "patentKeywordListItem'>"+elt+"</div>"));
      }
  });

}


//function to update card 2
function updateCard3() {
  $('#card3Content').html(window.patentId);

  $.ajax({
      type:"GET",
      url: "http://localhost:8080/api/patent_similarities_tfidf/",
      data: {
          "patent_id": window.patentId,
      },
      dataType: "JSON",
  }).then(function(data) {
      // $('#loadingText').html('');
      window.patent_similarities_tfidf = data;
      if(data.length!==0)
      {
        console.log(data);
        // $('#patentKeywordList').html('');
        // var keywords = data.keyword.split(',');
        // keywords.forEach(elt => $('#patentKeywordList').append("<div class='"+
        // "patentKeywordListItem'>"+elt+"</div>"));
      }
  });
}


//function to update card 2
function updateCard4() {
  $('#card4Content').html(window.patentId);
}


//function to update card 2
function updateCard5() {
  $('#card5Content').html(window.patentId);
}


// function to fill page numbers
function fillPageNumbers() {
  var start = window.page;
  if(start>2)
  {
    start = window.page-2;
  }
  else {
    start = 1;
  }

  if(start>45)
  {
    start = 46;
  }
  var end = start + 5;
  $('#searchNavList').html('')
  for(i=start;i<end;i++)
  {
    $('#searchNavList').append("<li onclick='changePages("+i+")' id= 'page"+i+"'>"+i+"</li>");
  }

  //  Switch selection
  var elements = document.getElementById("searchNavList");
  elementId = "page"+window.page;
  for(i=0;i<elements.children.length;i++)
  {
    if(elements.children[i].id===elementId){
      elements.children[i].classList.add("searchNav_active");
    }
    else {
      elements.children[i].classList.remove("searchNav_active");
    }
  }
}


//function to switch pages
function changePages(page)
{
  if(page!==window.page)
  {
    window.page = page;
    fillPageNumbers();
    window.start = (window.page-1) * window.limit;
    updatePatentsTable();
  }
}


// document ready function
$(document).ready(function() {

  initializerFunction();
  fillPageNumbers();
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
