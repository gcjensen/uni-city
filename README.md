# UniCity

An API and application providing information on a (growing) collection of cities based around UK universities.

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
 
After cloning the repo, the API and application can be built and run by following these steps:
1. Obtain a [Google Places API key](https://developers.google.com/places/web-service/get-api-key)
2. Put your API key in a file called google-places-api-key.txt and save it in the [config](/server/config) directory
3. Execute the following:
 ```
 cd uni-city
 npm install
 npm start
```

The application can then be found at [localhost:8080/](http://localhost:8080/) and the API documentation at [localhost:8080/docs](http://localhost:8080/docs).

API tests can be run with `npm test`.

#### Troubleshooting

If upon running the application the node interpreter complains about ES6 syntax, you will need to update your version of Node.
