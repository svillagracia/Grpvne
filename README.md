# Grpvne

## Summary

**Grpvne** is an information aggregator created to bring users more than just the news. Pulling from the Reddit (r/worldnews and r/news), Twitter, and Instagram APIs, it takes into consideration multiple sources which gather information from both individuals *and* organizations in order to give a full breadth of information to the reader.

#### Approach

The plan of action for Grpvne was an aggregator that was for users and by users. This meant sourcing data in the most "organic" ways possible. Reddit, Twitter, and Instagram were the top considerations for user driven content. These are applications/websites that focus almost *solely* on user generated content. While, in the future, the plan is to have users of the application source content directly to the site by allowing them to post links and even self-written stories to the database, the other best option was deciding to use these three chosen APIs. This was the initial approach I ran with on the "alpha" product.

#### Coming from the Ice Box

- Allow users to give a "star" to tweets, photos, and articles.
- Allow users to save tweets and photos, along with articles, to their Trellis.
- Allow users to make comments on articles.
- Adding OAuth
- Clicking on article, photo, tweet will render data on the same page with modal/AJAX call of div without refreshing.
- HTML5 video in background on landing page.


#### Technologies Utilized

Grpvne collects and displays data with the use of:

- AJAX
- NodeJS
- Bootstrap
- JavaScript
- CSS3
- HTML5

**Node Modules**

- ExpressJS
- Express-Session
- Sequelize
- Bcrypt
- Body-Parser
- Request
- Instagram-Node-Lib
- Twitter
- PG (Postgress)
