$(function () {
    let calculateResponseTime = (endTime, startTime) => {
        //The result of subtracting two dates is the number of milliseconds
        let timeDiff = endTime.getTime() - startTime.getTime();
        // 1000 milliseconds in a second
        return timeDiff / 1000;
    };

    let start, end;

    let loadStory = (url, limit) => {

        let insertDom = (story) => {
            let para = $("<p class = 'story--title' ></p>").text(story.title),
                link = $("<a class = 'story--link' ></a>").text('Read More...'),
                time = $("<p id = 'getJSONTime' ></p>").text(story.title);

            $('#getJSON').append(para, [link]);
            $('a').attr('href', story.url).attr("target", "_blank");


        };

        let insertResponseTime = () => {
            if ($('#getJSONTime')) $('#getJSONTime').remove();
            let $para = $("<p id = 'getJSONTime' ></p>").html('').text('Response Time:' + calculateResponseTime(end, start));
            $para.insertBefore('#getJSON');
        };

        $.getJSON(url)
            .then(function (storyIDs) {
                start = new Date();
                let storyLimitedIDs = storyIDs.slice(0, limit);
                return storyLimitedIDs;
            })
            .then((topStoryIDS) => {
                $.each(topStoryIDS, (key, storyID) => {
                    $.getJSON(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`).then((storyDetail) => {
                        insertDom(storyDetail);
                    })
                })
            })
            .then(() => {
                end = new Date();
                insertResponseTime();
            })
    };

    let removeAllStories = (el) => {
        el.empty();
    }

    let getNumberOfStories = (input) => {
        return input.val();
    }

    $('#getJSONButton').on('click', function () {
        //Remove Stories
        let $stories = $('#getJSON');
        removeAllStories($stories);

        //Get Number Of Stories Input Value
        let $StoryNumberInput = $('#getJSONStoryNumber');
        let numberOfStories = getNumberOfStories($StoryNumberInput);

        //Fetch Stories
        loadStory('https://hacker-news.firebaseio.com/v0/topstories.json', numberOfStories);

    })
})