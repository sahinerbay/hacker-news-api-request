let xmlHttpPlain = function () {
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
            console.log(`status: ${xhttp.status} and status-text: ${xhttp.statusText}`);
        };

        let url = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
        xhttp.open("GET", url); //leave empty or false for Asynchronous
        xhttp.send();
    }

    let loadStories = (url, callback, storyAmount) => {
        let xhttp = new XMLHttpRequest();

        xhttp.onload = () => {
            if (xhttp.readyState === 4) { // XMLHttpRequest.DONE
                if (xhttp.status === 200) {
                    let topStories = callback(xhttp.responseText, storyAmount);
                    topStories.forEach((storyId) => {
                        loadStoriesById(storyId);
                    })

                } else console.log(`status: ${xhttp.status} and status-text: ${xhttp.statusText}`);
            }
        };

        xhttp.onerror = () => {
            console.log(`status: ${xhttp.status} and status-text: ${xhttp.statusText}`);
        };

        xhttp.open("GET", url); //leave empty or false for Asynchronous
        xhttp.send();
    };

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

