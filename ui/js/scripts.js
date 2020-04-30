//function to be performed on loading webpage
function initializerFunction() {
    //set first sidenav as initial option
    window.section = "sidenav_1";
    window.start = 0;
    window.limit = 10;
    window.page = 1;
    window.year = 1963;
    window.playing = false;
    Chart.defaults.global.defaultFontFamily = "'Sen', sans-serif";
    Chart.defaults.global.defaultFontStyle = "bold";
    getTopicData();
    updateCard6();
    getCard9Data();
    hideDiv('card6');
    hideDiv('card9');
    hideDiv('card10');
}


//function ot fetch topic dataset
function getTopicData() {
  $.ajax({
      type:"GET",
      url: "http://localhost:8080/api/get_topic_data",
      dataType: "JSON",
  }).then(function(data) {
    window.topic_data_description = data;

    var topicData = {};

    for(i=0;i<10;i++)
    {
      topicKey = "topic"+i;
      topic = {}
      words = [];
      probabilities = [];
      for(j=0;j<5;j++)
      {
        index = i*5 + j;
        words.push(data[index]['word']);
        probabilities.push(data[index]['probability']);
      }
      topic['words'] = words;
      topic['probabilities'] = probabilities;
      topicData[topicKey] = topic;
    }

    window.topic_data_description = topicData;
  });
}


