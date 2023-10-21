const d = document,
	$search = d.querySelector('.search-dialog'),
	$searchContent = d.querySelector('.search-dialog input'),
	$filter = d.querySelector('.filter-dialog'),
	$coursesName = d.querySelectorAll('.course-item-name'),
	$coursesTeacher = d.querySelectorAll('.course-item-teacher')

function toggleSearchDialog() {
	$search.classList.toggle('hidden')
	$searchContent.focus()
}

function toggleFilterItems() {
	$filter.classList.toggle('hidden')
}

function searchItem(search) {
	const type = search.dataset.filterBy,
		query = search.value
	console.log(type)
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
		console.log(name)
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

d.addEventListener('click', (e) => {
	if (e.target.matches('#search-button')) {
		toggleSearchDialog()
	}
	if (e.target.matches('#filter-button')) {
		toggleFilterItems()
	}
	if (e.target.matches('.filter-dialog span')) {
		changeFilterMode(e.target)
	}
})
d.addEventListener('keyup', (e) => {
	if (e.target.matches('.search-dialog input')) {
		searchItem(e.target)
	}
})
