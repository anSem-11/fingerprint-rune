document.addEventListener('DOMContentLoaded', () => {

    let hiddenFormWrapper = document.querySelector('.js-hidden-form-wrapper');
    let btnShowForm = document.querySelector('.js-button-show-form');
    let formSignUp = document.querySelector('.js-form-subscribe');
    let subsGoogle = document.querySelector('.js-subscribe-google');

    formSignUp && hiddenFormWrapper && btnShowForm && window.urlSubscribe && window.urlPrediction && initEmailSub();
    subsGoogle && window.urlSubscribe && window.urlPrediction && initGoogle();

    function initEmailSub() {
        btnShowForm.addEventListener('click', ()=>{
            btnShowForm.classList.add('hide');
            hiddenFormWrapper.classList.remove('hide');
        });

        new JustValidate('.js-form-subscribe', {
            rules: {
                email: {
                    required: true,
                    email: true
                }
            },
            submitHandler: function (form, values, ajax) {
                grecaptcha.ready(function () {
                    grecaptcha.execute('6Lc74q4UAAAAALcUjpWfyJC672e-JNsQMcJOqL-4', {action: 'subscribe'})
                        .then(function (token) {
                            values.token = token;
                            subscribeUser(ajax, values);
                        });
                });
            }
        });
    }

    function initGoogle() {

        let scriptGoogle = document.createElement('script');

        scriptGoogle.src = "https://apis.google.com/js/api:client.js";
        document.head.append(scriptGoogle);

        scriptGoogle.addEventListener('load', ()=>{

            let intervalGoogle = setInterval(()=>{
                if (window.gapi.auth2){
                    clearInterval(intervalGoogle);

                    subsGoogle.classList.remove('disabled');

                    let auth2 = window.gapi.auth2.init({
                        client_id: '528445115529-8hvlt8dltktf0a52cnt4eli7jui7buoq.apps.googleusercontent.com',
                        cookiepolicy: 'https://everydayhoroscopes.com/',
                        // Request scopes in addition to 'profile' and 'email'
                        //scope: 'additional_scope'
                    });

                    let googleUser = {};
                    let valuesGoogle = {};

                    window.gapi.load('auth2', function () {
                        // let element = document.getElementById('customBtn');
                        auth2.attachClickHandler(subsGoogle, {},
                            function (googleUser) {

                                valuesGoogle.type = 'google';
                                valuesGoogle.email = googleUser.getBasicProfile().getEmail();
                                subsGoogle.innerHTML = 'Done!';
                                subscribeUser(ajax.run, valuesGoogle);

                            }, function (error) {
                                // alert(JSON.stringify(error, undefined, 2));
                            });
                    });
                }
            }, 500);
        });

        // subsGoogle.addEventListener('click', () => {});
    }

    function subscribeUser(ajax, values) {
        Cookies.set('emailProvider', values.email.split('@')[1] || '', {expires: 3});
        values.trigger = 'fingerPrintRune';
        ajax({
            url: window.urlSubscribe,
            method: 'POST',
            async: true,
            data: values,
            callback: function (resp) {
                if (resp === 'new_user' || resp === 'no update old' || resp === 'success update old' || resp === 'used' || resp === 'DOI') {
                    location.href = window.urlPrediction;
                } else {
                    alert('Oops! Something went wrong… try again later.');
                }
            }
        });
    }
});