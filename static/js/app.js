// connect to data.js and establish a variable to hold filtered data
let tableData = data;
let filteredData = data;

// ------------------------------------------------------------------
// SELECT HTML ELEMENTS WE'LL NEED TO USE LATER:
// ------------------------------------------------------------------

// select table body and table row from index
let tbody = d3.select("tbody");

// select the date dropdown menu
let date = d3.select("dateSelect");

// select the "reset" button
let button = d3.select("#reset-btn");

let option = d3.select("#select")


// ------------------------------------------------------------------
// FUNCTION TO DYNAMICALLY GENERATE DROPDOWN MENUS:
// ------------------------------------------------------------------

// establish a function that loops through data to find any keys we request
function populateDropdowns(key, arr) {

    // reset the dropdown menu, to retain only those selected values
    d3.select(`#${key}`).text("");

    // create an array of values for each key requested
    let keyTypes = arr.map(ufo => ufo[key]);

    // eliminate duplicates in the array
    function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
    }
    let uniqueKeys = keyTypes.filter(onlyUnique); 

    // loop through array and build html elements needed to create dropdown menu
    for (i = 0; i < uniqueKeys.length; i++) {
        d3.select(`#${key}`)
        .append("option")
        .property("value", uniqueKeys[i])
        .text(uniqueKeys[i].toUpperCase());
}
}

// ------------------------------------------------------------------
// FUNCTION TO CREATE TABLE:
// ------------------------------------------------------------------
 
// call the function
tableMaker();

// define the function 
function tableMaker(selectKey=false, selectedVal=false) {   
    
    // clear any table data previously rendered
    tbody.html("");

    // if selections have been made in dropdowns, proceed with function
    if(selectKey) {
        // filter data to just those objects with keys that match the input data 
        filteredData = filteredData.filter(ufo => ufo[selectKey] === selectedVal);
    }
    // otherwise, if no selections have been made, render a table with all of the data
    else {
        filteredData = tableData;
    }

    // loop through the filtered data
    filteredData.forEach(function(ufo) {
   
        // create a new table row in each iteration
        let row = tbody.append("tr");
    
        // for each key/value pair in each iteration...
        Object.entries(ufo).forEach(function([key, value]) {
    
            // create a 'td'...
            let cell = row.append("td");
        
            // and add the values of each key to each 'td'.
            cell.text(value);
        });
    });
   
        // call the dropdown functions
        populateDropdowns('datetime', filteredData);
        populateDropdowns('state', filteredData);
        populateDropdowns('shape', filteredData);
}

// ------------------------------------------------------------------
// RESET FILTERS & TABLE
// ------------------------------------------------------------------

// create a listener on "click" of the reset button
button.on("click", function() {

        // clear any table data previously rendered
        tbody.html("");

        // loop through the table data
        tableData.forEach(function(ufo) {

            // create a new table row in each iteration
            let row = tbody.append("tr");
       
            // for each key/value pair in each iteration...
            Object.entries(ufo).forEach(function([key, value]) {
       
            // create a 'td'...
            let cell = row.append("td");
       
            // and add the values of each key to each 'td'.
            cell.text(value);
        
        // repopulate dropdowns to initial setting
        populateDropdowns('datetime', tableData);
        populateDropdowns('state', tableData);
        populateDropdowns('shape', tableData);
        
        });
    });
});