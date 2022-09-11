## Features

- Pre-defined response structures with proper status codes.
- **Book** example with **CRUD** operations.
- Test cases with [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/).
- Code coverage with [Istanbuljs (nyc)](https://istanbul.js.org/).
- Linting with [Eslint](https://eslint.org/).

## Software Requirements

- Node.js **8+**

## How to install

### Using Git (recommended)

1.  Clone the project from github.

### Using manual download ZIP

1.  Download repository
2.  Uncompress to your desired directory

### Install npm dependencies after installing (Git or manual download)

```bash
cd myproject
npm install
```


## Project structure

```sh
.
├── app.js
├── package.json
├── bin
│   └── www
├── controllers
│   └── BookController.js
├── models
│   ├── BookModel.js
├── routes
│   ├── api.js
│   └── book.js
├── helpers
│   ├── apiResponse.js
│   ├── constants.js
│   └── utility.js
├── test
│   ├── testConfig.js
│   └── book.js
└── public
    ├── index.html
    └── stylesheets
        └── style.css
```

## How to run

### Running API server locally

```bash
npm run dev
```

You will know server is running by checking the output of the command `npm run dev`

```bash
Connected to mongodb:YOUR_DB_CONNECTION_STRING
App is running ...

Press CTRL + C to stop the process.
```

## Tests

### Running Test Cases

```bash
npm test
```

You can set custom command for test at `package.json` file inside `scripts` property. You can also change timeout for each assertion with `--timeout` parameter of mocha command.


## ESLint

### Running Eslint

```bash
npm run lint
```

You can set custom rules for eslint in `.eslintrc.json` file, Added at project root.

