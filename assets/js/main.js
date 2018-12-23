if ('addEventListener' in window) {
    window.addEventListener('load', function() {
        var main = document.getElementById('main');
        var games = document.getElementById('games');
        var link = document.getElementById('games-link');
        var returnLink = document.getElementById('games-return');
        var wrapper = document.getElementById('wrapper');

        link.addEventListener('click', function(e) {
            e.preventDefault();
            wrapper.classList.add('flipped');
            setTimeout(function() {
                main.style.display = 'none';
                games.style.display = 'block';
            }, 250);
        });
        returnLink.addEventListener('click', function(e) {
            e.preventDefault();
            wrapper.classList.remove('flipped');
            setTimeout(function() {
                games.style.display = 'none';
                main.style.display = 'block';
            }, 250)
        });
    });
}