Dummy Api. _The lightweight alternative to bulky servers._
========================================================

*Important: This project has its own personality and feelings. Proceed carefully!*

*Note: The documentation is still in progress and subject to change. As I still have much work to do on this project*

What does it do ?
-----------------

  It exposes a RESTful webserver. The picture below will explain better.
  ![](http://s11.postimg.org/oa4uzqrr7/dummy_api.png)

How do I install this ?
-----------------------

  It is not yet published on NPM but you can use the command(s) below to get this. The "short version" will get you right set up.

  * Short version:

        mkdir -p /opt/nodejs/ && cd /opt/nodejs && git clone https://github.com/tzoky07/dummy-api.git && cd dummy-api && npm install && npm install -g . && dummy-api

  * Long version:

        # Create the /opt/nodejs directory (if it does not exist) and switch to it

        mkdir -p /opt/nodejs/ && cd /opt/nodejs

        # Grab the repository contents and switch to the project root directory

        git clone https://github.com/tzoky07/dummy-api.git && cd dummy-api

        # Install the dependencies

        npm install

        # Install the package globally

        npm install -g .

        # Run the dummy-api command to see if everything is in order

        dummy-api

How would I use this and why ?
------------------------------

  Using this tool is the simplest thing you did in a long time.

  * Create a _.dummyapi_ file in the root directory of your project
  * Shape the config file to best suit your development needs (endpoints, authorization)
  * Open a terminal in the project root directory
  * Run the following command:
        dummy-api

  And why would you need this...

  To begin with, this tool started with a deep desire not to depend on third-party apis (servers) in order to develop the front-end functionality (since in most of the cases, the back-end and front-end projects are separated). This includes possible issues like but not limited to:
  
    * High load produced by the server causing the local development environment to be horribly slow.
    * Increased development speed since you don't have to wait for eventual middleware issues to be fixed.
    * Independent development, since you can write the application and the tests, all there's left to do at the end being the integration between the systems.
    * It's lightweight
    * It's open source :))

The configuration file
----------------------

_Please see the .dummyapi file from the project root directory_
Work in progress...

More details
------------

Work in progress...
