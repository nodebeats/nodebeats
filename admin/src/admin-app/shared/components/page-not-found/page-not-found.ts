import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'page-not-found',
    template: `<link href='//fonts.googleapis.com/css?family=Viga' rel='stylesheet' type='text/css'>
                <div class="main page-not-found">                
                    <h1>404</h1>
                    <h2>ooops, something went wrong</h2>
                    <div class="more_w3ls">
                        <a routerLink="/" title="Go To Dashboard">Go To Dashboard</a>
                    </div>
                
                </div>`,
    encapsulation: ViewEncapsulation.None,
    styles: [`
                div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, dl, dt, dd, ol, nav ul, nav li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
                
                    font-size: 100%;
                    font: inherit;
                
                }
                
                body {
                    background-color: rgba(4, 4, 4, 0.8);
                    -webkit-background-size: cover;
                    -moz-background-size: cover;
                    -o-background-size: cover;
                    -ms-background-size: cover;
                }
                
                /*end reset*/
                .page-not-found {
                    font-size: 100%;
                
                    font-family: 'Viga', sans-serif;
                }
                
                body a:hover, body a {
                    text-decoration: none;
                }
                
                /*-- main --*/
                .copyright p {
                    font-size: .6em;
                    color: #fff;
                    margin: 14em 0 0;
                    line-height: 1.8em;
                    text-align: center;
                }
                
                .copyright p a {
                    color: #EA4C89;
                }
                
                .copyright p a:hover {
                    text-decoration: underline;
                }
                
                .main {
                    text-align: center;
                }
                
                
                
                
                
                
                
                /* Sweep To Bottom */
                
                
                .main h1 {
                    font-size: 13em;
                    color: #fff;
                    margin: 0.4em 0 0;
                    line-height: 1;
                }
                
                .main h2 {
                    font-size: 1em;
                    color: #fff;
                    text-transform: capitalize;
                }
                
                .more_w3ls {
                    margin: 3em 0 5em;
                }
                
                .more_w3ls a {
                    padding: 8px 70px;
                    background: #f05f40;
                    text-decoration: none;
                    color: #212121;
                    font-size: 1em;
                    text-transform: uppercase;
                    transition: .5s ease-in;
                    -webkit-transition: .5s ease-in;
                    -moz-transition: .5s ease-in;
                    -o-transition: .5s ease-in;
                    -ms-transition: .5s ease-in;
                }
                
                .more_w3ls a:hover {
                    background: #fff;
                    color: #212121;
                }
                
                
                
                /*-----start-responsive-design------*/
                @media (max-width: 1366px) {
                    .copyright p {
                        margin: 13em 0 0;
                    }
                }
                
                @media (max-width: 1280px) {
                    body {
                        padding-bottom: 6em;
                    }
                }
                
                @media (max-width: 1080px) {
                    .main h1 {
                        font-size: 11em;
                    }
                }
                
                @media (max-width: 800px) {
                    .main h1 {
                        font-size: 9em;
                    }
                
                    .main h2 {
                        font-size: 14px;
                    }
                
                    .more_w3ls a {
                        padding: 8px 45px;
                        font-size: 14px;
                    }
                
                    body {
                        padding-bottom: 10em;
                    }
                }
                
                @media (max-width: 768px) {
                    body {
                        padding-bottom: 18.77em;
                    }
                
                    .main h1 {
                        margin: 0.5em 0 0;
                    }
                }
                
                @media (max-width: 736px) {
                    /*-- agileits --*/
                    
                
                    .copyright p {
                        margin: 10em 0 0;
                    }
                
                    body {
                        padding-bottom: 5em;
                    }
                }
                
                @media (max-width: 667px) {
                    .main h1 {
                        margin: 0.3em 0 0;
                    }
                }
                
                @media (max-width: 640px) {
                    .main h1 {
                        font-size: 7em;
                    }
                
                
                    .copyright p {
                        margin: 12em 0 0;
                        font-size: 7px;
                    }
                
                    .main h1 {
                        margin: 0.5em 0 0;
                    }
                
                    .copyright p {
                        margin: 14em 0 0;
                    }
                
                    body {
                        padding-bottom: 13em;
                    }
                }
                
                @media (max-width: 600px) {
                    .copyright p {
                        margin: 12em 0 0;
                    }
                
                    body {
                        padding-bottom: 4em;
                    }
                
                    .nav_w3l {
                        padding: 2em 0 0;
                    }
                
                
                }
                
                @media (max-width: 480px) {
                
                
                    .wthree_social_icons div {
                        left: 44.5%;
                        width: 56%;
                    }
                
                    .main h1 {
                        font-size: 6em;
                    }
                
                    .more_w3ls {
                        margin: 2em 0 4em;
                    }
                
                    .more_w3ls a {
                        padding: 8px 30px;
                    }
                
                   
                
                @media (max-width: 414px) {
                
                    .more_w3ls {
                        margin: 2em 0 4em;
                    }
                
                    
                    body {
                        padding-bottom: 11.05em;
                    }
                }
                
                @media (max-width: 384px) {
                    .main h1 {
                        font-size: 5em;
                    }
                
                    .main h2, .copyright p {
                        font-size: 7px;
                    }
                
                    .more_w3ls a {
                        font-size: 13px;
                        padding: 7px 25px;
                    }
                
                    
                    .more_w3ls {
                        margin: 1.5em 0 4em;
                    }
                
                    body {
                        padding-bottom: 10em;
                    }
                }
                
                @media (max-width: 375px) {
                  
                }
                
                @media (max-width: 320px) {
                    .nav_w3l ul li a {
                        padding: 4px 5px;
                        font-size: 12px;
                    }
                
                    .main h2, .copyright p, .more_w3ls a, .wthree_social_icons a span {
                        font-size: 7px;
                    }
                
                     .copyright p {
                        margin: 14em 0 0;
                    }
                
                    body {
                        padding-bottom: 3.55em;
                    }
                }}`],
})
export class PageNotFoundComponent {

}
