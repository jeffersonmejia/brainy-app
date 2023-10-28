const d = document,
	$search = d.querySelector('.search-dialog'),
	$searchContent = d.querySelector('.search-dialog input'),
	$coursesName = d.querySelectorAll('.course-item-name'),
	$topNavbar = d.querySelector('.top-navbar'),
	$searchNotFound = d.querySelector('.search-not-found')

function searchItem(search) {
	let hiddenCounter = 0
	search = search.toUpperCase()
	$coursesName.forEach((course) => {
		const $listItem = course.parentElement,
			$list = $listItem.parentElement,
			$currentCourse = $list.parentElement,
			parent = $currentCourse.parentElement
		let name = course.textContent
		name = name.split(' ')[0]
		name = name.toUpperCase()
		if (!name.includes(search)) {
			parent.classList.add('hidden')
			hiddenCounter++
		} else {
			parent.classList.remove('hidden')
			hiddenCounter--
		}
	})
	if (hiddenCounter === $coursesName.length) {
		$searchNotFound.classList.remove('hidden')
	} else {
		$searchNotFound.classList.add('hidden')
	}
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
d.addEventListener('keyup', (e) => {
	if (e.target.matches('.search-dialog input')) {
		searchItem(e.target.value)
	}
})
