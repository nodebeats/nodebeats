# Nodebeats
![Nodebeats homepage](https://raw.githubusercontent.com/nodebeats/nodebeats/master/homepage_m0guov.jpg)

###### Nodebeats is an Open source Content Management System built using MEAN framework developed by [**Bitsbeat IT Solution**](https://www.bitsbeat.com/).

**Nodebeats** makes it easy to create web sites and applications and comes with beautiful admin UI.

Check out the [**Nodebeats Getting Started Guide**](http://www.nodebeats.com/getting-started) to start using Nodebeats

## About
**Nodebeats** provides following features:
* Docker configurations to run the application in containers
* Two factor authentication
* Token based authentication
* Role based authorization
* Authorization Token Management
* Real time Google Analytics data
* Host of options for email service providers like [**Mailgun**](https://www.mailgun.com/), [**Postmark**](https://postmarkapp.com/), [**Sendgrid**](https://sendgrid.com/), [**Mandrill**](https://www.mandrill.com/), [**Google SMTP**](https://mail.google.com) etc.
* Integration with [**Cloudinary**](http://cloudinary.com/) for Image management
* Commenting system using Disqus
* Responsive html template integration
* And many more features that you will love to have around.



## **Usage**

For detailed usage documentation, Check out the [**Nodebeats Getting Started Guide**](http://www.nodebeats.com/getting-started) to start using Nodebeats

For api documentation, Check out the  [**API Documentation**](http://www.nodebeats.com/docs/api/)

## **Installation**
* Install Node.js  if not already installed

    * Recommended Node version: >= v5.10.1, latest version is always better


* Install Docker and Docker compose if not already installed **(Currently nodebeats docker configuration doesn't support windows)**

    You will have to install these separately. To know more about docker installation process, please follow the following link : [**https://docs.docker.com/engine/installation/**](https://docs.docker.com/engine/installation/) and choose appropriate Operating System platform.
    
    To install docker-compose,  please follow the following link [**https://docs.docker.com/compose/install/**](https://docs.docker.com/compose/install/) and select the appropriate Operating System.

    * Recommended Docker version: >= v1.12.5, latest version is always better
    * Docker-compose version: >= v1.9.0, **Try to install version greater than 1.10**
    
    
* Clone the project repository

    * **git clone https://github.com/nodebeats/nodebeats.git**
    * **cd nodebeats**


* Install express, gulp, webpack, angular-cli and webpack dev server globally in your local development machine

    * **npm install express gulp webpack webpack-dev-server angular-cli -g**


* Go to the cloned project's root directory and run the following commands to get nodebeats up and running:

    * **docker-compose build**
    
            To create docker images from the docker configuration files. This will create four different docker images namely nodebeats-node-dev, nodebeats-node-dev-admin, nodebeats-mongo-dev and nodebeats-redis-dev. 
            This might take some time to create docker images depending upon the availability of core docker images of node, mongo and redis.
            
    * **docker images**
        
            To check for docker images. This command will list all the docker images in your system.
             
    * **docker ps**
        
            To check for active docker containers. This command will list only the active docker containers from your system.
                                     
    * **docker ps -a**
        
            To check for all the docker containers. This command will list all the docker containers from your system.
                                 
    * **docker-compose up**
        
            To build and start docker containers from previously created docker images. 
            This will start the nodebeats application. In the first run, this command will also restore the default databbase for the nodebeats 
            and start the backend server  and admin server and initializes the mongodb and redis server.
                             
    * **docker-compose down**
        
            To stop and remove docker containers from your system. If you no longer need the containers, then you can run this command to remove those containers. Otherwise it will eat up the harddisk space.
                        
    * **docker volume rm $(docker volume ls -qf dangling=true)**
        
            To  remove unwanted volumes associated with unused/deleted docker containers  from your system. 
                               
    * **docker rmi $(docker images -f "dangling=true" -q)**
        
            To  remove dangling images from your system.
                                          
    * **docker inspect <containerID/containerName>**
        
            To inspect the running docker containers.            
                                                  
    * **docker logs <containerID/containerName>**
        
            To see the logs inside of docker containers
            
            
    To know more about docker commands, please go through the docker documentation.

## **Running Application in Production Environment**

* **You need to tweak some docker configuration settings to make nodebeats run on production environment. Please go through the docker documentation to apply best practices for production environment.**


* **To generate dist files needed to run the application in production environment**
    * To generate deployment package of the admin app for production type, run the following commands:   
        * **cd admin**
        * **npm run build**
              
## **Note**

* Browse [**http://localhost:3000**](http://localhost:3000/) if you are in local machine.

* To login while in the development environment, navigate to [**http://localhost:4200/login**](http://localhost:4200/login/) and if you are in **production environment**, to login, navigate to [**http://localhost:3000/admin/login**](http://localhost:3000/admin/login/)    and use following application default credentials to access dashboard menu.

```
    username: superadmin

    passwor: superadmin@123
```

## Test

We have written integration tests for much of the functionality for this application. We haven't written any unit tests for this release, but we are planning to write unit tests for much of the functionality in the next release phase. Your contribution in writing unit tests for this application will be hugely appreciated and welcomed.

So, to run test, first we will have to modify couple of things to make test successfull. So, let's get started:

*   First of all, we need to change the database configuration file. Navigate to **lib/configs** directory from your project root directory. Edit database.config.js file and in the test section, place the appropriate MongoDB credentials:
```
    test: {
        username: '',
        password: '',
        host: '',
        port: '',
        dbName: ''
    }
```
*   If you have enabled **authentication**  for MongoDB server instance on your machine, then at first, you need to create a database and an authenticated user on the newly created database. You must do this step if you have enabled authentication in your MongoDB configuration file.

    ```
        dbUrl = "mongodb://"  + databaseConfig.test.username + ":" + databaseConfig.test.password + "@" +  databaseConfig.test.host + ":" + databaseConfig.test.port + "/" + databaseConfig.test.dbName;
    ```

    If you haven't enabled authentication in MongoDB server, then you need to remove the username and password from the connection url.You also need to modify the database connection url in  **index.js** inside of **test/** directory.

    ```
        dbUrl = "mongodb://" +  databaseConfig.test.host + ":" + databaseConfig.test.port + "/" + databaseConfig.test.dbName;
    ```


*   Now, that we have modified database configuration file, now we need to change some inputs in the test index file. So, navigate to **test** folder from the root of your project and then modify the **index.js** file.

*   You need to change the contents of **imagePathUrl** and **documentPathUrl** variable with the appropriate data. You must change these values, otherwise test will fail.

*   Once you have changed the variable contents of index.js file inside of test/ folder, you also need to modify **cloudinary.setting.integration.test.js**  file inside of **test/integrationtests/** and replace the existing coudinary config with the valid data.

     ```
        cloudinarySettingConfig = {
            cloudinaryCloudName: "nodebeats",
            cloudinaryApiKey: "124895ewewd177286781",
            cloudinaryApiSecret: "HKRL0Ovd46r7iRoxBxAq194niAZBvM"
        };
     ```
* The last thing you need to do is modify **email.service.configure.integration.test.js**  file inside of **test/integrationtests/** and replace the existing mail service configuration data with valid data.

```
     emailServiceConfigInfo = {
        serviceProviderType: "mailgun",
        api_Key: "key-ff32b449ddad2dsds5rd9b5dd1ff33005c79b",
        api_Secret: "api-Keyjlki98dssew34r2jklfnlrwhoiukhdsj",
        domain: "sandbox73ad601fcdd74461bdsdsr1c46820a59b2374.mailgun.org.np"
    };
```


Well, that's it. Now you can run test. To run the test,

*   Open two terminal windows

*   First step is to run **npm run test** command in one terminal window. This command will start the server and listen for client requests in test environment mode.

*   Then, run **gulp test** in another terminal window to run our test files.


## To run the test in admin app,

*   Go to admin directory from your project root directory

    **cd admin**

*   Open two terminal windows

*   First step is to run **npm run test** command

*   For end to end testing run **npm run e2e** command



## Community
"**Knowledge is power, Community is strength and positive attitude is everything**" by **Lance Armstrong**.

"**Alone We can do so little, Together we can do so much**" by **Hellen Keller**.

The above quotes shows us that how much the community is important to us. We also want to create a community that is friendly, engaging and most of all where everybody helps each other.

So to get involved, following are the ways that will connect us:
* Chat with us at [**gitter.im**](https://gitter.im/nodebeats/nodebeats)
* Follow  [**@Nodebeats**](https://twitter.com/nodebeats) for news and announcements
* Regarding existing product features and new features, do give us your feedbacks and suggestions at   [**ProductPains**](https://productpains.com/user/nodebeats)
* Ask any technical question regarding Nodebeats at [**Stackoverflow**](http://stackoverflow.com/questions/tagged/nodebeats) and tagged them **nodebeats**
* Report the issues at our github repo's [**issue**](https://github.com/nodebeats/nodebeats/issues/) tracker page
* We have a [**Mailing List**](https://groups.google.com/forum/#!forum/nodebeats). Feel free to join and ask questions.

So do send us your feedbacks and suggestions. You can also email us at **help@nodebeats.com**

## Maintainers

[**Shrawan Lakhe**](https://np.linkedin.com/in/shrawanlakhe)

[**Sandeep Ranjitkar**](https://np.linkedin.com/in/sandeepranjit)


## Contributing

We aim to make this software upto date, secured and at the same time provide more features. So, We need your help to make this possible. You can contribute to this project by reporting issues, discussing ideas and submitting pull requests with patches and new features.

If you can make some donations, then that will be great.

[![Donate via PayPal](https://www.paypalobjects.com/webstatic/en_US/i/btn/png/silver-pill-paypal-44px.png)](https://www.paypal.me/bitsbeat)


## Sponsors

No sponsors yet! Will you be the first?

## Deploying Nodebeats


You can host your website built using Nodebeats in any of the available hosting providers. Some of the most popular cloud computing platforms are [**Redhat Openshift**](https://www.openshift.com/), [**Heroku**](https://www.heroku.com/), [**DigitalOcean**](https://www.digitalocean.com/) and [**Modulus.io**](https://modulus.io/)

## Staying Up to Date

We will be adding new features regularly, improve the codebase continually and also keep the project's npm dependencies upto date so that there will not be any security vulnerabilities due to the npm packages. In this release version, we have integrated docker configuration with nodebeats so that then installation process of nodebeats is quick and easy and uniform across multiple platforms. We will release the next version as soon as the planned features are completed. In the next version, we plan to implement install setup wizard and deploy docker image in docker hub. We aim to make this software as secured as possible and announce the new version releases on our twitter account. So, to get the information about the latest releases, follow us on Twitter [**@Nodebeats**](https://twitter.com/nodebeats). You can also contact us at **help@nodebeats.com** regarding anything about the software.


## Project Maturity

Nodebeats is around 10 months old from the start of project inception date. You can use nodebeats cms to create and deploy web applications in the production server.


## Inspiration

As We all know [Wordpress](https://wordpress.com/), one of the most popular Content Management System currently in use and [Ghost](https://ghost.org/), a blogging platform that is probably the best in the technology world related to creating blogs, Mainly these two projects inspire us to start this product. People around the world use wordpress to create hundred of thousands of websites everyday. When someone talks about Content Management System for PHP programming language, then most of the time we hear about Wordpress. We also want to make this product like wordpress which people will use to create their websites in the future. Right now, it may seem very hard to acheive the goal but it is not impossible. We will continue to improve this product continually.



## Note

With this new release version, we have introduced docker with nodebeats so that installation process is quick and easy and uniform across different platforms.

In the next release, We plan to introduce install setup wizard where you can input some necessary configuration settings. We also plan to deploy the Nodebeats docker image in [dockerhub](https://hub.docker.com/).


## License

 Copyright (c) 2017 [Nodebeats](http://www.nodebeats.com/)

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.


A copy of the license is available in the repository's license.txt file.
