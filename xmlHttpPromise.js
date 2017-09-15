//Retrieves All The StoryIds
let getAllStoryIds = (url) => {

    return new Promise(function (resolve, reject) {
        var xhttp = new XMLHttpRequest();

        xhttp.onload = () => {
            if (xhttp.readyState === 4) { // XMLHttpRequest.DONE
                if (xhttp.status === 200) {
                    resolve(xhttp.responseText);
                } else reject(Error(xhttp.statusText));
            }
        };

        //onerror fires when there is  a denied cross-domain request
        xhttp.onerror = () => {
            reject(Error(xhttp.statusText));
        };

        xhttp.open("GET", url); //leave empty or false for Asynchronous
        xhttp.send();
    })
};

//Cuts The Returned All StoryIds
let limitStoryIds = (storyIdJSON, end) => {
    let storyIds = JSON.parse(storyIdJSON);
    return storyIds.slice(0, end);
}

//Retrieves One Story Using StoryId
let getOneStory = (storyId) => {
    return new Promise(function (resolve, reject) {
        var xhttp = new XMLHttpRequest();

        xhttp.onload = () => {
            if (xhttp.readyState === 4) { // XMLHttpRequest.DONE
                if (xhttp.status === 200) {
                    resolve(xhttp.responseText);
                } else reject(Error(xhttp.statusText));
            }
        };

        //onerror fires when there is  a denied cross-domain request
        xhttp.onerror = () => {
            reject(Error(xhttp.statusText));
        };

        xhttp.open("GET", `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`); //leave empty or false for Asynchronous
        xhttp.send();
    })
}

//Converts JSON to Object
let getStoryDetail = (storyDetailJSON) => {
    let storyDetail = JSON.parse(storyDetailJSON);
    return storyDetail;
}

//Inserts <p> StoryTitle and <a> StoryUrl into DOM
let insertStoryToDOM = (story) => {
    let promiseDiv = document.getElementById('promise');
    
    let para = document.createElement('p'),
        title = document.createTextNode(story.title);

    para.appendChild(title);
    promiseDiv.appendChild(para);

    let link = document.createElement('a');
    link.setAttribute('href', story.url);
    link.textContent = 'Read More...';

    promiseDiv.appendChild(link);
}

let xmlHttpPromise = (url, limit) => {
    getAllStoryIds(url).then((result) => {
        let topStoryIds = limitStoryIds(result, limit);
        topStoryIds.forEach((value) => {
            getOneStory(value).then((result) => {
                let storyDetailObject = getStoryDetail(result);
                insertStoryToDOM(storyDetailObject);
            })
        });

    });
}

let getStoryPromiseInput = () => {
    return document.getElementById('promiseStoryNumber').value;
}

document.getElementById('promiseButton').addEventListener('click', () => {
    //clear the inside of div
    let promiseDiv = document.getElementById('promise').innerHTML = "";
    let requestedStories = getStoryPromiseInput();
    xmlHttpPromise('https://hacker-news.firebaseio.com/v0/topstories.json', requestedStories);
})