# Nodebeats
![Nodebeats homepage](https://raw.githubusercontent.com/nodebeats/nodebeats/master/homepage_m0guov.png)

###### Nodebeats is an Open source Content Management System built using MEAN framework.

**Nodebeats** makes it easy to create web sites and applications and comes with beautiful admin UI.

Check out the [**Nodebeats Getting Started Guide**](http://www.nodebeats.com/getting-started) to start using Nodebeats

## About
**Nodebeats** provides following features:
* Two factor authentication
* Token based authentication
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
    * Recommended MongoDB version: >= v3.2
    * Minimum requirement for MongoDB is v3.2 to enable restoration of backup archive file

* Clone the project repository

    * git clone https://github.com/nodebeats/nodebeats.git
    * cd nodebeats


* Install gulp, webpack and webpack dev server

    * npm install gulp webpack webpack-dev-server -g


* Go to the cloned project's root directory and run the following command to install required dependencies:

    * npm install

* If you have changed code and want to rebuid everything, then run the following commands

    * NODE_ENV=production webpack -p
    * NODE_ENV=production webpack --config webpack-client.config.js
    * gulp service-worker

    Or, You can run following npm scripts directly as well:

   * npm run start

   To start the application

   * npm run build:client:prod

   To generate deployment package of client frontend

   * npm run build:admin:prod

   To generate deployment package of admin frontend

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

Once this is done, you are ready to start the application.

* Run the server
    * npm start
    * gulp if you are on local machine

* Browse [**http://localhost:3000**](http://localhost:3000/) if you are in local machine.

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

Or, you can use the following button to directly deploy the application to the Heroku.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/ShrawanLakhe/heroku_deploy_button_test/tree/master)

## Staying Up to Date

We will be adding new features regularly and also keep the project's npm dependencies upto date so that there will not be any security vulnerabilities due to the npm packages. We will update the entire project to Angular 2.0.0-rc.6 in the upcoming version very soon. We will release the next version as soon as the planned features are completed. We aim to make this software as secured as possible and announce the new version releases on our twitter account. So, to get the information about the latest releases, follow us on Twitter [**@Nodebeats**](https://twitter.com/nodebeats). You can also contact us at **help@nodebeats.com** regarding anything about the software.


## Project Maturity

Nodebeats is relatively new that is only 4 months old from the start of project inception date. The product is generally stable. Although the project is relatively new, we have tried our best to make it usable for production purposes.


## Inspiration

As We all know [Wordpress](https://wordpress.com/), one of the most popular Content Management System currently in use and [Ghost](https://ghost.org/), a blogging platform that is probably the best in the technology world related to creating blogs, Mainly these two projects inspire us to start this product. People around the world use wordpress to create thousands of websites everyday. When someone talks about Content Management System for PHP programming language, then most of the time we hear about Wordpress. We also want to make this product like wordpress which people will use to create their websites in the future. Right now, it may seem very hard to acheive the goal but it is not impossible. We will continue to improve this product continually.



## Note

We will be upgrading the entire codebase from Angular v2.0.0-rc.4 to Angular v2.0.0-rc.6 in the next version. In the next release, we will write unit tests for much of the code functionality. So, if you want to create your project using Angular v2.0.0-rc.4, then you can use it for your production site, else we will notfiy you of new version upgrade as soon as possible.


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
