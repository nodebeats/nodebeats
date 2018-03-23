(function (menuConfigs) {
    'use strict';

    menuConfigs.getNavigationMenus = function (app) {
        return [
            {
                nav: 'Home',
                navUrl: '/'
            },
            {
                nav: 'About Us',
                navUrl: '/about-us'
            },
            {
                nav: 'Gallery',
                navUrl: '/image-gallery'
            },
            {
                nav: 'News',
                navUrl: '/news'
            },
            {
                nav: 'Blogs',
                navUrl: '/blogs'
            },
            {
                nav: 'Testimonial',
                navUrl: '/testimonial'
            },
            {
                nav: 'Team',
                navUrl: '/team-members'
            },
            {
                nav: 'Events',
                navUrl: '/events'
            },
            {
                nav: 'Partners',
                navUrl: '/partners'
            },
            {
                nav: 'Contact Us',
                navUrl: '/contact-us'
            },
            {
                nav: 'Login',
                navUrl: (app.get('env') === "development" ? "http://localhost:4200/login" : "admin/login")
            }];
    };
})(module.exports);

