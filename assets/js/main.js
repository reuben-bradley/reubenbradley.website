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
            games.classList.add('is-showing');
            setTimeout(function() {
                main.style.display = 'none';
                games.style.display = 'block';
                setTimeout(function() {
                    main.classList.remove('is-hiding');
                    games.classList.remove('is-showing');
                }, 100);
            }, 250);
        });
        returnLink.addEventListener('click', function(e) {
            e.preventDefault();
            games.classList.add('is-hiding');
            main.classList.add('is-showing');
            setTimeout(function() {
                games.style.display = 'none';
                main.style.display = 'block';
                setTimeout(function() {
                    games.classList.remove('is-hiding');
                    main.classList.remove('is-showing');
                }, 100);
            }, 250);
        });
    });
}