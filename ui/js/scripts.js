//function to be performed on loading webpage
function initializerFunction() {
    //set first sidenav as initial option
    window.section = "sidenav_1";
    window.start = 0;
    window.limit = 20;
    window.page = 1;
    Chart.defaults.global.defaultFontFamily = "'Sen', sans-serif";
    Chart.defaults.global.defaultFontStyle = "bold";
    updateCard6();
    hideDiv('card6');
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
  updateCard7();
  updateCard8();
}


//function to update card 2
function updateCard2() {
  // $('#card2Content').html(window.patentId);
  $('#patentKeywordList').html('No Data Available');
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
  $('#card3Text').html('No Data Available');
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
        $('#card3Text').html('');
        // convert keys to array to fit bar chart
        var patents = [];
        var similarities = [];
        for(i=1;i<=10;i++)
        {
          patentKey = "patent"+i;
          similarityKey = "similarity"+i;
          patents.push(data[patentKey]);
          similarities.push((data[similarityKey]*100).toFixed(4));
        }

        var tfidfChart = document.getElementById('tfidfChart').getContext('2d');

        //draw new chart only if chart doesn't already exist
        if(window.tfidfDrawnChart!==undefined)
        {
          window.tfidfDrawnChart.destroy();
        }
        else {

        }
        window.tfidfDrawnChart = new Chart(tfidfChart, {
          type: 'horizontalBar',
          data: {
              labels: patents,
              datasets: [{
                  label: 'Similarity % ',
                  data: similarities,
                  backgroundColor: 'rgba(171, 108, 130, 0.7)',//'#AB6C82',
                  // [
                  //   '#475C7A',
                  //   '#685D79',
                  //   '#AB6C82',
                  //   '#D8737F',
                  //   '#FCBB6D',
                  //   '#475C7A',
                  //   '#685D79',
                  //   '#AB6C82',
                  //   '#D8737F',
                  //   '#FCBB6D',
                  // ],
                  borderColor: '#AB6C82',
                  borderWidth: 2,
              }]
          },
          options: {
              legend: {
                display: false,
              },
              labels: {
                defaultFontFamily: "'Sen', sans-serif",
              },
              scales: {
                  xAxes: [{
                      ticks: {
                          beginAtZero: true,
                          suggestedMax: 100,
                          display: true,
                          callback: function(label, index, labels) {
                              return label+'%';
                          },
                      },
                      gridLines: {
                        color: '#ecf0f1',
                        borderDash: [8, 4],
                        lineWidth: 2,
                      },
                      scaleLabel: {
                        display: true,
                        labelString: 'Similarity %'
                      },
                  }],
                  yAxes: [{
                    gridLines: {
                      color: '#ecf0f1',
                      borderDash: [8, 4],
                      lineWidth: 2,
                    },
                  }],
              }
          }
        });
      }
      else {
        if(window.tfidfDrawnChart!==undefined)
        {
          window.tfidfDrawnChart.destroy();
        }
      }

  });
}


//function to update card 2
function updateCard4() {
  $('#card4Text').html('No Data Available');
  $.ajax({
      type:"GET",
      url: "http://localhost:8080/api/patent_similarities_lda/",
      data: {
          "patent_id": window.patentId,
      },
      dataType: "JSON",
  }).then(function(data) {
      // $('#loadingText').html('');
      window.patent_similarities_lda = data;
      if(data.length!==0)
      {
        $('#card4Text').html('');
        // convert keys to array to fit bar chart
        var patents = [];
        var similarities = [];
        for(i=1;i<=10;i++)
        {
          patentKey = "patent"+i;
          similarityKey = "similarity"+i;
          patents.push(data[patentKey]);
          similarities.push((data[similarityKey]*100).toFixed(4));
        }

        var ldaChart = document.getElementById('ldaChart').getContext('2d');

        //draw new chart only if chart doesn't already exist
        if(window.ldaDrawnChart!==undefined)
        {
          window.ldaDrawnChart.destroy();
        }
        window.ldaDrawnChart = new Chart(ldaChart, {
          type: 'horizontalBar',
          data: {
              labels: patents,
              datasets: [{
                  label: 'Similarity % ',
                  data: similarities,
                  backgroundColor: 'rgba(216, 115, 127, 0.7)',
                  // [
                  //   '#475C7A',
                  //   '#685D79',
                  //   '#AB6C82',
                  //   '#D8737F',
                  //   '#FCBB6D',
                  //   '#475C7A',
                  //   '#685D79',
                  //   '#AB6C82',
                  //   '#D8737F',
                  //   '#FCBB6D',
                  // ],
                  borderColor: '#D8737F',
                  borderWidth: 2,
              }]
          },
          options: {
              legend: {
                display: false,
              },
              labels: {
                defaultFontFamily: "'Sen', sans-serif",
              },
              scales: {
                  xAxes: [{
                      gridLines: {
                        color: '#ecf0f1',
                        borderDash: [8, 6],
                        lineWidth: 2,
                      },
                      ticks: {
                          beginAtZero: true,
                          suggestedMax: 100,
                          display: true,
                          callback: function(label, index, labels) {
                              return label+'%';
                          },
                      },
                      scaleLabel: {
                        display: true,
                        labelString: 'Similarity %'
                      },
                  }],
                  yAxes: [{
                    gridLines: {
                      color: '#ecf0f1',
                      borderDash: [8, 4],
                      lineWidth: 2,
                    },
                  }],
              }
          }
        });
      }
      else {
        if(window.ldaDrawnChart!==undefined)
        {
          window.ldaDrawnChart.destroy();
        }
      }
  });
}


