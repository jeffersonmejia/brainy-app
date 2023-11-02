const d = document,
	$topNavbar = d.querySelector('.top-navbar'),
	$sections = d.querySelectorAll('section')

function toggleSection($change) {
	const change = $change.dataset.section,
		$previousChange = d.querySelector('.navbar-middel-on')
	$sections.forEach(($section) => {
		if ($section.dataset.section === change) {
			$section.classList.remove('hidden')
		} else {
			$section.classList.add('hidden')
		}
	})
	$previousChange.classList.toggle('navbar-middel-on')
	$change.classList.toggle('navbar-middel-on')
}

function changeNavBG() {
	const scrollY = window.scrollY
	if (scrollY > 20) {
		$topNavbar.classList.add('top-navbar-fixed')
	} else {
		$topNavbar.classList.remove('top-navbar-fixed')
	}
}

d.addEventListener('scroll', (e) => {
	changeNavBG()
})
d.addEventListener('click', (e) => {
	if (e.target.matches('.navbar-middel li')) {
		toggleSection(e.target)
	}
})
