"use strict";

document.addEventListener('DOMContentLoaded', function () {

    let containers = document.querySelectorAll('.js-link');

    containers.forEach(function(container) {
        container && container.addEventListener('click', function () {
            gtag('event', 'Users',{
                'event_category': 'Users',
                'event_label': 'Click',
                'event_action': 'Click mailbox'
            });
        });
    });

    const emailProvider = [
        {
            name: 'hotmail.com',
            link: 'https://outlook.live.com/owa/'
        },
        {
            name: 'outlook.com',
            link: 'http://outlook.com/'
        },
        {
            name: 'gmail.com',
            link: window.gmailLink
        },
        {
            name: 'mail.yahoo.com',
            link: 'http://mail.yahoo.com/'
        },
        {
            name: 'icloud.com',
            link: 'https://www.icloud.com/#mail'
        },
        {
            name: 'aol.com',
            link: 'https://mail.aol.com/webmail-std/en-us/suite'
        },
        {
            name: 'fastmail.fm',
            link: 'http://www.fastmail.fm/'
        },
        {
            name: 'mail.com',
            link: 'http://www.mail.com/',
            favicon: 'http://www.mail.com/favicon.ico'
        },
        {
            name: 'aim.com',
            link: 'http://mail.aim.com'
        },
        {
            name: 'hushmail.com',
            link: 'https://www.hushmail.com'
        },
        {
            name: 'zoho.com',
            link: 'https://www.zoho.com/mail'
        },
        {
            name: 'yahoo.com',
            link: 'https://mg.mail.yahoo.com/neo/launch'
        },
        {
            name: 'comcast.net',
            link: 'https://login.comcast.net'
        },
        {
            name: 'verizon.com',
            link: 'https://webmail.verizon.com'
        },
        {
            name: 'earthlink.net',
            link: 'https://webmail.earthlink.net'
        },
        {
            name: 'cox.net',
            link: 'https://webmail.cox.net'
        },
        {
            name: 'twc.com',
            link: 'https://webmail.twc.com/'
        },
        {
            name: 'optimum.net',
            link: 'https://webmail.optimum.net/'
        },
        {
            name: 'lycos.com',
            link: 'http://www.mail.lycos.com/'
        },
        {
            name: 'mail.ru',
            link: 'http://mail.ru/'
        },
        {
            name: 'yandex.ru',
            link: 'https://mail.yandex.ru/'
        },
        {
            name: 'rambler.ru',
            link: 'https://mail.rambler.ru/'
        },
        {
            name: 'ntlworld.com',
            link: 'https://my.virginmedia.com/my-apps/email/mailbox'
        },
        {
            name: 'web.com',
            link: 'https://webmail.web.com/'
        },
        {
            name: 'bigmir.net',
            link: 'http://mail.bigmir.net/'
        }
    ];

    function generateButton() {
        let domain = window.userEmail.split('@')[1];

        let href = emailProvider.filter(({name}) => {
            return name === domain;
        });
  
        containers.forEach(function(container) {
            var link = document.createElement('a');
            link.className = 'open-email-link';
            link.setAttribute('href', href[0].link);
            link.setAttribute('target', '_blank');
            link.innerHTML = openEmailTextLink;            
            container.appendChild(link);
        });

    }

    window.userEmail && generateButton();

});