//function to update card 7
function updateCard7() {
  $('#card7Text').html('No Data Available');
  $.ajax({
      type:"GET",
      url: "http://localhost:8080/api/patent_similarities_embeddings/",
      data: {
          "patent_id": window.patentId,
      },
      dataType: "JSON",
  }).then(function(data) {
      // $('#loadingText').html('');
      window.patent_similarities_embeddings = data;
      if(data.length!==0)
      {
        $('#card7Text').html('');
        // convert keys to array to fit bar chart
        var patents = [];
        var similarities = [];
        for(i=1;i<=10;i++)
        {
          patentKey = "patent"+i;
          similarityKey = "similarity"+i;
          patents.push(data[patentKey]);
          similarities.push((data[similarityKey]).toFixed(4));
        }

        var embeddingChart = document.getElementById('embeddingChart').getContext('2d');

        //draw new chart only if chart doesn't already exist
        if(window.embeddingDrawnChart!==undefined)
        {
          window.embeddingDrawnChart.destroy();
        }
        window.embeddingDrawnChart = new Chart(embeddingChart, {
          type: 'horizontalBar',
          data: {
              labels: patents,
              datasets: [{
                  label: 'Euclidean Distance',
                  data: similarities,
                  backgroundColor: 'rgba(216, 115, 127, 0.7)',
                  // [
                  //   '#475C7A',
                  //   '#685D79',
                  //   '#AB6C82',
                  //   '#D8737F',
                  //   '#FCBB6D',
                  //   '#475C7A',
                  //   '#685D79',
                  //   '#AB6C82',
                  //   '#D8737F',
                  //   '#FCBB6D',
                  // ],
                  borderColor: '#D8737F',
                  borderWidth: 2,
              }]
          },
          options: {
              legend: {
                display: false,
              },
              labels: {
                defaultFontFamily: "'Sen', sans-serif",
              },
              scales: {
                  xAxes: [{
                      gridLines: {
                        color: '#ecf0f1',
                        borderDash: [8, 6],
                        lineWidth: 2,
                      },
                      ticks: {
                          beginAtZero: true,
                          display: true,
                          // callback: function(label, index, labels) {
                          //     return label+'%';
                          // },
                      },
                      scaleLabel: {
                        display: true,
                        labelString: 'Euclidean Distance'
                      },
                  }],
                  yAxes: [{
                    gridLines: {
                      color: '#ecf0f1',
                      borderDash: [8, 4],
                      lineWidth: 2,
                    },
                  }],
              }
          }
        });
      }
      else {
        if(window.embeddingDrawnChart!==undefined)
        {
          window.embeddingDrawnChart.destroy();
        }
      }

  });
}


