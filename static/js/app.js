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

    // if they key is the date...
    if(`${key}` === 'datetime') {
        
        // create an array of values for each key requested
        let keyTypes = arr.map(ufo => ufo[key]);

        // eliminate duplicates in the array
        function onlyUnique(value, index, self) { 
            return self.indexOf(value) === index;
        }
        let uniqueKeys = keyTypes.filter(onlyUnique); 

        // create a generic default selection option for the dropdown
        d3.select(`#${key}`)
            .append("option")
            .property("value", "selected disabled hidden") 
            .text("Select Option");

        // loop through array and build html elements to create other dropdown options
        for (i = 0; i < uniqueKeys.length; i++) {
            d3.select(`#${key}`)
            .append("option")
            .property("value", uniqueKeys[i])
            .text(uniqueKeys[i]);
        }
    }
    // otherwise, run same functions, but also alphabetize & uppercase results
    else {
        let keyTypes = arr.map(ufo => ufo[key]);

        function onlyUnique(value, index, self) { 
            return self.indexOf(value) === index;
        }
        let uniqueKeys = keyTypes.filter(onlyUnique); 

        d3.select(`#${key}`)
        .append("option")
        .property("value", "selected disabled hidden") 
        .text("Select Option");

        // alphabetize results
        let sortedKeys = uniqueKeys.sort();

        for (i = 0; i < sortedKeys.length; i++) {
            d3.select(`#${key}`)
            .append("option")
            .property("value", sortedKeys[i])
            // make it uppercase for readability
            .text(sortedKeys[i].toUpperCase());    
        }
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
    // otherwise, if no selections made (default on load), render table with all data
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

        filteredData = tableData;

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