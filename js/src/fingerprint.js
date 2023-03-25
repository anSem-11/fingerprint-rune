document.addEventListener('DOMContentLoaded', function () {

    let fingerPlace = document.querySelector('.js-finger-place');
    let fingerPlaceMobile = document.querySelector('.js-finger-place-mobile');
    let fingerPlaceActive = document.querySelector('.fingerprint__place-active');
    let fingerPlaceNoActive = document.querySelector('.fingerprint__place-noactive');
    let fingerPlaceActiveMob = document.querySelector('.fingerprint__place-active-mobile');
    let fingerPlaceNoActiveMob = document.querySelector('.fingerprint__place-noactive-mobile');

    let runes = [
        'algiz',
        'ansuz',
        'berkan',
        'dagaz',
        'ehwaz',
        'eihwaz',
        'fehu',
        'gebo',
        'hagalaz',
        'inguz',
        'isaz',
        'jera',
        'kauna',
        'laguz',
        'mannaz',
        'nauthiz',
        'othala',
        'perthro',
        'raido',
        'sowilo',
        'thurisaz',
        'tiwaz',
        'uruz',
        'wunjo'
    ];

    let state = {
        timer: 0,
        interval: null,
        rand: null,
        rune: null
    };

    Cookies.remove('fingerprintRune');

    //Выбрать рандомный тип из отпечатков
    state.rune = runes[randomInteger(0, runes.length-1)];

    //Анимация отпечатка пальца
    fingerPlaceMobile.addEventListener('touchstart', (event) => {
        event.preventDefault();
        fingerPlaceMobile.dataset.type = 'process';
        fingerPlaceActiveMob.classList.add('hide');
        fingerPlaceNoActiveMob.classList.remove('hide');
        state.interval = setInterval(() => {
            state.timer = state.timer + 1;
            if (state.timer >= 6) {
                fingerPlace.dataset.type = 'finish';
                setTimeout(() => {
                    showPrediction();
                }, 300);
            }
        }, 500);
    });

    fingerPlaceMobile.addEventListener('touchend', (event) => {
        event.preventDefault();
        clearInterval(state.interval);
        if (state.timer < 3) {
            fingerPlaceMobile.dataset.type = 'placeholder';
            fingerPlaceActiveMob.classList.remove('hide');
            fingerPlaceNoActiveMob.classList.add('hide');
            state.timer = 0;
            return;
        }
        showPrediction();
    });

    fingerPlace.addEventListener('mousedown', () => {
        fingerPlace.dataset.type = 'process';
        fingerPlaceActive.classList.add('hide');
        fingerPlaceNoActive.classList.remove('hide');
        state.interval = setInterval(() => {
            state.timer = state.timer + 1;
            if (state.timer >= 6) {
                fingerPlace.dataset.type = 'finish';
                setTimeout(() => {
                    showPrediction();
                }, 300);
            }
        }, 500);
    });

    fingerPlace.addEventListener('mouseup', () => {
        clearInterval(state.interval);
        if (state.timer < 3) {
            fingerPlace.dataset.type = 'placeholder';
            fingerPlaceActive.classList.remove('hide');
            fingerPlaceNoActive.classList.add('hide');
            state.timer = 0;
            return;
        }
        showPrediction();
    });

    function showPrediction() {
        Cookies.set('fingerprintRune', state.rune, {expires: 999999});
        fingerPlaceActive.classList.remove('hide');
        fingerPlaceNoActive.classList.add('hide');
        window.location.href = redirectUrl;
    }

    // Рандомно выбрать руну

    function randomInteger(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        return rand;
    }

});