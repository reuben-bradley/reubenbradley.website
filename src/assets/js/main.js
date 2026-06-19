/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		$contactForm = $('#contact form'),
		$formResultsModal = $('#contact .results-wrapper'),
		$formResults = $('#contact #form-results'),
		settings = {

			// Parallax background effect?
			parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
			parallaxFactor: 20

		};

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1800px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: [null, '480px'],
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Touch?
	if (browser.mobile) {

		// Turn on touch mode.
		$body.addClass('is-touch');

		// Height fix (mostly for iOS).
		window.setTimeout(function () {
			$window.scrollTop($window.scrollTop() + 1);
		}, 0);

	}
	else {
		// Turn off touch mode
		$body.removeClass('is-touch');
	}

	// Footer.
	breakpoints.on('<=medium', function () {
		$footer.insertAfter($main);
	});

	breakpoints.on('>medium', function () {
		$footer.appendTo($header);
	});

	// Header.

	// Parallax background.

	// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
	if (browser.name == 'ie'
		|| browser.mobile)
		settings.parallax = false;

	if (settings.parallax) {

		breakpoints.on('<=medium', function () {
			$window.off('scroll.strata_parallax');
			$header.css('background-position', '');
		});

		breakpoints.on('>medium', function () {
			$header.css('background-position', 'left 0px');
			$window.on('scroll.strata_parallax', function () {
				$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
			});
		});

		$window.on('load', function () {
			$window.triggerHandler('scroll');
		});

	}

	// Main Sections: Two.

	// Lightbox gallery.
	$window.on('load', function () {
		$('#work').poptrox({
			caption: function ($a) { return $a.next('.caption').children().clone(); },
			overlayColor: '#2c2c2c',
			overlayOpacity: 0.85,
			popupCloserText: '',
			popupLoaderText: '',
			selector: '.work-item a.image',
			popupSelector: '#poptrox-popup',
			usePopupCaption: true,
			usePopupDefaultStyling: false,
			usePopupEasyClose: false,
			usePopupNav: true,
			windowMargin: (breakpoints.active('<=small') ? 0 : 50)
		});
	});

	// Main Sections: Four.

	// Contact form
	$window.on('load', function () {
		$contactForm.find('input[type="email"], input[type="text"]:not(.sweet-vessel), textarea').on('focus', function (event) {
			$(event.target).addClass('touched');
		});

		$contactForm.on('submit', function (event) {
			event.preventDefault();
			const formData = new FormData($contactForm[0]);
			const jsonPayload = JSON.stringify(Object.fromEntries(formData));
			$formResultsModal.addClass('show');
			$formResults.text('Please wait ...');

			fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				body: jsonPayload,
			})
			.then(async (response) => {
				const json = await response.json();
				if (response.status == 200) {
					$formResults.text(json.message + ' Your contact has been received, and I will be in touch shortly!');
					$contactForm.find('input[type="email"], input[type="text"]:not(.sweet-vessel), textarea').removeClass('touched');
					$contactForm[0].reset();
				}
				else {
					console.log(response);
					$formResults.text('Sorry, an error occurred: ' + json.message);
				}
			})
			.catch((error) => {
				console.error(error);
				$formResults.text('Sorry, something went wrong and the form could not be submitted.');
			})
			.then(() => {
				setTimeout(() => {
					$formResultsModal.removeClass('show');
					$formResults.text('');
				}, 8000);
			});
		});
	});
})(jQuery);