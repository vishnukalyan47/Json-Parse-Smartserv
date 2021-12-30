function performGetRequest1() {
    var resultElement = document.getElementById("display");
    resultElement.innerHTML = "";
  
    // fetching the JSON data using axios library which returns a promise object as a response
    // Used Google Chrome extension to bypass the CORS Error - link to the extension - https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc
    axios
      .get("https://s3.amazonaws.com/open-to-cors/assignment.json")
      .then(function(response) {
        resultElement.innerHTML = generateSuccessHTMLOutput(response);
      })
      .catch(function(error) {
        resultElement.innerHTML = error;
      });
  }
  
  // function to generate received data in table format
  function generateSuccessHTMLOutput(response) {
    var products1 = JSON.stringify(response.data.products);
    var products = JSON.parse(products1);
    var tdata = "<table><th>Title</th><th>Price</th>";
    var keys = Object.keys(products);
    var sort = [];
    // converted the nested object into nested array
    for (let i = 0; i < keys.length; i++) {
      sort.push([
        products[keys[i]].title,
        products[keys[i]].price,
        products[keys[i]].popularity
      ]);
    }
  
    // sorting logic for the nested array similar to java's comparable/comparator logic
    sort.sort(function(a, b) {
      var valueA, valueB;
  
      // accessed popularity values
      valueA = a[2];
      valueB = b[2];
      if (+valueA > +valueB) {
        return -1;
      } else if (+valueA < +valueB) {
        return 1;
      }
      return 0;
    });
    
    // iteration to produce the display
    for (let j = 0; j < sort.length; j++) {
      tdata +=
        "<tr><td>" +
        sort[j][0] +
        "</td><td>" +
        sort[j][1] +
        "</td><td>" +
        "</tr>";
    }
    tdata += "</table>";
    return tdata;
  }