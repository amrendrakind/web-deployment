# TinyList - A simple To Do app in React
This project is the frontend implementation of a simple todo app built using React & Material UI

## How to install deps
Fortunately, this part of the process is very simple.
We have `.nvmrc` file which contains the supported node version ( in our case it is 12 ).
Run the following command in order to set the correct node version - `nvm use` - in the root folder.

Once you have done this, simply write `yarn` & press enter command, this will pick all the deps from package.json and install it for you.

## Starting the project
Since the app was created using `create-react-app`, so package.json hasn't been modified much and by simplying running
`yarn start` you can start your project ( default port is 3000 )

## Feature Set
The app contains the following feature set

- [x] Make sure web app is responsive to different screen sizes
- [x] Display fixed header with TinyList logo
- [x] First row is “+ Add to list…” which user can click to type in anything. The entered text should replace the “Add to list…” placeholder.
- [x] When user hits “enter/return”, create item. Only create item if there is at least 1 character in the field.
- [x] Display uncompleted items first, with the most recently created item at the top
- [x] Then display completed items, with the most recently completed item at the bottom. Completed items should be greyed out with strikethrough.
- [x] On desktop, do not always display all trash cans. Only when user hovers over each row, highlight the row and display its trash can on the right
- [x] When user clicks on trash can, delete the item
- [x] When user clicks on any existing item, allow user to edit the text right there
- [ ] BONUS: When user checks, unchecks or creates a new task, use slide animation to show the task moving to its new position in the list according to the sorting logic above.
