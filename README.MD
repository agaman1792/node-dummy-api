[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/agaman1792/node-dummy-api)
[![npm version](https://img.shields.io/badge/engine-node%20%3E%3D%208.11.2-brightgreen.svg)](https://nodejs.org/dist/v8.11.2/)
[![Package Quality](http://npm.packagequality.com/shield/node-dummy-api.svg)](http://packagequality.com/#?package=node-dummy-api)
[![bitHound Code](https://www.bithound.io/github/agaman1792/node-dummy-api/badges/code.svg)](https://www.bithound.io/github/agaman1792/node-dummy-api)
[![bitHound Dependencies](https://www.bithound.io/github/agaman1792/node-dummy-api/badges/dependencies.svg)](https://www.bithound.io/github/agaman1792/node-dummy-api/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/agaman1792/node-dummy-api/badges/devDependencies.svg)](https://www.bithound.io/github/agaman1792/node-dummy-api/master/dependencies/npm)

[![https://nodei.co/npm/node-dummy-api.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/node-dummy-api.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/node-dummy-api)

## The lightweight alternative to bulky API servers

Are you the kind of developer that doesn't want to rely on a working API in order to perform your development routines ? Look no further then

After a lot of time, I decided to revamp this project and rewrite it completely along the same idea.
Stay tuned for updates

*Note: The documentation is still in progress thus subject to frequent change.*

1. [First steps]()
    1. [Installation](#installation)
    2. [Quickstart](#quickstart)
2. [Usage]()
    1. [Usage example](#usage-example)
    2. [Configuration file](#configuration-file)
    3. [API Route configuration](#api-route-configuration)
    4. [Available random data keys](#available-random-data-keys)
3. [Credits]()
<!-- 3. [Contributing]()
    1. [Prerequisites]()
    2. [Running the tests]()
    3. [Small guide]() -->


#### 1.1 Installation
<a name="installation"></a>

    npm install -g node-dummy-api
    yarn global add node-dummy-api

#### 1.2 Quickstart
<a name="quickstart"></a>

    node-dummy-api

#### 2.1 Usage example
<a name="usage-example"></a>

- Create a file called .dummyapi anywhere on your hard drive (preferrably in the same root directory)
- Start a console window located in the same directory
- As the package prefers to be globally installed, run the package as a command

      node-dummy-api

#### 2.2 Configuration file
<a name="configuration-file"></a>

    {
      server: {
        host: string (default: "localhost")
        port: number (default: 1337)
        prefix: string (default: "/api")
        loglevel: string (default: "trace")

        authentication: {
          enabled: boolean (default: false)
          token: string
        }

        security: {
          enabled: boolean (default: false)
          cert: string -> https certificate path
          key: string -> https signing key path
        }
      }

      api: {
        routesPath: string -> if the file specified at this path exists, then the routes will be loaded from this location
        routes: {
          path: string (example: "/users")
          model: {
            "some-key": "<valid-mocking-key>",
            "some-array-key": ["<valid-mocking-key>"],
            "some-array-key-two": ["<valid-mocking-key>", <size>],
            "some-object-key": {
              "key": "<valid-mocking-key>"
            }
          }
        }
      }
    }

#### 2.3 API Route configuration
<a name="api-route-configuration"></a>

- path: any string value that fits your needs (preceeded by /)
- model: a JSON object, reflecting the structure of your needed API call

- You can use any valid faker random data key in order to generate a property
- You can generate arrays of random objects
- You can use nested objects and arrays

#### 2.4 Available random data keys
<a name="available-random-data-keys"></a>

For generating random data, the program uses [faker.js](https://github.com/Marak/faker.js). Please refer to the library README file for a complete list of options. Don't forget to write the value in handlebars-style format {{x.y.z}}.

#### 3 Credits

[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.png?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![MIT License](https://img.shields.io/apm/l/vim-mode.svg)](https://opensource.org/licenses/mit-license.php)
[![Semver](https://img.shields.io/SemVer/2.0.0.png)](http://semver.org/spec/v2.0.0.html)

<!-- * [What does it do ?](#section-one)
* [How do I install this ?](#section-two)
* [How would I use this and why ?](#section-three)
* [The configuration file](#section-four)
  * [A simple model](#a-simple-model)
  * [Configuration file explained](#config-file-explained)
  * [Possible random data keys](#random-data-docs)
* [Other important things](#section-five)
<a name="section-one"></a>What does it do ?
-----------------

  It exposes a RESTful webserver. The picture below will explain better.
  ![](http://s11.postimg.org/oa4uzqrr7/dummy_api.png)

**Now using words**

To begin with, this tool started with a deep desire not to depend on third-party apis (servers) in order to develop the front-end functionality (since in most of the cases, the back-end and front-end projects are separated). This includes possible issues like but not limited to:

* High load produced by the server causing the local development environment to be horribly slow.
* Increased development speed since you don't have to wait for eventual middleware issues to be fixed.
* Independent development, since you can write the application and the tests, all there's left to do at the end being the integration between the systems.
* It's lightweight
* It's open source :))

<a name="section-two"></a>How do I install this ?
-----------------------

  NPM: node-dummy-api (prefer global install)
  ```bash
    npm install -g node-dummy-api
  ```

<a name="section-three"></a>How would I use this and why ?
------------------------------

  Using this tool is the simplest thing you did in a long time.

**First step**
  * Create a _.dummyapi_ file in the root directory of your project
  * Or set an environment variable with the value a serialized JSON object containing your configuration

**Second step**
  * Shape the config file/config environment variable to best suit your development needs (endpoints, authorization).
  * The configuration file structure is documented a bit below
  * Open a terminal in the project root directory
  * Run the following command (as node-dummy-api prefers a global install):

  ```bash
    node-dummy-api
  ```

<a name="section-four"></a>The configuration file
----------------------

  This is the only thing that matters. The configuration file dictates the behavior of the system. The ultimate goal is that you can configure basically any test API environment you need with ease.

  * File type: JSON
  * File name: .dummyapi
  * (Alternative) Environment variable name: DUMMY_API_CONFIG

  _**Note: You don't have to specify all the keys in your configuration file. You can just define the options that you want to customize. If an option is not specified, its value is set as the default value. Default values can be found here: ./core/config-default.json**_

  **Configuration file explained**:
  <a name="config-file-explained"></a>

  ```js
  {
    // Server configuration
    "server": {
      "authorization": {
        "enabled": false, // Set to true in order to enable authorization
        "token": {
          "value": "1" // The token value (hard-coded into these settings). Reprezents the token that must be included in the Authorization header
        }
      },
      "general": {
        "port": 8080, // The port to serve the application on
        "prefix": "/api", // Api prefix (the part between port and endpoint <http://localhost:8080/api/users) -> /api is the prefix
        "loglevel": "trace"
      },
      "security": {
        "enabled": true,
        "cert": "",
        "key": ""
      }
    },
    // Api (endpoints configuration)
    "api": {
      // The routes array contains the endpoints that we wish to expose. Just add an object to this array, object containing a "path" key and a "model" key and you are good to go
      "routes": [
        {
          "path": "/address", // The path at which this endpoint will be found
          "model": { // The data model
            "address": "{{address.secondaryAddress}}",
            "city": "{{address.city}}",
            "country": "{{address.country}}"
          }
        }
      ]
    }
  }
  ```

  As you can see, models are configured by the object with the same name, contained inside a route.

  A model is just an object, with the key representing the name of the property and the value representing how you want the future value to be generated.

  **A simple model**
  <a name="a-simple-model"></a>

  ```js
  "model": {
      "foo": ["a", "b", "c"],
      "bar": "{{address.city}}"
  }
  ```
  The keys _foo_ and _bar_ in our case represent object properties that we want to find in our REST API.

  The value _["a", "b", "c"]_ instructs the program to choose a random value in the array and assign it to the object
  * *If the value is an array, choose a random value and use it as output*

  The value _"{{address.city}}"_ instructs the program to choose a random city and assign it to the object.
  * *If the value is a string, find the method that will produce the output*

<a name="random-data-docs"></a>
  For generating random data, the program uses [faker.js](https://github.com/Marak/faker.js), the possible values are (remember to write the argument in mustache-like format: _{{x.y.z}}_):

  * address
    * zipCode
    * city
    * cityPrefix
    * citySuffix
    * streetName
    * streetAddress
    * streetSuffix
    * streetPrefix
    * secondaryAddress
    * county
    * country
    * countryCode
    * state
    * stateAbbr
    * latitude
    * longitude
  * commerce
    * color
    * department
    * productName
    * price
    * productAdjective
    * productMaterial
    * product
  * company
    * suffixes
    * companyName
    * companySuffix
    * catchPhrase
    * bs
    * catchPhraseAdjective
    * catchPhraseDescriptor
    * catchPhraseNoun
    * bsAdjective
    * bsBuzz
    * bsNoun
  * date
    * past
    * future
    * between
    * recent
    * month
    * weekday
  * fake
  * finance
    * account
    * accountName
    * mask
    * amount
    * transactionType
    * currencyCode
    * currencyName
    * currencySymbol
  * hacker
    * abbreviation
    * adjective
    * noun
    * verb
    * ingverb
    * phrase
  * helpers
    * randomize
    * slugify
    * replaceSymbolWithNumber
    * replaceSymbols
    * shuffle
    * mustache
    * createCard
    * contextualCard
    * userCard
    * createTransaction
  * image
    * image
    * avatar
    * imageUrl
    * abstract
    * animals
    * business
    * cats
    * city
    * food
    * nightlife
    * fashion
    * people
    * nature
    * sports
    * technics
    * transport
  * internet
    * avatar
    * email
    * userName
    * protocol
    * url
    * domainName
    * domainSuffix
    * domainWord
    * ip
    * userAgent
    * color
    * mac
    * password
  * lorem
    * words
    * sentence
    * sentences
    * paragraph
    * paragraphs
  * name
    * firstName
    * lastName
    * findName
    * jobTitle
    * prefix
    * suffix
    * title
    * jobDescriptor
    * jobArea
    * jobType
  * phone
    * phoneNumber
    * phoneNumberFormat
    * phoneFormats
  * random
    * number
    * arrayElement
    * objectElement
    * uuid
    * boolean


<a name="section-five"></a>Other important things
------------

Work in progress... -->