//function to change page when nav buttons are Clicked
function pageChange(inp) {
  if(inp.id==='n')
  {
    if(window.page<100)
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
  $('#patentTitleLink').html(window.patentId);
  var patentTitleLink = document.getElementById('patentTitleLink');
  var hrefText = "https://patents.google.com/patent/"+window.patentId;
  patentTitleLink.href = hrefText;

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
          // window.tfidfDrawnChart.destroy();
          patents.forEach((item, i) => {
            window.tfidfDrawnChart.data.datasets[0].data[i] = similarities[i];
            window.tfidfDrawnChart.data.labels[i] = patents[i];
          });
          window.tfidfDrawnChart.update();
        }
        else {
          window.tfidfDrawnChart = new Chart(tfidfChart, {
            type: 'horizontalBar',
            data: {
                labels: patents,
                datasets: [{
                    label: 'Similarity % ',
                    data: similarities,
                    backgroundColor: 'rgba(171, 108, 130, 0.7)',//'#AB6C82',
                    borderColor: '#AB6C82',
                    borderWidth: 2,
                }]
            },
            options: {
                // responsive: false,
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
                          labelString: 'Similarity % (Cosine)'
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
      }
      else {
        $('#card3Text').html('No Data Available');
        if(window.tfidfDrawnChart!==undefined)
        {
          window.tfidfDrawnChart.destroy();
        }
      }

  });
}


//function to update card 2
function updateCard4() {
  $.ajax({
      type:"GET",
      url: "http://localhost:8080/api/patent_similarities_lda/",
      data: {
          "patent_id": window.patentId,
      },
      dataType: "JSON",
      success:function(data) {
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
            similarities.push(data[similarityKey].toFixed(4));
          }

          var ldaChart = document.getElementById('ldaChart').getContext('2d');

          //draw new chart only if chart doesn't already exist
          if(window.ldaDrawnChart!==undefined)
          {
            // window.ldaDrawnChart.destroy();
            patents.forEach((item, i) => {
              window.ldaDrawnChart.data.datasets[0].data[i] = similarities[i];
              window.ldaDrawnChart.data.labels[i] = patents[i];
            });
            window.ldaDrawnChart.update();
          }
          else {
            window.ldaDrawnChart = new Chart(ldaChart, {
              type: 'horizontalBar',
              data: {
                  labels: patents,
                  datasets: [{
                      label: 'Shannon Entropy',
                      data: similarities,
                      backgroundColor: 'rgba(216, 115, 127, 0.7)',
                      borderColor: '#D8737F',
                      borderWidth: 2,
                  }]
              },
              options: {
                  // responsive: false,
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
                            labelString: 'Shannon Entropy',
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
        }
        else {
          $('#card4Text').html('No Data Available');
          if(window.ldaDrawnChart!==undefined)
          {
            window.ldaDrawnChart.destroy();
          }
        }
    },
    error: function(errorThrown)
    {
      console.log(errorThrown);
    },
  });
}


//function to update card 7
function updateCard7() {
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
          // window.embeddingDrawnChart.destroy();
          patents.forEach((item, i) => {
            window.embeddingDrawnChart.data.datasets[0].data[i] = similarities[i];
            window.embeddingDrawnChart.data.labels[i] = patents[i];
          });
          window.embeddingDrawnChart.update();
        }
        else {
          window.embeddingDrawnChart = new Chart(embeddingChart, {
            type: 'horizontalBar',
            data: {
                labels: patents,
                datasets: [{
                    label: 'Euclidean Distance',
                    data: similarities,
                    backgroundColor: 'rgba(216, 115, 127, 0.7)',
                    borderColor: '#D8737F',
                    borderWidth: 2,
                }]
            },
            options: {
                // responsive: false,
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
      }
      else {
        $('#card7Text').html('No Data Available');
        if(window.embeddingDrawnChart!==undefined)
        {
          window.embeddingDrawnChart.destroy();
        }
      }

  });
}


//function to update card 8
function updateCard8() {
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
          // window.bertDrawnChart.destroy();
          patents.forEach((item, i) => {
            window.bertDrawnChart.data.datasets[0].data[i] = similarities[i];
            window.bertDrawnChart.data.labels[i] = patents[i];
          });
          window.bertDrawnChart.update();
        }
        else {
          window.bertDrawnChart = new Chart(bertChart, {
            type: 'horizontalBar',
            data: {
                labels: patents,
                datasets: [{
                    label: 'Euclidean Distance',
                    data: similarities,
                    backgroundColor: 'rgba(216, 115, 127, 0.7)',
                    borderColor: '#D8737F',
                    borderWidth: 2,
                }]
            },
            options: {
                // responsive: false,
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
      }
      else {
        $('#card8Text').html('No Data Available');
        if(window.bertDrawnChart!==undefined)
        {
          window.bertDrawnChart.destroy();
        }
      }
  });
}


//function to update card 5
function updateCard5() {

  $.ajax({
      type:"GET",
      url: "http://localhost:8080/api/patent_topics/",
      data: {
          "patent_id": window.patentId,
      },
      dataType: "JSON",
  }).then(function(data) {
    window.patent_topic_distribution = data;

    console.log(data);
    var topics = [];
    var probabilities = [];

    if(data.length!==0)
    {
      $('#card5Text').html('');


      for(i=0;i<10;i++)
      {
        topicKey = "topic"+i;
        topics.push(topicKey);
        probabilities.push(data[topicKey].toFixed(4));
      }

      //get chart
      var topicDistributionChart = document.getElementById('topicDistributionChart');

      //draw new chart only if chart doesn't already exist
      if(window.topicDistributionDrawnChart!=undefined)
      {
        probabilities.forEach((item, i) => {
          window.topicDistributionDrawnChart.data.datasets[0].data[i] = item;
        });
        window.topicDistributionDrawnChart.update();
      }
      else
      {
        window.topicDistributionDrawnChart = new Chart(topicDistributionChart, {
          type: 'radar',
          data: {
            labels: topics,
            datasets: [{
              fill: 'origin',
              data: probabilities,
              backgroundColor: 'rgba(216, 115, 127, 0.7)',
              borderColor: '#AB6C82',
              borderWidth: 2,
            }],
          },
          options: {
            legend: {
              display: false,
            },
            scale: {
              angleLines: {
                display: false
              },
              ticks: {
                beginAtZero: true,
                suggestedMin: 0,
              },
            },
            tooltips: {
              enabled: true,
              mode: 'single',
              callbacks: {
                  label: function(tooltipItems, data, index) {
                      return window.topic_data_description['topic'+tooltipItems.index]['words'];
                  }
              },
            },
          },
        });
      }
    }
    else {
      $('#card5Text').html('No Data Available');
      if(window.topicDistributionDrawnChart!=undefined)
      {
        window.topicDistributionDrawnChart.destroy();
      }
    }
  });
}

//function to update card 6
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
                  label: 'Patent Count',
                  data: counts,
                  backgroundColor: 'rgba(216, 115, 127, 0.7)',//'#D8737F',
                  borderColor: '#AB6C82',
                  borderWidth: 2,
              }]
          },
          options: {
              // responsive: false,
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


//function to play simulation
function playYearTopicSim()
{
  if(window.playing === false)
  {
    var sliderButton = document.getElementById("sliderButtonText");
    sliderButton.classList.remove("fa-play");
    sliderButton.classList.add("fa-pause");
    window.playing = true;
    window.timerId = setInterval(() => {
      if(parseInt(window.year)>=1999)
      {
        window.year=1963;
        updateCard9();
        clearInterval(window.timerId);
        window.playing=false;
        var sliderButton = document.getElementById("sliderButtonText");
        sliderButton.classList.remove("fa-pause");
        sliderButton.classList.add("fa-play");
      }
      else {
        window.year++;
      }
      updateCard9()
     }, 1000);
    window.year = parseInt(document.getElementById('slider').value);
    var timeoutDuration = (2000 - parseInt(window.year) + 2)*1000;
    setTimeout(() => {
      clearInterval(window.timerId);
      window.playing=false;
      var sliderButton = document.getElementById("sliderButtonText");
      sliderButton.classList.remove("fa-pause");
      sliderButton.classList.add("fa-play");
    }, timeoutDuration);
  }
  else {
    clearInterval(window.timerId);
    window.playing=false;
    var sliderButton = document.getElementById("sliderButtonText");
    sliderButton.classList.remove("fa-pause");
    sliderButton.classList.add("fa-play");
  }
}


//function to update value along with slider
function sliderUpdate() {
  window.year = document.getElementById('slider').value;
  $('#sliderValue').html(window.year);
  updateCard9();
}

function getCard9Data() {
  $.ajax({
      type:"GET",
      url: "http://localhost:8080//api/patent_yearwise_topics",
      dataType: "JSON",
  }).then(function(data) {

    var dataDictionary = {};
    for(i=0;i<data.length;i++)
    {
      dataDictionary[parseInt(data[i].year)] = [data[i].topic0, data[i].topic1, data[i].topic2, data[i].topic3, data[i].topic4, data[i].topic5, data[i].topic6, data[i].topic7, data[i].topic8, data[i].topic9];
    }
    window.topicYearData = dataDictionary;
    updateCard9();
  });
}

//function to update card 9
function updateCard9() {

  //get chart
  var topicYearChart = document.getElementById('topicYearChart').getContext('2d');

  // update slider value
  document.getElementById('slider').value = parseInt(window.year);
  $('#sliderValue').html(window.year);

  //define dataset
  labels = ['Topic0','Topic1','Topic2','Topic3','Topic4','Topic5','Topic6','Topic7','Topic8','Topic9'];
  topicData = window.topicYearData[parseInt(window.year)];

  //draw new chart only if chart doesn't already exist
  if(window.topicYearDrawnChart!==undefined)
  {
    topicData.forEach((item, i) => {
      window.topicYearDrawnChart.data.datasets[0].data[i] = item;
    });
    window.topicYearDrawnChart.update();
  }
  else
  {
    window.topicYearDrawnChart = new Chart(topicYearChart, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          fill: 'origin',
          labels: labels,
          data: topicData,
          backgroundColor: 'rgba(216, 115, 127, 0.7)',
          borderColor: '#AB6C82',
          borderWidth: 2,
        }],
      },
      options: {
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
              label: function(tooltipItems, data) {
                  return window.topic_data_description['topic'+tooltipItems.index]['words'];
              }
          },
        },
        legend: {
          display: false,
        },
        scale: {
          angleLines: {
            display: false
          },
          ticks: {
            beginAtZero: true,
            suggestedMin: 0,
          },
        }
      },
    });
  }
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

  if(start>95)
  {
    start = 96;
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
    updateColumnCount(3);

    hideDiv('card6');
    hideDiv('card9');
    hideDiv('card10');

    showDiv('patentTitle');
    showDiv('patent_table');
    showDiv('card2');
    showDiv('card3');
    showDiv('card4');
    showDiv('card5');
    showDiv('card7');
    showDiv('card8');
  }
  else if(window.section==='sidenav_2'){
    updateColumnCount(2);

    showDiv('card6');
    showDiv('card9');

    hideDiv('patentTitle');
    hideDiv('patent_table');
    hideDiv('card2');
    hideDiv('card3');
    hideDiv('card4');
    hideDiv('card5');
    hideDiv('card7');
    hideDiv('card8');
    hideDiv('card10');
  }
  else {
    updateColumnCount(1);

    showDiv('card10');

    hideDiv('card2');
    hideDiv('card3');
    hideDiv('card4');
    hideDiv('card5');
    hideDiv('card6');
    hideDiv('card7');
    hideDiv('card8');
    hideDiv('card9');
    hideDiv('patentTitle');
    hideDiv('patent_table');
  }

// Make changes for tab change
  // setHeading(elt.innerText);
}



//function to update column count
function updateColumnCount(val)
{
  var x = document.getElementById('mainCards');
  x.style.columnCount = val;
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
