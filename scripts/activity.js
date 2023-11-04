const d = document,
	$topNavbar = d.querySelector('.top-navbar'),
	$buttonFile = d.getElementById('button-file'),
	$inputFile = d.getElementById('input-file'),
	$dragover = d.querySelector('.dragover-area')

function changeNavBG() {
	const scrollY = window.scrollY
	if (scrollY > 20) {
		$topNavbar.classList.add('top-navbar-fixed')
	} else {
		$topNavbar.classList.remove('top-navbar-fixed')
	}
}

function handleDrop(event) {
	const file = event.dataTransfer.files
	console.log(file)
}
d.addEventListener('click', (e) => {
	if (e.target.matches('#button-file')) {
		$inputFile.click()
	}
})
d.addEventListener('scroll', (e) => {
	changeNavBG()
})
d.addEventListener('keyup', (e) => {
	if (e.target.matches('.search-dialog input')) {
		searchItem(e.target.value)
	}
})

d.addEventListener('drop', (e) => {
	e.preventDefault()
	handleDrop(e)
	console.log(e)
})
d.addEventListener('dragover', (e) => {
	if ($dragover.classList.contains('visibility-off')) {
		$dragover.classList.remove('visibility-off')
	}
})

d.addEventListener('mouseout', (e) => {
	if (!$dragover.classList.contains('visibility-off')) {
		$dragover.classList.add('visibility-off')
	}
})
