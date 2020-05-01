# Semantic Web Mining - Patent Database Dashboard

This is a web dashboard that runs using Java Spring, MySQl , HTML, CSS and JavaScript.

## Database Setup

Set up mysql with a user 'swmuser' and password 'password' and give the user access to the patents database and use `/data/database/patent_dashboard_db.sql` to insert required data into the database.

## Execution Steps
Execute the java spring backend built using Maven and run a simple http server within the UI folder to have the UI up and running.

## UI Screenshots
### Patent Viewer
![Alt text](/screenshots/patentViewer.png?raw=true "Patent Viewer")
### Topic Viewer
![Alt text](/screenshots/topicViewer.png?raw=true "Topic Viewer")

## Datasets
Datasets used include [SNAP Dataset](https://snap.stanford.edu/data/cit-Patents.html) and [NBER Datset](http://data.nber.org/patents/). Additional patent data was crawled using [Google Patents](https://www.google.com/?tbm=ptsl)
