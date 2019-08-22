# A Million Dollar Project

A Bullet Journaling App created by [Candice Pang](https://github.com/dustxd), [Nerine Law](https://github.com/nerinelaw), [Sarah Ng](https://github.com/sarahngg)

## Project Description

The project aims to resolve some of the common issues faced by bullet journalists: time-consuming styling, difficulty to look up an item, inflexibility in adding, editing, or deleting pages, etc. Bullet journals are known for its systematic approach to help planning and prioritization. By digitizing bullet journals, we are striving for improvements in usability and flexibility. Most data will be in the form of text and date/time. The system would require users to register and sign in before using. Users can primarily filter, search, view, add, edit, and delete the entries. Additional functionalities may include displaying page number like, uploading images, allowing users to publicize or share their bullet journals, etc.

## Project Task Requirements

| **Minimal Requirements** |
| --- |
| Able to add, delete, and edit an item |
| Able to search/filter journal for keywords and dates |
| Able to create and login to account |
| Change status of task |
| Navigation bar (As index/table of content) and Drawer (As app info) |

| **Standard Requirements** |
| --- |
| Multiple views (Week, Page, and List views) |
| Keep track of displayed entry in Page view when user switches between tabs |
| Keyboard shortcuts for formatting |
| Style customization (change font style and theme colour) |

| **Stretch Requirements** |
| --- |
| Allow for images to be uploaded and inserted |
| Allow for user sharing and viewing |

## Task Breakdown

**1. Able to add, edit, and delete an item**
   * HomePage
     * This would be the first page the user sees once logged into the app
     * Add welcome text with the user’s first name (or stick with “Hi, Gorgeous!” until the backend is set up properly)
     * Add action for doing a GET request to fetch the user’s information and tasks
     * Add three buttons for (1) Adding a dated list, (2) Adding an undated list, and (3) Going to the last created/updated list
   * Add/Edit
     * Front End:
       * Implement a TextField without any outline until hovered over/on focus
Add actions for sending a PUT request to the backend to save the updated message
   * Delete
     * Front End:
       * Add erase icon onto the drawer toolbar
       * Change cursor into an eraser (or some other indication to show that erase mode is on)
       * Handle onClick action for the list items (i.e. status icon + task) when erase mode is on
       * Add actions for sending a DELETE request to the backend to remove the item

**2. Drawer as app info**
   * Add a drawer that can be controlled to open and close
   * Add buttons to control different parts of the page (Need to finalize design first)
   * Add logout button
   * Add actions to clear the redux state upon logout

## Prototype
* **Login Page**
![Login Page](https://user-images.githubusercontent.com/10677430/58365568-37937a80-7e7b-11e9-8c27-7a84189b4bca.png)

* **Overview Page**
![mockup_Page_3](https://user-images.githubusercontent.com/10677430/58365624-e9cb4200-7e7b-11e9-8a3f-853a2652529d.png)

* **Spread View** _(Later on evolved to Page View displaying only one entry at a time)_
![mockup_Page_1](https://user-images.githubusercontent.com/10677430/58365620-d8823580-7e7b-11e9-9634-be336e600455.png)

* **Week View**
![mockup_Page_2](https://user-images.githubusercontent.com/10677430/58365622-e2a43400-7e7b-11e9-8767-7337a69151ba.png)

## Glossary

*   The Bullet Journal Method - A rapid-logging technique that pairs short sentences and symbols (bullets) for journaling and list-making.
*   Entry - A container that holds the header, the bullets, and the line items that represent a list. Entries can be dated (i.e dated entry) or undated (i.e. collection).
*   Dated entry - A date sensitive entry representing a journal entry or diary entry about a certain date. User can add a dated entry for a date that is not today.
*   Collection - An entry that is generally not date sensitive, representing a to-do list or bulleted notes about a certain topic. For example, one could make a grocery list, bucket list, notes about React etc.
*   Header - The title of an entry. For dated entries, the header is the date the entry is written about. For undated entries, or collections, the header is the topic of the entry.
*   Created date - The create date is the time when an entry is created by the user. 
*   Display date - The display date of a dated entry is the date that the entry is written about, which is shown in the header of the dated entry. The display date can be different from the created date. For example, if a user created an entry today but wrote about yesterday, the display date of the entry is yesterday but the created date is today.
*   Bullet - A symbol in front of a short sentence representing the status of the text.
*   Line item - A subitem of an entry, containing a bullet and a short sentence.
*   Overview - A greeting page following the login screen. It contains the current time, a greeting message addressing the name of the user, an inspirational quote, and buttons to create new entries of various types.
*   Week view - A view containing all the dated entries of a specific week from Monday to Sunday. User can add new dated entries to a date with no entries yet. Collections, or undated entries, are not shown in weekly view.
*   Page view - A view displaying one entry at a time. It has full functionality such as add, edit, delete, and navigate to the next entry. It can display dated entries and collections.
*   List view - A concise view of all entries in a list form. List items display is limited to three items but user can expand the view, or even redirect to the entry in page view for editing. Search functionality is implemented in the search bar in this view. 


## Code Style

We mainly used Meteor as a means to read from and write to the database and made use of optimistic UI by using the withTracker function to reflect real time changes and apply query options/selectors on the client side. The client side methods are centralized in ui/actions/index.js. We use redux as a means to keep track of other information: loading, user, and page index states. We have our reducers organized and exported as a RootReducer from ui/reducers/index.js, which is persisted throughout the storage session, so that the information is not lost on page refresh. We used the connect function to map the Redux state to props in App.jsx, which is where we handle the routing for navigation and passed the relevant props to the children components (the different pages that we have in the app). Our components are organized based on different pages except for core, which is meant for any components that appear on multiple pages such as the AppBar and AccountDrawer. Next, on the backend side, we publish data to the client side whenever the user is logged in and actually has the permission to perform whatever action request that they sent to the backend. We used publishComposite when we needed to link two collections together for organizing the data into a set of useful and relevant information for the client subscribers. Again, we made use of MongoDB’s query selectors for finding and filtering information requested by the client, so that we only publish what the client needs, not everything all at once. 


## Basic Technology Requirements

### Unit 1 HTML5/CSS/JavaScript intro 

*   Used CSS in JS for Material UI and Javascript ES6 (originally used pure CSS but replaced with Material UI later in the project)
*   Integrated different libraries that are highly customizable for complex functionalities into our web application
    *   moment for handling date locales and material-ui-pickers
    *   material-table for organizing, searching, and filtering data dynamically

### Unit 2 React, Redux, Meteor front-end

*   Used redux to keep track of loading, user, and page index states
*   Meteor’s subscribe method for displaying entries and lineItems in the front end

### Unit 3 NodeJS and Meteor back-end

*   Used Meteor’s publish and publishComposite to push data to the client

### Unit 4 NoSQL and MongoDB

*   We used MongoDB as our database and made use of query selectors that we learnt in class to read and write data
*   The database is remotely hosted on Atlas as a cluster with read-and-write access limited to only our team

### Unit 5 Release engineering

*   The application is deployed on Herokuapp: [https://themilliondollarproject.herokuapp.com](https://themilliondollarproject.herokuapp.com)
*   We set up deployment environment variables on Herokuapp and enabled continuous deployment for master branch. During the sprint, we made our own branches to develop features and created pull requests to review each other’s changes. At the end of each sprint, we reviewed the overall changes and tested the new changes with the most updated version of master branch before actually merging our changes for the sprint into master. Hence, master is typically built and deployed once at the end of each sprint.


## Basic Contribution Requirements

*   Candice’s contributions to this project were mostly on laying out the overall architecture and leading the implementation of the functional requirements. This includes translating user requirements into specific structural goals, setting up project configurations, designing the underlying project structure, connecting the different parts of the application together (front-end to back-end and back-end with the database), and determining how React components should interact with each other, etc. She also focused on ensuring that the web application is functional at all times, keeping the development process to be on par with industry standards, and improving the code quality by enforcing object oriented design principles.
*   Nerine's contributions to this project focuses on implementing features to improve user experience. This includes implementing the page redirect features and page flip features, utilizing redux to bookmark the user's current page. Nerine also created the skeleton for the overview page and search page by researching and utilizing components from Material UI. On the administration side, Nerine partook in project management, organizing meeting dates and assisting with project documents. 
*   Sarah’s contributions to this project include UI/UX design, providing user stories, and ensure consistent branding throughout the app. She led the visual experience of the app, from sharing her love for bullet journaling, to sketching the product prototype, to applying Material UI to the app. Specifically, she used Adobe XD to prototype user experience, created the hierarchy of the various React components of the journal page, integrated Material UI React components and user interactions (tabs, app drawer, translucent page container, buttons), curated background images and inspirational quotes, and managed the app’s overall theme. She also helped with meeting minutes, documentation, and some manual testing.


## Basic Functionality Requirements

The Bullet Journaling App is a digital implementation of Ryder Caroll's Bullet Journal Method. The target audience of this app is existing bullet journalists who want to focus more on journaling rather than making their journal look presentable. Our app solves some main problems that paper journals have (see below). Although our app is not made for non-bullet-journalists, they can still use the app as an agenda and to-do list manager with search functionality to manage their tasks more efficiently.


### **Search**

It is no doubt that searching for a specific keyword in a paper journal is a tedious job. With our app, searching is quick and simple. User can search for any keyword or dates they used in their journal entries in the List View search bar.


### Fixing Mistakes and Aesthetic Presentation

For many people, setting up a paper bullet journal takes a lot of focus and can easily cause [mistakes](https://i1.wp.com/www.bohoberry.com/wp-content/uploads/2017/02/IMG_5442.png?w=1280) if not done properly. Since bullet journalists generally love to have presentable journals and tend to have low tolerance for aesthetic errors, they would spend more time covering up and fixing these mistakes. Some common fixes include starting over on a new page, covering the mistakes with another piece of paper or decorative tape, or even gluing two pages together to get rid of the eye sore. Our app would allow the users to correct mistakes instantly while adopting a minimalist and presentable aesthetic, using Material UI and consistent branding. 


### Various Views

Traditionally, paper bullet journalists would need to set up their journal by drawing the various standardized pages (index, monthly, daily view) in their journals specified in the Bullet Journal Method, which could be automated in its digital form. Effortlessly, our app displays the journal entries in multiple views (weekly, daily, list) and replaces the index page with our search functionality in List View. It automates the set up according to the Bullet Journal Method, which involves using different views to keep track of habits and goals effectively.


### Personal Information

Since journal entries can contain sensitive information, we require users to create accounts and login before they can start adding entries. And each account can only see entries that were created using that specific account.

## Challenges, learning, and future directions

### Challenges and learning

#### Challenge 1: Sorting dated entries by display date and sorting collections by date created

Generally, things are sorted by the time they were created. However, since we allow users to journal about a different date, the created date of the entry and the display date (the date the entry is about) may be different. If a user create an entry about last Monday, the entry would be sorted by the created date (today) rather than using the display date. 

*   Significance: If users created a dated entry to journal about a previous or future date, the entry would not be displayed in the date order it was written about.
*   Cause: Having two different types of entries - entries and collections which were being sorted by the time the entry was created at
*   Solution process: Surveyed our code review section to determine how dated entries should be sorted 
*   Final resolution: Modified the data structure: sort dated entries by date (header) and collections by date created 
*   Satisfaction: Allows for users to sort through entries more intuitively and efficiently
*   Lesson learned: We learned to develop a more extensive user story and to ask for potential user feedback when developing features for a user-centered application.

#### Challenge 2: Connecting Meteor application to remote MongoDB server

*   Significance: Without the connection, the app could only display dummy data and lacked user interaction.
*   Cause:
    *   Turned off `autopublish` and insecure packages too early on - we could not figure out why the data wasn’t returning
    *   Meteor has local instance of MongoDB integrated, so there were not a lot of tutorials out there specifically for connecting a Meteor react app to a remote MongoDB server like Atlas
*   Solution process: Researched on how Meteor uses MiniMongo and read a lot of the related official documentation and tutorials. Then as a team, we mapped out our understanding about the process and flow to pinpoint issues. Also seeked for help from TAs and classmates.
*   Final resolution: Restored changes and did things one at a time. We made sure that everything is working before proceeding to the next step.
*   Satisfaction: We saw the importance of having good commits, which helped us restore the changes easily. Scoping down changes reduced variability and made the process a lot smoother.
*   Lesson learned: When tackling a complicated task, we should stay focused in one goal at a time. It is important to reduce variability by defining the scope of changes and outline the steps needed to achieve a goal.

### Future Directions

*   Aesthetic customization abilities: We hope to add functionalities such as changing the app color themes and allowing image insertions in journal entries. 
*   Pagination: As scaling user growth was not explicitly addressed in the course, we would like to explore approaches to most effectively paginate the user entries.
*   Adding all editing functionalities to all views: We hope to allow add, edit, and delete entries and items in views other than the Page View. Currently, other views have some of the functionalities but not all.
*   Sharing lists: Some users have requested the ability to share entries with others or to email themselves certain page, and we would love to address that as well.
*   Mobile friendliness: We want to allow users to use the app on their mobile devices more effectively by adding mobile responsiveness to the various views of the app.
*   Adding product landing page: We hope to add a product landing page to better describe what our app has to offer and display some use cases like a commercial app. Currently, user must make an account before being able to use the functionalities of our app. 


## Initiative and additional contributions

### Integrated Material UI and using CSS in JS to style app rather than pure CSS

*   Used Material UI for greater UI consistency by making use of themes
*   Read additional documentation and example code to learn how to implement Material UI
*   Created additional components/integrated existing components with Material UI components

### Implemented our own login and sign up interface

*   Maintained consistent branding across the application by using Material UI for authentication instead of using the default accounts-password interface
*   Did extensive research on understanding the different requirements about secure authorization to handle the Meteor authentication connection to our own customized components

### Adopted industry practice by using the Agile methodology

*   Planned and kept track of issues and individual tasks for each sprint
*   Created pull requests and performed code reviews
*   Only merged into master after carefully testing changes with the latest version of master each sprint

### Set up eslint using airbnb style and used redux dev tools to inspect state

*   Learned proper Javascript ES6 syntax
*   Maintained consistent code style for better readability, which made the debugging process more efficient
