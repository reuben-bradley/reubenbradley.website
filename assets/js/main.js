if ('addEventListener' in window) {
    window.addEventListener('load', function() {
        console.log('window loaded!');
        var games = document.getElementById('games');
        var main = document.getElementById('main');
        var link = document.getElementById('games-link');
        var returnLink = document.getElementById('games-return');

        games.style.display = 'none';
        link.addEventListener('click', function(e) {
            e.preventDefault();
            main.classList.add('is-hiding');
            games.classList.add('is-hiding');
            setTimeout(function() {
                main.style.display = 'none';
                games.style.display = 'block';
                setTimeout(function() {
                    games.classList.remove('is-hiding');
                }, 100);
            }, 1000);
        });
        returnLink.addEventListener('click', function(e) {
            e.preventDefault();
            games.classList.add('is-hiding');
            main.classList.add('is-hiding');
            setTimeout(function() {
                games.style.display = 'none';
                main.style.display = 'block';
                setTimeout(function() {
                    main.classList.remove('is-hiding');
                }, 100);
            }, 1000);
        });
    });
}