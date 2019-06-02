# Geocoder Web application

### Prerequisites

What things you need to install the software and how to install them
- Ubuntu or Ubuntu based OS.
- npm (6.4.1): JavaScript package manager. It’s Node.js default manager.
```
sudo apt install npm
```
- node.js (8.11.4)
```
sudo apt install curl
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt install -y nodejs
sudo apt-get install -y build-essential
```

Also, we recommend using VS Code editor. You can get it in [VS Code](https://code.visualstudio.com/) or you may add the official VS Code repository for Ubuntu
```
sudo add-apt-repository -y "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main"
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys EB3E94ADBE1229CF
sudo apt update
sudo apt -y install code
```

## Scripts

- npm start: start the development server on localhost:3000
- npm run lint: runs eslint with our configuration (which is adapted form the aribnb configuration) over all .js files in the project folder, excluding node_modules, dist and cover directories (cover folder is created when you run tests with --coverage). It automatically fix all auto-fixable problems.
- npm run build: build the application in the build folder.

## Main dependencies

- eslint: we use airbnbn style guide with a couple of modifications (which you can find in .eslintrc.json)
- react: the main JavaScript library for building user interfaces
- axios: to interface with a REST API
- redux: as the single source of truth
- redux-thunk: for the middleware
- styled-components: for adding style to React components

You can see the full dependencies list in package.json

### src

index.js is the main script called from index.html. reducers.js imports all the reducers of each view.