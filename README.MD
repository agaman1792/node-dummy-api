Dummy Api. _The lightweight alternative to bulky servers._
========================================================

*Note: The documentation is still in progress and subject to change. As I still have much work to do on this project*

* What does it do ?

  It exposes a RESTful webserver. The picture below will explain better.
  ![](http://s11.postimg.org/oa4uzqrr7/dummy_api.png)

* How do I install this ?

  It is not yet published on NPM but you can do this instead.

  * Short version:

        mkdir -p /opt/nodejs/ && cd /opt/nodejs \
        git clone https://github.com/tzoky07/dummy-api.git && cd dummy-api \
        npm install \
        npm install -g . \
        dummy-api

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
