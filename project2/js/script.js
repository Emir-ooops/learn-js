window.addEventListener('DOMContentLoaded',function(){
    'use strict'
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');
        

    function hideTabContent(a){
        for (let i = a; i < tabContent.length; i++){
            tabContent[i].classList.remove('show')
            tabContent[i].classList.add('hide')
        }
    }

    hideTabContent(1);

    function showTabContent(b){
        if(tabContent[b].classList.contains('hide')){
            tabContent[b].classList.remove('hide')
            tabContent[b].classList.add('show')
        }
    }

    info.addEventListener('click', function(event){
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')){
            for(let i =0; i<tab.length; i++){
                if(target == tab[i]){
                    hideTabContent(0);
                    showTabContent(i);
                    break
                }
            }
        }
    })

    let deadline = '2025-01-01';

    function getTime(endTime){
        let t = Date.parse(endTime)-Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/1000/60/60)%24),
            days = Math.floor((t/1000/60/60/24));

            return {
                'total' : t,
                'days': days,
                'hours': hours,
                'minutes':minutes,
                'seconds': seconds,
            };
    };

    function setClock (id,endTime){
        let timer = document.getElementById(id),
            days = timer.querySelector('.days'),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock,1000);

        function updateClock(){
            let t = getTime(endTime);
            // hours.textContent = String(t.hours).padStart(2, '0');
            // days.textContent = String(t.days).padStart(2, '0');
            // minutes.textContent = String(t.minutes).padStart(2, '0');
            // seconds.textContent = String(t.seconds).padStart(2, '0');
            function addZero(num){
                if (num<0){
                    return '0'+num
                } else {
                    return num
                }
            };
            hours.textContent = addZero(t.hours);
            days.textContent = addZero(t.days);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);


            if (t.total<0){
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
                days.textContent = '00';
                clearInterval(timeInterval);
            }
        }
    };
    setClock('timer',deadline)

    // modal wimdow 
    function modalWindow(element){
        overlay.style.display = 'block';
        element.classList.add('more-splash')
        document.body.style.overflow = 'hidden';
        console.log(element)
    } 
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        tabModalWindow = document.querySelector('.description-btn')

    more.addEventListener('click',function(){
        modalWindow(this)
    })

    close.addEventListener('click', function(){
        overlay.style.display = 'none';
        more.classList.remove('more-splash')
        document.body.style.overflow = '';
    })

    tabModalWindow.addEventListener('click',function(){
        modalWindow(this)
    })
    
    let message = {
        loading: 'Загрузка...',
        succuess: 'Спасибо!',
        failure: 'Что то пошло не так'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status')

    form.addEventListener('submit', function(event){
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php')
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(form),
            obj = {};
        formData.forEach(function(value,key){
            obj[key] = value;
        })
        let json = JSON.stringify(obj); 

        request.send(json);

        request.addEventListener('readystatechange', function(){
            if (request.readyState < 4 ){
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200){
                statusMessage.innerHTML = message.succuess
            } else {
                statusMessage.innerHTML = message.failure
            }
        });

        for (let i = 0; i < input.length; i++){
            input[i].value ='';
        }

    });


    // slider
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        next = document.querySelector('.next'),
        prev = document.querySelector('.prev'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');
    showSlides(slideIndex)
    function showSlides(n){
        if (n > slides.length){ slideIndex = 1;}
        if (n < 1){ slideIndex = slides.length;}
        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    };
    function plusSlides (n){
        showSlides(slideIndex += n);
    }
    function currentSlide(n){
        showSlides(slideIndex =n);
    }
    prev.addEventListener('click',function(){
        plusSlides(-1)
    });
    next.addEventListener('click',function(){
        plusSlides(1)
    });

    dotsWrap.addEventListener('click',function(event){
        for (let i=0; i<dots.length+1; i++){
            if (event.target.classList.contains('dot') && event.target == dots[i-1]){
                currentSlide(i);
            }
        }
    });

    //calc

    let persons = this.document.querySelectorAll('.counter-block-input')[0],
        restDays = this.document.querySelectorAll('.counter-block-input')[1],
        place = this.document.getElementById('select'),
        totalValue = this.document.getElementById('total'),
        personsSum = 0,
        daySum = 0,
        total = 0;

    totalValue.innerHTML = total;

    persons.addEventListener('change',function(){
        personsSum = +this.value;
        total = (daySum + personsSum)*4000;

        if(persons.value != '' && restDays.value !='' && persons.value != '0' && restDays.value !='0'){
            totalValue.innerHTML = total;
        } else {
            totalValue.innerHTML = 0;
        }
    });

    restDays.addEventListener('change',function(){
       daySum = +this.value;
        total = (daySum + personsSum)*4000;

        if(persons.value != '' && restDays.value !='' && persons.value != '0' && restDays.value !='0'){
            totalValue.innerHTML = total;
        } else {
            totalValue.innerHTML = 0;
        }
    });

    place.addEventListener('change',function(){
        if(persons.value != '' && restDays.value !='' && persons.value != '0' && restDays.value !='0'){
            let a = total;
            totalValue.innerHTML = a*this.options[this.selectedIndex].value;
        } else {
            totalValue.innerHTML = 0;
        }
    })
});