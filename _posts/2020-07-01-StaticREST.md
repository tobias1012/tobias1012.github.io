---
layout: post
title:  "Creating a 'Static API' for fun and profit"
date:   2020-07-1 14:15:48 +0100
categories: server development
published : true
---

Some days ago I fell over a problem in a project where the server-time was all used up, this led me to think of other possible to solutions to an API. At first I started thinking about GitHub Pages since this is a free service, the only problem with this approach is this needs to be a static site with some sort of API to parse data for the end user to see.



# The Idea

In a project with no secret data, there isn't the biggest uses for a backend.
there are still a lot of reasons to have a backend, especially for proprietary software.

There is also a problem if the data is more than a normal computer can be expected to process quickly.
Therefore this is more of an experiment than anything else.


The main idea is to have a server which serves all the data, or all data in structured sections, and thereafter let the client parse this data with some code also fetched from the server.



## The Advantages

* Less strain on server.
* Possible to use GitHub Pages.
* Cheaper.
* Simpler.

## The Disadvantages

* Can't have secret data.
* Extra strain on client.
* NOTE: This is a non-exhaustive list. For your specific project there can be more.

# The PoC

This is a simple JavaScript-script in which we parse some data acquired from a remote server (local in this case)

This PoC simply returns a JSON field according to some a value, in this case given by the radio buttons. It is however possible to create more complicated functions to parse the data. It is important to keep in mind that all data will be parsed client-side and will therefore require some CPU resources to process.



------



<script src="{{base.url}}/assets/retriver.js"></script>
<form name="dataForm">
    <input type="radio" id="test1" name="data" value="test1" onclick="handleRadio('{{"/assets/data.json" | absolute_url}}' )" />
    <label for="test1">Test1</label><br>
    <input type="radio" id="test2" name="data" value="test2" onclick="handleRadio('{{"/assets/data.json" | absolute_url}}' )" />
    <label for="test2">Test2</label><br>
</form>
<h2>
    API Response:
</h2>
<p id="response">Please Select A Radio Button</p><br>

------

```javascript
function retrieveData(URL, data){

    var req = new XMLHttpRequest();

    //Our callback function that handles the response and sets it into the <p> tag
    req.onreadystatechange = function(){
        console.log(req.responseText);
        var obj = JSON.parse(req.responseText);
        document.getElementById("response").innerHTML = obj[data];
    }

    //send the request
    req.open("GET", URL, true);
    req.send();
}

function handleRadio(URL)
{
    //this is only for testing on local machine without changing CORS policy
    URL = URL.replace("localhost", "127.0.0.1");
    console.log("Clicked Radio")

    //find the radioButtons
    var buttons = document.dataForm.data;

    //call with the radio button value
    retrieveData(URL, buttons.value);
}
```

It is code in this case parses trivial data. It is certainly possible to have more complicated data parsed. and the Javascript can even be fetched from a server as shown below.

```javascript
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
```

This would allow to download a 'fresh' JavaScript source and then execute our functions from that. This would allow for some form of a static API



# Conclusion

It is certainly possible to use such a static API as presented in this post in a project like [Letra-Extension](https://github.com/jayehernandez/letra-extension), If this is viable is of course up to the author and creator. However this demonstrates a new approach to handling some public data without too much of a hassle. It should be noted that this is in no way a 'clean' solution and for portfolio projects this should probably not be used.
