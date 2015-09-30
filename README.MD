Dummy Api. _The lightweight alternative to bulky API servers._
========================================================

*Important: This project has its own personality and feelings. Proceed carefully!*

*Note: The documentation is still in progress and subject to change. As I still have much work to do on this project*

What does it do ?
-----------------

  It exposes a RESTful webserver. The picture below will explain better.
  ![](http://s11.postimg.org/oa4uzqrr7/dummy_api.png)

How do I install this ?
-----------------------

  NPM: node-dummy-api (prefer global install)

        npm install -g node-dummy-api

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