//function to update card 8
function updateCard8() {
  $('#card8Text').html('No Data Available');
  $.ajax({
      type:"GET",
      url: "http://localhost:8080/api/patent_similarities_bert/",
      data: {
          "patent_id": window.patentId,
      },
      dataType: "JSON",
  }).then(function(data) {
      // $('#loadingText').html('');
      window.patent_similarities_bert = data;
      if(data.length!==0)
      {
        $('#card8Text').html('');
        // convert keys to array to fit bar chart
        var patents = [];
        var similarities = [];
        for(i=1;i<=10;i++)
        {
          patentKey = "patent"+i;
          similarityKey = "similarity"+i;
          patents.push(data[patentKey]);
          similarities.push((data[similarityKey]).toFixed(4));
        }

        var bertChart = document.getElementById('bertChart').getContext('2d');

        //draw new chart only if chart doesn't already exist
        if(window.bertDrawnChart!==undefined)
        {
          window.bertDrawnChart.destroy();
        }
        window.bertDrawnChart = new Chart(bertChart, {
          type: 'horizontalBar',
          data: {
              labels: patents,
              datasets: [{
                  label: 'Euclidean Distance',
                  data: similarities,
                  backgroundColor: 'rgba(216, 115, 127, 0.7)',
                  // [
                  //   '#475C7A',
                  //   '#685D79',
                  //   '#AB6C82',
                  //   '#D8737F',
                  //   '#FCBB6D',
                  //   '#475C7A',
                  //   '#685D79',
                  //   '#AB6C82',
                  //   '#D8737F',
                  //   '#FCBB6D',
                  // ],
                  borderColor: '#D8737F',
                  borderWidth: 2,
              }]
          },
          options: {
              legend: {
                display: false,
              },
              labels: {
                defaultFontFamily: "'Sen', sans-serif",
              },
              scales: {
                  xAxes: [{
                      gridLines: {
                        color: '#ecf0f1',
                        borderDash: [8, 6],
                        lineWidth: 2,
                      },
                      ticks: {
                          beginAtZero: true,
                          display: true,
                          // callback: function(label, index, labels) {
                          //     return label+'%';
                          // },
                      },
                      scaleLabel: {
                        display: true,
                        labelString: 'Euclidean Distance'
                      },
                  }],
                  yAxes: [{
                    gridLines: {
                      color: '#ecf0f1',
                      borderDash: [8, 4],
                      lineWidth: 2,
                    },
                  }],
              }
          }
        });
      }
      else {
        if(window.bertDrawnChart!==undefined)
        {
          window.bertDrawnChart.destroy();
        }
      }
  });
}



//function to update card 2
function updateCard5() {
  $('#card5Content').html(window.patentId);
}

//function to update card 2
function updateCard6() {
  $('#card6Text').html('No Data Available');
  $.ajax({
      type:"GET",
      url: "http://localhost:8080/api/yearwise_patent_details",
      dataType: "JSON",
  }).then(function(data) {
      // $('#loadingText').html('');
      window.yearwise_patent_count = data;
      if(data.length!==0)
      {
        $('#card6Text').html('');
        // convert keys to array to fit bar chart
        var years = [];
        var counts = [];
        for(i=0;i<data.length;i++)
        {
          years.push(data[i]['year']);
          counts.push(data[i]['count'])
        }

        var patentYearChart = document.getElementById('patentYearChart').getContext('2d');

        //draw new chart only if chart doesn't already exist
        if(window.patentYearDrawnChart!==undefined)
        {
          window.patentYearDrawnChart.destroy();
        }
        window.patentYearDrawnChart = new Chart(patentYearChart, {
          type: 'line',
          data: {
              labels: years,
              datasets: [{
                  label: 'Years',
                  data: counts,
                  backgroundColor: 'rgba(216, 115, 127, 0.7)',//'#D8737F',
                  borderColor: '#AB6C82',
                  borderWidth: 2,
              }]
          },
          options: {
              legend: {
                display: false,
              },
              labels: {
                defaultFontFamily: "'Sen', sans-serif",
              },
              scales: {
                  xAxes: [{
                      gridLines: {
                        color: '#ecf0f1',
                        borderDash: [8, 6],
                        lineWidth: 2,
                      },
                      ticks: {
                          beginAtZero: true,
                          display: true,
                      },
                      scaleLabel: {
                        display: true,
                        labelString: 'Year'
                      },
                  }],
                  yAxes: [{
                    gridLines: {
                      color: '#ecf0f1',
                      borderDash: [8, 4],
                      lineWidth: 2,
                    },
                    scaleLabel: {
                      display: true,
                      labelString: 'Patent Count'
                    },
                  }],
              }
          }
        });
      }
  });
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

  if(window.section==='sidenav_1')
  {
    hideDiv('card6');
    showDiv('patent_table');
    showDiv('card2');
    showDiv('card3');
    showDiv('card4');
    showDiv('card5');
    showDiv('card7');
    showDiv('card8');
  }
  else {
    showDiv('card6');
    hideDiv('patent_table');
    hideDiv('card2');
    hideDiv('card3');
    hideDiv('card4');
    hideDiv('card5');
    hideDiv('card7');
    hideDiv('card8');
  }


// Make changes for tab change
  // setHeading(elt.innerText);
}



//function to hide card visibility
function hideDiv(id) {
  var x = document.getElementById(id);
    x.style.display = "none";
}

//function to show card visibility
function showDiv(id) {
  var x = document.getElementById(id);
    x.style.display = "flex";
}


// this function sets the main heading according to the change in sections
function setHeading(text)
{
  var heading_div = document.getElementById("main-header__heading");
  heading_div.innerText = text;
}
