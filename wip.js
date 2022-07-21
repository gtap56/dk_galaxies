
var allPlanetAssets = [];

var att = 'https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=darkgalaxies&schema_name=dark.planets&page=1&limit=100&order=desc&sort=asset_id';

 async function getDataAxios(url){
	var res = await axios.get(url);
	var data = res.data; 
	console.log(data);
	return data;
 }

 async function getAssetsBySchema(collection, schema) {
	 
	// hold the promises and the results
    let promises = [];
    let result = [];
	 
    let currentPage = 1;  
    let maxPages = 2;  // ??? 
	
	var atomic_url =
	  'https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=' +
	  collection +
	  '&schema_name=' +
	  schema +
	  '&page=' + 
	  currentPage +
	  '&limit=100&order=desc&sort=asset_id'; 
	  console.log(atomic_url);
	
	 
	
	// create api urls and get data
    while (currentPage <= maxPages) {   
      promises.push(await getDataAxios(atomic_url))
      currentPage++;  
    }

	// combine results into single array containing json objects
    const data = await Promise.all(promises); 
    data.forEach(({
      data
    }) => {
      result = [...result, data.res];
      allPlanetAssets = result;
	 
    });
 
	// past this part is messy but basically looping through the results array for data
 /*    for (i in result) { 
      for (a in result[i]) {
        var asset = result[i][a].asset_id; 
		var difficulty = result[i][a].template.immutable_data.difficulty; 
		console.log(asset + ' ' + difficulty);
      } 
    } */

console.log(allPlanetAssets);

  }
  
 getDataAxios(att) // this one should work fine, but the bottom one gives undefined...
  
// getAssetsBySchema('darkgalaxies', 'dark.planets');
