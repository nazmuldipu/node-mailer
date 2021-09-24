# Node Micro Mailer

A Node.js microservice for trigger email and store info into database

## Installation

Clone somewhere then create an `.env` file:

```
SMTP_USER=XXX
SMTP_PASSWORD=XXX
``` 

Then on your terminal run following command to install al dependencies
```
npm i
```

## Run 
```
npm start
```

## Test
To run the test code enter following command into your terminal
```
npm test
```
## Example test program

Start the service and send an email:

```
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "name": "your_name",
  "email": "youremail@gmail.com"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("localhost:3000/send", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

## API

```
POST /send
```

## Architecture

API => object validator => send email (non blocking) => store database (non blocking) => send response;



## Compromises/shortcuts

1. Url path kept into main root ("/", "/send") to remain the simplicity
2. Overall program structured / main portion of code remain index.js file, because of smaller size of aplication.
3. Only one Integreation test done here. Other unit test intentionally not done here due to time limitation.
4. Guarantee the resiliency of storing data into DB done default by mongodb. Mongoose commands are by default guarantee the resiliency of data. ref: https://docs.atlas.mongodb.com/resilient-application/

## Considerations
1. Presumed that the running system has all ready installed/running npm, mongodb system.
