//Retrieves All The StoryIds
const story = (function () {
    let calculateResponseTime = (endTime, startTime) => {
        //The result of subtracting two dates is the number of milliseconds
        let timeDiff = endTime - startTime;
        // 1000 milliseconds in a second
        return timeDiff / 1000;
    };

    let insertResponseTime = () => {
        if ($('#promiseTime')) $('#promiseTime').remove();
        let $para = $("<p id = 'promiseTime' ></p>").html('').text('Response Time:' + calculateResponseTime(end, start));
        $para.insertBefore('#promise');
    };

    let start, end;

    let getAllIds = (url) => {

        return new Promise(function (resolve, reject) {
            var xhttp = new XMLHttpRequest();

            xhttp.onload = () => {
                if (xhttp.readyState === 4) { // XMLHttpRequest.DONE
                    if (xhttp.status === 200) {
                        start = Date.now();
                        resolve(xhttp.responseText);
                    } else reject(Error(xhttp.statusText));
                }
            };

            //onerror fires when there is  a denied cross-domain request
            xhttp.onerror = () => {
                reject(Error('Error fetching data.'));
            };

            xhttp.open("GET", url); //leave empty or false for Asynchronous
            xhttp.send();
        })
    };

    //Cuts The Returned All StoryIds
    let limitIds = (storyIdJSON, end) => {
        let storyIds = JSON.parse(storyIdJSON);
        return storyIds.slice(0, end);
    }

    //Retrieves One Story Using StoryId
    let getOneStory = (storyId) => {

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

        var xhttp = new XMLHttpRequest();

        xhttp.onload = () => {
            if (xhttp.readyState === 4) { // XMLHttpRequest.DONE
                if (xhttp.status === 200) {
                    let storyDetailObject = getStoryDetail(xhttp.responseText);
                    insertStoryToDOM(storyDetailObject);
                } else console.log(`status: ${xhttp.status} and status-text: ${xhttp.statusText}`);
            }
        };

        //onerror fires when there is  a denied cross-domain request
        xhttp.onerror = () => {
            console.log('Error fetching data.');
        };

        xhttp.open("GET", `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`); //leave empty or false for Asynchronous
        xhttp.send();

    };

    let xmlHttpPromise = (url, limit) => {
        getAllIds(url)
            //Limit Return Story IDs
            .then((result) => {
                let topStoryIds = limitIds(result, limit);
                return topStoryIds;
            }, (error) => {
                console.log(error.message);
            })
            //Load Stories
            .then((topIds) => {
                topIds.forEach((id) => {
                    getOneStory(id);
                });
            })
            .then(() => {
                end = Date.now();
                insertResponseTime();
            })
    };

    return {
        xmlHttpPromise: xmlHttpPromise
    }
}());

let getStories = (url) => {
    let promiseDiv = document.getElementById('promise').innerHTML = "";
    let requestedStories = document.getElementById('promiseStoryNumber').value;
    story.xmlHttpPromise(url, requestedStories);
}

document.getElementById('promiseButton').addEventListener('click', () => {
    getStories('https://hacker-news.firebaseio.com/v0/topstories.json');
})