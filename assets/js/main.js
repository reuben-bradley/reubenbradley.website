if ('addEventListener' in window) {
    window.addEventListener('load', function() {
        console.log('window loaded!');
        var link = document.getElementById('games-link');
        var returnLink = document.getElementById('games-return');
        var wrapper = document.getElementById('wrapper');

        link.addEventListener('click', function(e) {
            e.preventDefault();
            wrapper.classList.add('flipped');
        });
        returnLink.addEventListener('click', function(e) {
            e.preventDefault();
            wrapper.classList.remove('flipped');
        });
    });
}