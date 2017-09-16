$(function () {

    let loadStory = (url, limit) => {
        let insertDom = (story) => {
            let para = $("<p class = 'story--title' ></p>").text(story.title),
                link = $("<a class = 'story--link' ></a>").text('Read More...');

            $('#getJSON').append(para, [link]);
            $('a').attr('href', story.url).attr("target", "_blank");
        }

        $.getJSON(url)
            .then(function (storyIDs) {
                let storyLimitedIDs = storyIDs.slice(0, limit);
                return storyLimitedIDs;
            })
            .then((topStoryIDS) => {
                topStoryIDS.forEach((storyID) => {
                    $.getJSON(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`).then((storyDetail) => {
                        insertDom(storyDetail);
                    })
                })
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