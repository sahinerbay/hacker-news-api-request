let axiosApi = (function () {
    let calculateResponseTime = (endTime, startTime) => {
        //The result of subtracting two dates is the number of milliseconds
        let timeDiff = endTime - startTime;
        // 1000 milliseconds in a second
        return timeDiff / 1000;
    };

    let insertResponseTime = () => {
        if ($('#axiosAPITime')) $('#axiosAPITime').remove();
        let $para = $("<p id = 'axiosAPITime' ></p>").html('').text('Response Time:' + calculateResponseTime(end, start));
        $para.insertBefore('#axiosAPI');
    };

    let start, end;

    let addStoryToDOM = (story) => {

        let createElement = (el) => {
            return document.createElement(el);
        };

        let createTextNode = (txt) => {
            return document.createTextNode(txt);
        };

        let append = (parent, el) => {
            return parent.appendChild(el);
        }

        let storyContainer = document.getElementById('axiosAPI'),
            para = createElement('p'),
            link = createElement('a');

        let storyTitle = createTextNode(story.title),
            linkTitle = createTextNode('Read More..');

        link.href = story.url;
        link.title = story.title;

        append(para, storyTitle);
        append(link, linkTitle);
        append(storyContainer, para);
        append(storyContainer, link);

    };

    let getStoryObject = (storyID) => {
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`)
            .then(function (response) {
                storyObject = response.data;
                return storyObject;
            })
            .then(function (story) {
                addStoryToDOM(story);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    let getStoryThroughId = (url, limit) => {
        axios.get(url)
            .then(function (response) {
                start = Date.now();
                let storyIDs = response.data;
                limitedStoryIDs = storyIDs.slice(0, limit);
                limitedStoryIDs.forEach((storyId) => {
                    getStoryObject(storyId);
                });
                
            })
            .then (()=> {
                end = Date.now();
                insertResponseTime();
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    return {
        getStories: getStoryThroughId
    }
}());

let loadStories = (url) => {
    let storyContainer = document.getElementById('axiosAPI').innerHTML = "";
    let requestedStories = document.getElementById('axiosAPIStoryNumber').value;
    axiosApi.getStories(url, requestedStories)
}

document.getElementById('axiosAPIButton').addEventListener('click', () => {
    loadStories('https://hacker-news.firebaseio.com/v0/topstories.json');
})