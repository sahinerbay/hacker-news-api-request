let xmlHttpPlain = function () {

    let calculateResponseTime = (endTime, startTime) => {
        //The result of subtracting two dates is the number of milliseconds
        let timeDiff = endTime - startTime;
        // 1000 milliseconds in a second
        return timeDiff / 1000;
    };

    let insertResponseTime = () => {
        if ($('#plainTime')) $('#plainTime').remove();
        let $para = $("<p id = 'plainTime' ></p>").html('').text('Response Time:' + calculateResponseTime(end, start));
        $para.insertBefore('#plain');
    };

    let start, end;

    //Retrieve Story Details By ID
    let loadStoriesById = (storyId) => {
        let xhttp = new XMLHttpRequest();

        xhttp.onload = () => {
            if (xhttp.readyState === 4) { // XMLHttpRequest.DONE
                if (xhttp.status === 200) {
                    let resultObj = JSON.parse(xhttp.responseText);
                    
                    let plainDiv = document.getElementById('plain');

                    let para = document.createElement('p');
                    para.textContent = resultObj.title;
                    plainDiv.appendChild(para);

                    let link = document.createElement('a');
                    link.setAttribute('href', resultObj.url);
                    link.textContent = "read more...";
                    plainDiv.appendChild(link);
                } else console.log(`status: ${xhttp.status} and status-text: ${xhttp.statusText}`);
            }
        };

        xhttp.onerror = () => {
            console.log('Error fetching data.');
        };

        let url = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
        xhttp.open("GET", url); //leave empty or false for Asynchronous
        xhttp.send();
    }

    //Request First Story IDs then Limits The Story IDs Array and Calls loadStoriesById inside ForEach
    let loadStories = (url, callback, storyAmount) => {
        let xhttp = new XMLHttpRequest();

        xhttp.onload = () => {
            if (xhttp.readyState === 4) { // XMLHttpRequest.DONE
                if (xhttp.status === 200) {
                    start = Date.now();
                    let topStories = callback(xhttp.responseText, storyAmount);
                    topStories.forEach((storyId) => {
                        loadStoriesById(storyId);
                    })
                    end = Date.now();
                    insertResponseTime();

                } else console.log(`status: ${xhttp.status} and status-text: ${xhttp.statusText}`);
            }
        };

        xhttp.onerror = () => {
            console.log('Error fetching data.');
        };

        xhttp.open("GET", url); //leave empty or false for Asynchronous
        xhttp.send();
    };

    //Limit The Returned StoryIDs Array
    let getTopStories = (dataJSON, storyAmount) => {

        let resultObj = JSON.parse(dataJSON); //converts JSON to Object Deserializing
        let topStories = resultObj.filter((value) => {
            return resultObj.indexOf(value) < storyAmount;
        });

        return topStories;
    };

    return {
        loadStories: loadStories,
        getTopStories: getTopStories
    }
}();


let getStoryInput = () => {
    return document.getElementById('plainStoryNumber').value;
}

document.getElementById('plainButton').addEventListener('click', ()=> {
    //clear the inside of div
    let plainDiv = document.getElementById('plain').innerHTML = "";
    let requestedStories = getStoryInput();
    xmlHttpPlain.loadStories("https://hacker-news.firebaseio.com/v0/topstories.json", xmlHttpPlain.getTopStories, requestedStories);
})

