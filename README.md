# DAMCO - FLEXDESK
## The Concept
### The Problem
At DAMCO in The Hague, there are 44 seats, and more that 44 employees.
But not every employee works every day at the office, sometimes they work at home.

### The Solution
This means that there needs to be a system that indicates how busy a day can become, so people can decide to work that day at home.

### The app
You can see the website live via [this URL](http://damco.whereilikemycoffee.com/).

# Workflow
This project contains a new branch for every feature. This creates a good summary of the entire project and keeps the code separate. *I’m writing an article about this, it will soon be posted on: [www.medium.com](https://medium.com/@martijnnieuwenhuizen)* 

## The Branches
### Branche: calendarCalc
Contains all the calculations that need to be done on for the calendar

### Branche: calendarPrototype
This calendar contains handwritten data. This is later automized on the Develop branch (should have been the Admin branch). This automation means that the admin can add a whole new year to the calendar, which is calculated by JavaScript (see: *routes/modules/createNewCalendar*).

### Branche: calenderResponsive
Testing and fixing the responsiveness of the calendar is done on the branch. 

*Note: * the weekends are hidden with only two lines of CSS, which are inspired by on the [Quantity Queries for CSS](http://alistapart.com/article/quantity-queries-for-css) article by [Heydon Pickering](http://www.heydonworks.com/).

*(7n+x)* the x stands for the item you want to start calculating. In this case the 6th and 7th item (sat/sun). The 7n means: count 7 items and hide that one, continue this until you run out of elements.

```
.calendar-days--item:nth-of-type(7n+6),
.calendar-days--item:nth-of-type(7n+7) {
    display: none;
}

```

### Branche: conformation
On every Submit, the user gets a confirmation for the day’s he changed. If you see this icon, the date you changed is confirmed by the server.

— INTERGRADE ICON —

### Branche: currentDay
The current day is highlighted with a hand drew circle that looks like this. 

— INTERGRADE ICON —

This is done by getting the current date on the server. If the current date matches a date in the current calendar month, it gets a class that contains this icon.

### Branche: deskCalculation
The calculation to indicate the amount of desks free for a particular day is done on this branch. For prototyping purposes, the calculation is:

```
(avalibleUsersThisDay / totalAmountOfUsers) * 100;
```

Done in the calculation module (routes/modules/calculation).

The real calculation sould be:

```
(totalAmountOfFlexDesks / totalAmountOfFlexUsers) * 100;
```

The flex is needed because if people have a Fixed desk, they don’t need to be intergraded in this calculation

### Branche: develop
The develop branch is the only branch that allows being merged with the master. This is also the branch that everything is tested on before it’s push to the master. I will highlight the purpose of this in the *soon coming* article on [www.medium.com](https://medium.com/@martijnnieuwenhuizen).

### Branche: explanation
After testing the first version of the app, not every action was immediately clear for the user. So besides a little redesign to make the app more intuitive for the user, there’s an explanation page integrated on the calendar page (marked: **i**).

### Branche: feedbackButton
The client’s company is located in The Hague, so testing isn’t really easy. Therefore, I build a possibility for a user to send feedback thru the site. Just click on the right button:

— Integrated Feedback Button IMG —

### Branche: gulp
There’s a gulp pipeline integrated into this project. The Gulp pipeline handles
- Sass compression
- Live Reload
- Image optimisation
- Compiling JS modules on the client site to one file (browserify)

This are the useful modules from the Gulpfile I use in the [Cobalt](https://github.com/MartijnNieuwenhuizen/cobalt) framework.

I’ve tried to use tooling only for reasons where I really need it.

### Branche: header
Adding the header to the layout file, instead of including it in every single page.

### Branche: login
Styling and building the login/sign-up flow. The flow is build to be as easy as possible, so the user is asked to fill in his Damco-email. If the email exists in the DB, the user is signed in, else the user needs to sign-up by choosing a type of desk. 

If you want to test it, you’re able to login with another username.

### Branche: master
This is the branch that’s on the live site. The **master** branch only contacts the **develop** branch and the develop branch is tested before going live. The roadmap for going live:

1. Go to the live server 
    - Push the master branch
2. Checkout the local develop branch
- Pull the master branch
- Fix potential merge conflicts
- Push the develop branch
3. Checkout the local master branch
- Pull the develop branch
- Push the master branch
4. Go to the live server
- Pull the master branch
- Restart Node.js

### Branche: mongoDB
Unfortunately not yet integrated, it’s on of the Todos. Currently, I use a JSON file on the server as a DB.

### Branche: monthSelector
Creating a working menu for selecting other months than the current months. Instead of using the *calendar.js* file for this, the server uses the *thisYear.js* file. The calculation is the same, but there’s a bit more of it (routes/thisYear.js).

### Branche: redesign
To improve the intuitive of the app, for the user, the app got a little redesign. This means the month selector at the top of the screen only shows the current months and the months before and after that. The alignment of the calendar is also optimized.

### Branche: server
The server setup at the begin of the project is done on this branch. Because a setup includes a lot of small parts, I've chosen to do this on the branch **server**. Done on this branch:
- Install Node.js
- Install Express.js
- Setup the first routes
- Setup the first views
- Create the basic routing logic
- Include the data files
- Install the needed Node Modules

### Branche: sessions
Express has the ability to create sessions. A session exists as long as the server runs, if not indicated otherwise. 

The sessions are used to keep the current user logged on. This quickens the flow. 

To create a session:

Add this to the **app.js**

```

app.set('trust proxy', 1);
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'E=MC2'
}))

```

To create a new session for a specific user
```

router.post('/login', function(req, res, next) {

      // the name filled in by the user
    var inputName = req.body.username.toLowerCase();

    // get the users DB
    fileHandling.read('./routes/data/users.json')
    .then(function(response) {
        
        var users = response;
        
        // if the users exists in the DB
        if ( users[0][inputName] ) {
            
            // create Session
            var sess = req.session;
            sess.views = 1;
            sess.userId = users[0][inputName].id;
            
            // rederect the user to the calendar
            res.redirect('/?first=true');

        } else {
            
            // render sign up page
            res.redirect('sign-up/' + inputName);

        }

    }).catch(function(res) {console.log("Error: ", res)});

});

```

Now you at every request to the server, you can ask for the ``` req.session ``` and get the stored information for this user.

This is done in: /*routes/modules/sessionHandling.js*

### Branche: showFeedback
To be able to read the feedback without having to login into the server, I created a URL that only the admin can use to read the feedback.

### Branche: spelling
One of the feedback items on the list was spelling, I've changed the spelling/words

### Branche: users
This branch contains everything that has something to do with the users. This is not the login/signup but stuff on the user-page. The user is able to change the type of desk he needs and is able to Logout.

### Branche: webApp
On this branch, the WebApp is created. this means eventually the whole site can run without a single reload. All the data is sent by a POST request to the server, is handled on the server and send back to the client. This means I can still use my server side logic and won't have to write that twice.


# Working with a Modular approach
To keep the code maintainable I use a modular approach. Not just on the Javascript but also on the SASS/CSS. Within two weeks, there will be an article about this on [www.medium.com](https://medium.com/@martijnnieuwenhuizen).

# Progressive Enhancement
The entire app is progressive enhances. Therefore the app is first built without any clientside Javascript. After that, the whole site is made into a Web App. Within two weeks, there will be an article about this on [www.medium.com](https://medium.com/@martijnnieuwenhuizen).

# ToDo
Of course a project is never done, but you can call it done if you can call it an MVP (Minimal Viral Product). And this is my MVP, but as I said, there is alway’s something to improve. Here is what I want to improve:

- Enhance the CSS for the calendar so the layout is better on IE8
- Enhance the mobile experience (no white block to the side)
- Enhance every page/connection via a POST and GET request (now it’s just the calendar)
- Enhance the app with Socket.io
- Write the logic to include the people with a fixed desk

For now, the site works on almost every browser. The experience on IE9 is not good enuff, this can be improved, and the experience on a small screen as well.


# Installation
If the want to install it:
- Clone this repo
- Run ``` $ npm install ```
- Run ``` $ node ./bin/www ```
- Run in another terminal ``` $ gulp server ```
- The server will start automatically on localhost:3000