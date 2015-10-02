Dummy Api. _The lightweight alternative to bulky API servers._
========================================================

*Important: This project has its own personality and feelings. Proceed carefully!*

*Note: The documentation is still in progress and subject to change. As I still have much work to do on this project*

Table of contents
-----------------
* [What does it do ?](#section-one)
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
  ```json
  "model": {
      "foo": ["a", "b", "c"],
      "bar": "{{address.city}}"
  }
  ```
  The keys _foo_ and _bar_ in our case represent object properties that we want to find in our REST API.

  The value _["a", "b", "c"]_ instructs the program to choose a random value in the array and assign it to the object
    * If the value is an array, choose a random value and use it as output

  The value _"{{address.city}}"_ instructs the program to choose a random city and assign it to the object.
    * If the value is a string, find the method that will produce the output

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

Work in progress...
