# HackerNews API Requests

Retrieve data from HackerNews API via different Http request methods and add calculate response time.

# Getting Started

The application sends two requests to the [HackerNews API](https://github.com/HackerNews/API);

* Retrieve top 10 stories out of 500,
    
    Example: https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty

    ```
    [ 9129911, 9129199, 9127761, 9128141, 9128264, 9127792, 9129248, 9127092, 9128367, ..., 9038733 ]
    ```

* Get story details based on the story id

    Example: https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty

    ```
    {
        "by" : "dhouston",
        "descendants" : 71,
        "id" : 8863,
        "kids" : [ 8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067, 8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8878, 8870, 8980, 8934, 8876 ],
        "score" : 111,
        "time" : 1175714200,
        "title" : "My YC app: Dropbox - Throw away your USB drive",
        "type" : "story",
        "url" : "http://www.getdropbox.com/u/2/screencast.html"
    }
    ```

## Used Methods

* [xmlHTTP](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) 
* [xmlHTTP with Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) 
* [getJSON](http://api.jquery.com/jquery.getjson/) 
* [fetchAPI](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - The Task Automation
* [axios](https://github.com/mzabriskie/axios) - The Task Automation

## License

This project is licensed under the MIT License.

## Acknowledgments

* This project was done to practice different http request methods.
