const d = document,
	$topNavbar = d.querySelector('.top-navbar'),
	$buttonFile = d.getElementById('button-file'),
	$inputFile = d.getElementById('input-file'),
	$dragover = d.querySelector('.dragover-area'),
	$fileUploaded = d.querySelector('.file-uploaded p')

function changeNavBG() {
	const scrollY = window.scrollY
	if (scrollY > 20) {
		$topNavbar.classList.add('top-navbar-fixed')
	} else {
		$topNavbar.classList.remove('top-navbar-fixed')
	}
}

function handleDrop(file) {
	console.log(file)
}

function getFileName(path) {
	const copy = path.split('\\'),
		name = copy[copy.length - 1]
	$fileUploaded.innerText = name
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
	const file = e.dataTransfer.files
	handleDrop(file)
})

d.addEventListener('dragover', (e) => {
	e.preventDefault()
	$dragover.classList.remove('visibility-off')
})

d.addEventListener('mouseout', (e) => {
	if (!$dragover.classList.contains('visibility-off')) {
		$dragover.classList.add('visibility-off')
	}
})

d.addEventListener('change', (e) => {
	if (e.target.matches('#input-file')) {
		getFileName(e.target.value)
	}
})
