let fetchAPI = (function () {
    let calculateResponseTime = (endTime, startTime) => {
        //The result of subtracting two dates is the number of milliseconds
        let timeDiff = endTime - startTime;
        // 1000 milliseconds in a second
        return timeDiff / 1000;
    };

    let insertResponseTime = () => {
        if ($('#fetchAPITime')) $('#fetchAPITime').remove();
        let $para = $("<p id = 'fetchAPITime' ></p>").html('').text('Response Time:' + calculateResponseTime(end, start));
        $para.insertBefore('#fetchAPI');
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

        let storyContainer = document.getElementById('fetchAPI'),
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

    let findStoryById = (storyId) => {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
            .then((resp) => resp.json())
            .then((story) => {
                addStoryToDOM(story);
            })
            .catch(error => console.log('error:', error));
    };

    let getStory = (url, limit) => {
        fetch(url)
            .then((resp) => {
                start = Date.now();
                return resp.json() // Transform the data into json
            })
            .then((storyIDs) => {
                limitedStoryIDs = storyIDs.slice(0, limit);
                limitedStoryIDs.forEach((storyId) => {
                    findStoryById(storyId)
                });
            })
            .then(() => {
                end = Date.now();
                insertResponseTime();
            }) 
            .catch(error => console.log('error:', error));
    };

    return {
        story: getStory
    }
}());

let fetchStories = (url) => {
    let storyContainer = document.getElementById('fetchAPI').innerHTML = "";
    let requestedStories = document.getElementById('fetchAPIStoryNumber').value;
    fetchAPI.story(url, requestedStories)
}

document.getElementById('fetchAPIButton').addEventListener('click', () => {
    fetchStories('https://hacker-news.firebaseio.com/v0/topstories.json');
})