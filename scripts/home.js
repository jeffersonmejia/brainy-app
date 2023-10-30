const d = document,
	$search = d.querySelector('.search-dialog'),
	$searchContent = d.querySelector('.search-dialog input'),
	$courses = d.querySelectorAll('.course-item'),
	$topNavbar = d.querySelector('.top-navbar'),
	$searchNotFound = d.querySelector('.search-not-found')

function searchItem(search) {
	let hiddenCounter = 0,
		isEmptyQuery = search.length === 0

	search = search.toUpperCase()
	$courses.forEach(($course) => {
		const $courseName = $course.querySelector('.course-item-name'),
			$courseNameHighliht = $courseName.parentElement,
			courseName = $courseName.innerText.toUpperCase(),
			courseNameSplit = courseName.split('(')[0],
			isFound = courseNameSplit.includes(search)

		if (isEmptyQuery) {
			$courseNameHighliht.classList.remove('filter-option-on')
		}
		if (isFound) {
			$course.classList.remove('hidden')

			if (!isEmptyQuery) {
				$courseNameHighliht.classList.add('filter-option-on')
			}
			hiddenCounter--
		} else {
			$course.classList.add('hidden')
			$courseNameHighliht.classList.remove('filter-option-on')
			hiddenCounter++
		}
	})
	if (hiddenCounter === $courses.length) {
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
