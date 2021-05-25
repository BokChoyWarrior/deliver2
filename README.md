# deliver2
Test delivery webapp

### Planned Features
##### General
- [x] Login page
- [x] Shop selector
- [x] Order page
- [x] Shopping basket
- [ ] Main page layout decided
##### Tech stuff
- [ ] The API (WIP)
- [ ] Contacting our own DB server
- [ ] Unit testing (WIP)
- [ ] Login sessions for API (WIP)

## Setup
### Prerequisites
To set up the app, you'll need some things installed:

- [node.js](https://nodejs.org/en/)
- Text editor/IDE of your choice (I recommend [VS Code](https://code.visualstudio.com/))
- [Git](https://git-scm.com/)

For all of the above, Make sure you choose the correct version (32bit or 64bit) for your OS
#### ⚠️⚠️⚠️⚠️
**You will need the ".env" file from someone before the webapp can contact the mongoDB server. Please ask for it from Charlie or Harvey!**
### Installation

1. First of all, create and navigate to a directory in which you'd like to store the project. E.g. `C:\Dev\`

2. Clone the project with `git clone https://github.com/BokChoyWarrior/deliver2`. In windows you'll need to run this from git bash terminal **Make sure you clone into the directory you made in step 1!**

3. Change your current directory to `xyz\deliver2\`, so if you ran the **clone** command in `C:\Dev\`, you would now want to be inside `C:\Dev\deliver2\`

4. Install dependencies - `npm install`

5. Make sure you have the .env file inside `deliver2/`

6. Run the app - `npm run dev`

You should see output similar to this:
```
C:\Dev\Basketdrop\deliver2>npm run dev

> deliver2@0.0.0 dev C:\Dev\Basketdrop\deliver2
> nodemon ./bin/www

[nodemon] 2.0.7
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node ./bin/www`
```

Visit [http://127.0.0.1:3000/](http://127.0.0.1:3000/) to see the app!

If you have any problems with installation let me, or charlie know in slack.

### Testing
__Not yet implemented!__

More detailed explanation [on the express.js site.](https://expressjs.com/)