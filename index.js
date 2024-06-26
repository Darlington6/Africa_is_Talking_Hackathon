const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

// Route to handle USSD requests
router.post("/ussd", (req, res) => {
  // Read variables sent via POST from our SDK
  const { sessionId, serviceCode, text } = req.body;

  console.log('####################', req.body);
  let response = "";

  // Chained IF statements will take us through the USSD logic
  if (text === "") {
    response = `CON Choose an option to proceed:
        1. View National Budget
        2. View Local Budget
        3. Track Specific Expenditures
        4. Report Concerns
        5. Provide Feedback`;
  } else if (text === "1") {
    response = `END Rwanda's National Budget is Rwf 5,690.1 billion`;
  } else if (text === "2") {
    response = `CON Select a Province
    1. Kigali
    2. Southern Province
    3. Northern Province
    4. Eastern Province
    5. Western Province `;
  } else if (text === "2*1") {
    response = `END Kigali's local budget is Rwf 265.9 billion `;
  } else if (text === "2*2") {
    response = `END Southern Province's local budget is Rwf 125.8 billion `;
  } else if (text === "2*3") {
    response = `END Northern Province's local budget is Rwf 166.2 billion `;
  } else if (text === "2*4") {
    response = `END Eastern Province's local budget is Rwf 187.7 billion `;
  } else if (text === "2*5") {
    response = `END Western Province's local budget is Rwf 126.4 billion `;
  } else if (text === "3") {
    response = `CON Which specific expenditure would you want to track?
    1. Education
    2. Health
    3. Infrastructure `;
  } else if (text === "3*1") {
    response = `END Educational expenditure is Rwf 240.9 billion `;
  } else if (text === "3*2") {
    response = `END Health's expenditure is Rwf 130.5 billion `;
  } else if (text === "3*3") {
    response = `END Infrastructure's expenditure is Rwf 306.7 billion `;
  } else if (text === "4") {
    response = `CON Select an option below 
    1. Mismanagement of Funds
    2. Unfair Budget Distribution `;
  } else if (text === "4*1") {
    response = `END Thank You! Your report has been taken into consideration `;
  } else if (text === "4*2") {
    response = `END Thank You! Your report has been taken into consideration `;
  } else if (text === "5") {
    response = `END Thank You`;
  }
  // Print the response onto the page so that our SDK can read it
  res.set("Content-Type", "text/plain");
  res.send(response);
});

// Use the router for /ussd endpoint
app.use("/", router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});