const d = document,
	$search = d.querySelector('.search-dialog'),
	$searchContent = d.querySelector('.search-dialog input'),
	$coursesName = d.querySelectorAll('.course-item-name'),
	$coursesTeacher = d.querySelectorAll('.course-item-teacher'),
	$topNavbar = d.querySelector('.top-navbar')

function searchItem(search) {
	filterBySubject(search.value)
}

function filterBySubject(query) {
	query = query.toUpperCase()
	$coursesName.forEach((course) => {
		const $listItem = course.parentElement,
			$list = $listItem.parentElement,
			$currentCourse = $list.parentElement
		let name = course.textContent
		name = name.split(' ')[0]
		name = name.toUpperCase()
		if (!name.includes(query)) {
			$currentCourse.classList.add('hidden')
		} else {
			$currentCourse.classList.remove('hidden')
		}
	})
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
		searchItem(e.target)
	}
})
