document.addEventListener('DOMContentLoaded', () => {
    const posterClick = (e) => {
        const poster = e.target.closest('.wp-block-embed__poster');
        poster.classList.toggle('hidden', true);

        const iframe = e.target
            .closest('.wp-block-embed__wrapper')
            .querySelector('iframe')
            .contentWindow;

        iframe.postMessage(JSON.stringify({
            event: 'command',
            func: 'playVideo',
            args: ''
        }), '*');

        poster.removeEventListener('click', posterClick);
    };

    document.querySelectorAll('.wp-block-embed__poster').forEach(element => {
        element.addEventListener('click', posterClick);
    });
}, false);
