# Nodebeats
![Nodebeats homepage](https://raw.githubusercontent.com/nodebeats/nodebeats/master/homepage_m0guov.jpg)

###### Nodebeats is an Open source Content Management System built using MEAN framework.

**Nodebeats** makes it easy to create web sites and applications and comes with beautiful admin UI.

Check out the [**Nodebeats Getting Started Guide**](http://www.nodebeats.com/getting-started) to start using Nodebeats

## About
**Nodebeats** provides following features:
* Two factor authentication
* Token based authentication
* Role based authorization
* Authorization Token Management
* Real time Google Analytics data
* Host of options for email service providers like [**Mailgun**](https://www.mailgun.com/), [**Postmark**](https://postmarkapp.com/), [**Sendgrid**](https://sendgrid.com/), [**Mandrill**](https://www.mandrill.com/), [**Google SMTP**](https://mail.google.com) etc.
* Integration with [**Cloudinary**](http://cloudinary.com/) for Image management
* Commenting system using Disqus
* And many more features that you will love to have around.



## Usage

For detailed usage documentation, Check out the [**Nodebeats Getting Started Guide**](http://www.nodebeats.com/getting-started) to start using Nodebeats

For api documentation, Check out the  [**API Documentation**](http://www.nodebeats.com/docs/api/)

**Installation**
* Install Node.js and MongoDB if not already installed

    * Recommended Node version: >= v5.10.1
    * Recommended MongoDB version: >= v3.0


* Clone the project repository

    * git clone https://github.com/nodebeats/nodebeats.git
    * cd nodebeats


* Install gulp, webpack and webpack dev server

    * npm install gulp webpack webpack-dev-server -g


* Go to the cloned project's root directory and run the following command to install required dependencies:

    * npm install


**Important Note**
* First install the **angular cli** globally in your local machine before installing packages for admin app
    
    * npm install -g angular-cli
    
* For setting up admin app (angular 2 app), go to the cloned project's admin directory and run the following command to install required dependencies for admin app:
    * cd admin
    * npm install


**Running Development Environment**

* **To run server**     
    * In the root directory run the given command
        * npm run server
        
    * Go to browser and type the following url  
        * [**http://localhost:3000**](http://localhost:3000) 
        * ( default port - 3000 )

* **To run admin app** 
    * Go to admin directory
        * cd admin
    
    * Type the following script
        * npm start
    
    * Go to browser and type the following url 
        * [**http://localhost:4200/login**](http://localhost:4200/login)  -  for login page
        * [**http://localhost:4200**](http://localhost:4200)        -  for dashboard
        * [**http://localhost:4200/{{route}}**](http://localhost:4200/{{route}})    - any {{route}}
        * ( default port - 4200 )





**Running Production Environment**

* **To Run the server run the given command**
    * NODE_ENV=production npm start
    
* **For admin app**
    * To generate deployment package the admin app for production type     
        * cd admin
        * npm run prod
        
    * To run the admin app in browser, type the following url 
        * [**http://localhost:3000/admin/login**](http://localhost:3000/admin/login) - for login page
        * [**http://localhost:3000/admin/dashboard**](http://localhost:3000/admin/dashboard)  -  for dashboard page
        * [**http://localhost:3000/admin/{{route}}**](http://localhost:3000/admin/{{route}}) - for any {{route}}
        
         **Please Notice that in production environment, admin app is accessed using "/admin/(someroute)" but "/admin" is not required in development environment**
        

* **For Client app**
    * To generate deployment package the client app for production run the given command    
        * npm run build:client:prod 
              

    
* To run client app in browser, type the following url 
    * http://localhost:3000


**Important Note**

Run the following commands only if you have modified client code. If you are using it for the first time, you can skip this step.

* If you have changed code and want to rebuild everything, then run the following commands

    * NODE_ENV=production webpack
    * gulp service-worker

    Or, You can run following npm scripts directly as well:

   * npm run start

        To start the application

   * npm run build:client:prod

        To generate deployment package of client frontend

   * npm run clean:uploads

        To clear uploaded documents and images




* Edit the database configuration file in **/lib/configs/database.config.js** and enter the appropriate MongoDB credentials.

```
production: {
    username: '',
    password: '',
    host: '',
    port: '',
    dbName: ''
},
```


* Edit the redis configuration file in **/lib/configs/redis.config.js** and enter the appropriate REDIS credentials.

```
production : {
    host: '',
    port: '',
    pass: ''
}
```
Once this is done, you are ready to start the application.

* Run the server
    * npm start
    * gulp if you are on local machine

* Browse [**http://localhost:3000**](http://localhost:3000/) if you are in local machine.

* To login, navigate to [**http://localhost:3000/login**](http://localhost:3000/login/) and use following application default credentials to access dashboard menu.

```
    username: superadmin

    passwor: superadmin@123
```

## Test

We have written integration test for much of the functionality for this application. We haven't written any unit tests for this release, but we are planning to write unit tests for much of the functionality for the next release phase. Your contribution in writing unit tests for this application will be hugely appreciated and welcomed.

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
*   If you have enabled **authentication**  for MongoDB server instance on your machine, then you need to create a database and an authenticated user on the newly created database. You must do this step if you have enabled authentication in your MongoDB configuration file.

    You also need to modify the **database.helper.js** file from **lib/helpers/** directory and add the username and password to the existing database connection url.

    ```
        dbUrl = "mongodb://"  + databaseConfig.test.username + ":" + databaseConfig.test.password + "@" +  databaseConfig.test.host + ":" + databaseConfig.test.port + "/" + databaseConfig.test.dbName;
    ```

    You also need to modify the database connection url in  **index.js** inside of **test/** directory.

*   Now, that we have modified database configuration file, now we need to change some inputs in the test index file. So, navigate to **test** folder from the root of your project and then modify the **index.js** file.

*   You need to change the contents of **imagePathUrl** and **documentPathUrl** variable with the appropriate data. You must change these values, otherwise test will fail.

*   Once you have changed the variable contents, you also need to modify **cloudinary.setting.integration.test.js**  file inside of **test/integrationtests/** and replace the existing coudinary config with the valid data.

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

*   First step is to run **npm run test** command in one terminal window. This command will start the server and listen for client requests.

*   Then, run **gulp test** in another terminal window to run our test files.


 To run the test in admin app,

*   Open two terminal windows

*   Go to admin directory i.e cd admin

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

[![Donate via PayPal](https://www.paypalobjects.com/webstatic/en_US/i/btn/png/silver-pill-paypal-44px.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=VBJ4DJ5JUKRD2&lc=US&item_name=Contribution%20for%20Nodebeats%20Opensource%20CMS&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted)


## Sponsors

No sponsors yet! Will you be the first?

## Deploying Nodebeats


You can host your website built using Nodebeats in any of the available hosting providers. Some of the most popular cloud computing platforms are [**Redhat Openshift**](https://www.openshift.com/), [**Heroku**](https://www.heroku.com/), [**DigitalOcean**](https://www.digitalocean.com/) and [**Modulus.io**](https://modulus.io/)

## Staying Up to Date

We will be adding new features regularly and also keep the project's npm dependencies upto date so that there will not be any security vulnerabilities due to the npm packages. In this release version, we have introduced Authorization token management feature. We will release the next version as soon as the planned features are completed. In the next version, we will be working on the frontend section of the application and integrate beautiful responsive html template with the content management system so that you can download the file and deploy that in the cloud. We aim to make this software as secured as possible and announce the new version releases on our twitter account. So, to get the information about the latest releases, follow us on Twitter [**@Nodebeats**](https://twitter.com/nodebeats). You can also contact us at **help@nodebeats.com** regarding anything about the software.


## Project Maturity

Nodebeats is relatively new that is around 7 months old from the start of project inception date. Even though the project is relatively new, the product is highly stable for production purposes and you can use it to create web applications.


## Inspiration

As We all know [Wordpress](https://wordpress.com/), one of the most popular Content Management System currently in use and [Ghost](https://ghost.org/), a blogging platform that is probably the best in the technology world related to creating blogs, Mainly these two projects inspire us to start this product. People around the world use wordpress to create hundred of thousands of websites everyday. When someone talks about Content Management System for PHP programming language, then most of the time we hear about Wordpress. We also want to make this product like wordpress which people will use to create their websites in the future. Right now, it may seem very hard to acheive the goal but it is not impossible. We will continue to improve this product continually.



## Note

We have added Authorization token management feature  so that you can revoke the access to the authorization tokens if you wish to in this release version. In the next release, we will be working on the frontend section of the application. We will introduce a nice responsive html template integrated with Nodebeats so that you can directly use that for your personal purpose and deploy it in the cloud and also introduce install setup wizard so that you can directly input database connections form user Interface elements.


## License

 Copyright (c) 2016 [Nodebeats](http://www.nodebeats.com/)

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