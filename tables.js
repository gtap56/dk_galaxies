// JUST RPC AND SIGNATURE ETC.
const request = require("request");
const {
	Api,
	JsonRpc
} = require('eosjs');
const {
	JsSignatureProvider
} = require('eosjs/dist/eosjs-jssig');
const fetch = require('node-fetch');
const {
	TextDecoder,
	TextEncoder
} = require('util');  
 
var user = 'WAX';
const pk = ["PKEY"];

const signatureProvider = new JsSignatureProvider(pk);

const rpc = new JsonRpc("https://wax.greymass.com", {
	fetch
});
const api = new Api({
	rpc,
	signatureProvider,
	textDecoder: new TextDecoder(),
	textEncoder: new TextEncoder()
}); 

const axios = require('axios').default;


// THE TABLE CALLS BELOW

var planets = [];  

async function getPlanets(){  
(async () => {
try {
	const data = await rpc.get_table_rows({
		json:true,
		code: 'darkminingsc',
		scope: 'darkminingsc',
		table:'planets',
		lower_bound: '',
		upper_bound: '',
		index_position: 1,
		key_type: "i64" ,
		limit:100,
		reverse: false
});  
  
return data.rows;   

}catch (err) {
console.log(err);
}
})();	 
} 

// get slots


async function getSlots(planet_id){  
(async () => {
try {
	const data = await rpc.get_table_rows({
		json:true,
		code: 'darkminingsc',
		scope: planet_id,
		table:'slots',
		lower_bound: '',
		upper_bound: '',
		index_position: 1,
		key_type: "i64" ,
		limit:100,
		reverse: false
});  
console.log(data.rows)
return data.rows;   
}catch (err) {
console.log(err);
}
})();	 
} 


  for(i in planets){ 
	getSlots(planets[i]) 
}  
