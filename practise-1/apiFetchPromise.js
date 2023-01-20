var axios = require('axios');

var getAPICategory = async (url) =>{
    const req = await axios.get(url);
    
    var categ = {};
    var resultObj = {} 

    if(req.status === 200){
        var response = req.data.entries;
        response.forEach(entry => {
            categ[entry.Category] = 1;
        });
        
        for (var c in categ){
            var categURL = "https://api.publicapis.org/entries" + "?Category=" + c;
            var categResponse = await axios.get(categURL);

            if (categResponse.status === 200){
                resultObj[c] = categResponse.data.count;
            }
        }
        
        var resJson = JSON.stringify(resultObj);
        console.log(resJson);
    }
}


console.log("Before fetching URL");
getAPICategory("https://api.publicapis.org/entries");
console.log("After fetching URL");

/*
var getAPICategory = (url) =>{
    const req = axios.get(url);
    console.log(req);

    var categ = "";

    req.then((res)=>{
        var listofentries = res.data.entries;
        listofentries.forEach((entry) => {
            categ += entry.Category;
        });
        console.log(categ);
    })
    .catch(err =>{
        console.log(err.toString());
    })
}

*/

