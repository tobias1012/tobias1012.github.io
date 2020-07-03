
function retrieveData(URI, data){

    var req = new XMLHttpRequest();

    //Our callback function that handles the response and sets it into the <p> tag
    req.onreadystatechange = function(){
        console.log(req.responseText);
        var obj = JSON.parse(req.responseText);
        document.getElementById("response").innerHTML = obj[data];
    }

    //send the request
    req.open("GET", URI, false);
    req.send();
}

function handleRadio(URI)
{
    //this is only for testing on local machine without changing CORS policy
    URI = URI.replace("localhost", "127.0.0.1");
    console.log("Clicked Radio")

    //find the radioButtons
    var buttons = document.dataForm.data;

    //call with the radio button value
    retrieveData(URI, buttons.value);
}

function getCode(URI){
    
    var req = new XMLHttpRequest();
    
    req.responseType = 'blob';
    req.onload = function(){
        var script = document.createElement('script');
        var source = URL.createObjectURL(req.response);

        script.src = source;
        document.body.appendChild(script);
    }

    req.open("GET", URI, true);
    req.send();
}