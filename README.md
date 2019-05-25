# A Million Dollar Project

A web application that makes bullet journaling flexible and easy to use.

## Project Description

The project aims to resolve some of the common issues faced by bullet journalists: time-consuming styling, difficult 
to look up for an item, inflexibility in adding, editing, or deleting pages, etc. Bullet journals are known for its 
systematic approach to help planning and prioritization. By digitizing bullet journals, we are striving for improvements 
in usability and flexibility. Most data will be in the form of text and date/time. The system would require users to 
register and sign in before using. Users can primarily filter, search, view, add, edit, and delete the entries. 
Additional functionalities may include pagination, uploading images, allowing users to publicize or share their bullet 
journals, etc.

## Project Task Requirements

| **Minimal Requirements** |
| --- |
| Able to add, delete, and edit a message |
| Able to search/filter journal for keywords and dates |
| Able to create and login to account |
| Change status of task |
| Navigation bar (As index/table of content) and Drawer (As toolbar in edit mode) |

| **Standard Requirements** |
| --- |
| Multiple views (e.g. yearly, monthly, weekly, and daily, etc) |
| Pagination |
| Font customization |
| Able to customize bullet types |
| Keyboard shortcuts for formatting |
| Page flip animation (https://www.npmjs.com/package/react-flip-page) |

| **Stretch Requirements** |
| --- |
| Allow for images to be uploaded and inserted |
| Allow for user sharing and viewing | 
| Application of layout templates |
| Offline edits |

## Task Breakdown

**1. Able to add, edit, and delete a message**
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

**2. Drawer as toolbar**
   * Add a drawer that can be controlled to open and close
   * Add buttons to control different parts of the page (Need to finalize design first)
   * Add logout button
   * Add actions to clear the redux state upon logout
   
## Prototype
![Login Page](https://user-images.githubusercontent.com/10677430/58365568-37937a80-7e7b-11e9-8c27-7a84189b4bca.png)
![mockup_Page_1](https://user-images.githubusercontent.com/10677430/58365620-d8823580-7e7b-11e9-9634-be336e600455.png)
![mockup_Page_2](https://user-images.githubusercontent.com/10677430/58365622-e2a43400-7e7b-11e9-8767-7337a69151ba.png)
![mockup_Page_3](https://user-images.githubusercontent.com/10677430/58365624-e9cb4200-7e7b-11e9-8a3f-853a2652529d.png)
