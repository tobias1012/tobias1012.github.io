---
layout: post
title:  "Creating a 'Static API' for fun and profit"
date:   2020-07-1 14:15:48 +0100
categories: server development
published : false
---

Some time ago, I ran into a project where the server's processing time was maxed out. This led me to explore alternative ways of building an API. One idea that came to mind was leveraging GitHub Pages, a free and reliable service, however it only supports static content. That raised an interesting challenge: could we simulate a dynamic API with a static site?



# The Idea

In many projects that don’t involve sensitive data, the need for a traditional backend can be minimal. 
Of course, backends are still important especially when dealing with proprietary data or operations requiring heavy processing. For simple public datasets however, client-side parsing might be a viable solution.

This experiment explores how we can create a "static API" that serves structured data via plain JSON, leaving the actual logic and parsing to the client.


## The Advantages

* Reduced server load.
* Possible to use GitHub Pages.
* Cheaper.
* Simpler.

## The Disadvantages

* No support for private or sensitive data.
* Extra strain on client.
* (This list is not exhaustive. Please consider your project’s specific requirements.)

# Proof of Concept

Here’s a simple proof of concept: a basic JavaScript implementation that fetches and parses data from a local JSON file. In this example, data is selected via radio buttons, and the corresponding field is displayed.


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

This setup is simple, but the concept can be extended to parse much more complex data structures on the client side.

If you want even more flexibility, you can dynamically load JavaScript code from a server:
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

This allows you to update your client-side logic dynamically


# Conclusion

It is certainly possible to use such a static API as presented in this post in a project like [Letra-Extension](https://github.com/jayehernandez/letra-extension), If this is viable is of course up to the author and creator. However this demonstrates a new approach to handling some public data without too much of a hassle. It should be noted that this is in no way a 'clean' solution and for portfolio projects this should probably not be used.
