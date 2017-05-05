# UniCity

An API and application providing information on a (growing) collection of cities based around UK universities

### Data Sources

Currently the application provides information on each city about:
* monthly rent prices
* broadband speeds
* crime rates
* wages
* food costs
* nightlife

The data has come from a variety of open data sources, such as gov.uk, police.uk, and ons.gov.uk. The nightlife data uses the Google Places API.

### Building and Running
 
After cloning the repo, the API server and application can be built and run by executing the following:
```
cd uni-city
npm install
npm start
```

The application can then be found at [localhost:8080/](localhost:8080/) and the API documentation at [localhost:8080/docs](localhost:8080/docs).

#### Troubleshooting

If upon running the application the node interpreter complains about ES6 syntax, you will need to update your version of Node.
