# Semantic Web Mining - Patent Database Dashboard

This is a web dashboard that runs using Java Spring, MySQl , HTML, CSS and JavaScript.

## Database Setup

Set up mysql with a user 'swmuser' and password 'password' and give the user access to the patents database and use `/data/database/patent_dashboard_db.sql` to insert required data into the database.

## Execution Steps
Execute the java spring backend built using Maven and run a simple http server within the UI folder to have the UI up and running.

## Data location
Document data were processed and tokenized dataframes are stored in pickle files for easier reuse. Also the built LDA model and its associated dictionary and corpus are stored in a shared google drive. The link for the drive - https://drive.google.com/open?id=1zTgGrp4pGhyulAFFSbYaoglA3zO2mdWU

## UI Screenshots
### Patent Viewer
![Alt text](/screenshots/patentViewer.png?raw=true "Patent Viewer")
### Topic Viewer
![Alt text](/screenshots/topicViewer.png?raw=true "Topic Viewer")

## Datasets
Datasets used include [SNAP Dataset](https://snap.stanford.edu/data/cit-Patents.html) and [NBER Datset](http://data.nber.org/patents/). Additional patent data was crawled using [Google Patents](https://www.google.com/?tbm=ptsl)

