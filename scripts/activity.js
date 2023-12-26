const d = document,
	$topNavbar = d.querySelector('.top-navbar'),
	$buttonFile = d.getElementById('button-file'),
	$inputFile = d.getElementById('input-file'),
	$dragover = d.querySelector('.dragover-area'),
	$fileUploaded = d.querySelector('.file-uploaded p'),
	$groupDeliverButton = d.querySelector('.group-deliver-button'),
	$groupUploadButton = d.querySelector('.group-upload-button'),
	$taskState = d.querySelector('.activities-section-category-pending'),
	$taskTime = d.querySelector('.activities-section-category-left'),
	$taskGrade = d.querySelector('.activities-section-category-grade small'),
	$cancelDelibery = d.querySelector('.cancel-deliver-button')

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
	const copy = path.split('\\')
	let name = copy[copy.length - 1]
	if (name.length >= 32) {
		name = `${name.slice(0, 32)}...`
	}
	if (name.length > 0) {
		$fileUploaded.innerText = name
		$fileUploaded.classList.add('file-uploaded-on')
		$groupDeliverButton.classList.remove('hidden')
		$groupUploadButton.classList.add('hidden')
	} else {
		$fileUploaded.innerText = 'No file uploaded'
		$fileUploaded.classList.remove('file-uploaded-on')
		$groupDeliverButton.classList.add('hidden')
		$groupUploadButton.classList.remove('hidden')
	}
}
function cancelDeliver() {
	$groupDeliverButton.classList.add('hidden')
	$groupUploadButton.classList.remove('hidden')
	$fileUploaded.classList.remove('file-uploaded-on')
	$fileUploaded.innerText = 'No file uploaded'
	$inputFile.value = ''
}

function deliverTask($deliberButton) {
	const $stateIcon = $taskState.querySelector('span'),
		$stateText = $taskState.querySelector('small'),
		$successMessage = $deliberButton

	$groupUploadButton.classList.add('hidden')
	$fileUploaded.classList.remove('file-uploaded-on')
	$fileUploaded.parentElement.style.marginTop = '0.5rem'
	$fileUploaded.parentElement.style.marginBottom = '1rem'

	$stateIcon.innerText = 'task_alt'
	$stateText.innerText = 'Delivered'
	$taskTime.classList.add('hidden')

	$taskGrade.innerText = 'Not yet'
	$successMessage.classList.add('deliber-success-button')
	$successMessage.textContent = 'Delibered'
	$cancelDelibery.classList.add('visibility-off')

	setTimeout(() => {
		$groupDeliverButton.classList.add('hidden')
	}, 1500)
}

d.addEventListener('click', (e) => {
	if (e.target.matches('#button-file')) {
		$inputFile.click()
	}
	if (e.target.matches('.cancel-deliver-button')) {
		cancelDeliver()
	}
	if (e.target.matches('.send-deliver-button')) {
		deliverTask(e.target)
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
