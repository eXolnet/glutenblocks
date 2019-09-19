document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.gb-carousel__activator');
    const autoplayDelay = document.getElementById('autoplay-value').value * 1000;
    if (autoplayDelay && autoplayDelay > 0) {
        callTimer();
    }

    document.querySelectorAll('.gb-carousel__manual-next').forEach(element => {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            checkboxes[getNextArrayId()].checked = true;
        });
    });

    document.querySelectorAll('.gb-carousel__manual-prev').forEach(element => {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            checkboxes[getPrevArrayId()].checked = true;
        });
    });

    function callTimer() {
        setTimeout(_=>{
            checkboxes[getNextArrayId()].checked = true;
            callTimer();
        }, autoplayDelay);
    }

    function getCurrentArrayId() {
        const currentItem = document.querySelector('.gb-carousel__activator:checked');
        return Array.from(checkboxes).indexOf(currentItem);
    }
    
    function getNextArrayId() {
        const currentIndex = getCurrentArrayId();
        return ((currentIndex + 1) > (checkboxes.length - 1)) ? 0 : (currentIndex + 1);
    }

    function getPrevArrayId() {
        const currentIndex = getCurrentArrayId();
        return (currentIndex - 1 < 0) ? (checkboxes.length - 1) : (currentIndex - 1);
    }
}, false);

