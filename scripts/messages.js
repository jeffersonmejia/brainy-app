const d = document,
	$search = d.querySelector('.search-dialog'),
	$searchContent = d.querySelector('.search-dialog input'),
	$filter = d.querySelector('.filter-dialog'),
	$coursesName = d.querySelectorAll('.course-item-name'),
	$coursesTeacher = d.querySelectorAll('.course-item-teacher'),
	$topNavbar = d.querySelector('.top-navbar')

function toggleSearchDialog(button) {
	const isSearchOff = $search.classList.contains('hidden')
	if (isSearchOff) {
		$search.classList.remove('hidden')
		button.textContent = 'search_off'
		$searchContent.focus()
	} else {
		$search.classList.add('hidden')
		button.textContent = 'search'
	}
}

function toggleFilterItems() {
	$filter.classList.toggle('hidden')
}

function searchItem(search) {
	const type = search.dataset.filterBy,
		query = search.value
	if (!type) {
		filterBySubject(query)
	} else {
		filterByTeacher(query)
	}
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
function filterByTeacher(query) {
	query = query.toUpperCase()
	$coursesTeacher.forEach((course) => {
		const $listItem = course.parentElement,
			$list = $listItem.parentElement,
			$currentCourse = $list.parentElement
		let name = course.textContent
		name = name.split(' ')[1] + name.split(' ')[2]

		name = name.toUpperCase()
		if (!name.includes(query)) {
			$currentCourse.classList.add('hidden')
		} else {
			$currentCourse.classList.remove('hidden')
		}
	})
}

function changeFilterMode(filter) {
	let mode = filter.textContent
	const parent = filter.parentElement,
		previousFilter = parent.querySelector('.filter-item-active')
	previousFilter.classList.remove('filter-item-active')
	filter.classList.add('filter-item-active')
	mode = mode.toUpperCase()
	$searchContent.setAttribute('data-filter-by', mode)
	$filter.classList.add('hidden')
}

function changeNavBG() {
	const scrollY = window.scrollY
	if (scrollY > 20) {
		$topNavbar.classList.add('top-navbar-bg')
	} else {
		$topNavbar.classList.remove('top-navbar-bg')
	}
}

d.addEventListener('click', (e) => {
	if (e.target.matches('#search-button')) {
		toggleSearchDialog(e.target)
	}
	if (e.target.matches('#filter-button')) {
		toggleFilterItems()
	}
	if (e.target.matches('.filter-dialog span')) {
		changeFilterMode(e.target)
	}
})
d.addEventListener('scroll', (e) => {
	changeNavBG()
})
d.addEventListener('keyup', (e) => {
	if (e.target.matches('.search-dialog input')) {
		searchItem(e.target)
	}
})
