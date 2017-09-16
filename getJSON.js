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
                let storyTopTenIDs = storyIDs.slice(0, limit);
                storyTopTenIDs.forEach((storyID) => {
                    $.getJSON(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`).then((storyDetail) => {
                        insertDom(storyDetail);
                    })
                })
            })
    };

    $('#getJSONButton').on('click', function(){
        $('#getJSON').empty(); //removes all the stories
        let limit = $('#getJSONStoryNumber').val()
        loadStory('https://hacker-news.firebaseio.com/v0/topstories.json', limit);
    })
    

})