let express =require('express');
let app = express();
let port = 8000;


app.listen(port,  function(err){
    if(err){
        console.log(`sarver is running fail: ${err}`)
    }   
    console.log(`sarver is running sucssesp: ${port}`) 
})
