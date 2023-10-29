const d = document,
	$topNavbar = d.querySelector('.top-navbar'),
	$activities = d.querySelectorAll('.activity-item'),
	$activitiesParent = d.querySelector('.activities'),
	$searchNotFound = d.querySelector('.search-not-found'),
	$paginationButton = d.querySelector('.pagination-button'),
	$searchSort = d.querySelector('.search-sort button')

let isTasksSorted = false

function searchItem(search) {
	search = search.toUpperCase()
	filterQuery($activities, search)
}

function filterByCategory(filter) {
	const old = d.querySelector('.filter-option-on')
	let name = filter.dataset.filter
	name = name.toUpperCase()
	if (old) {
		old.classList.remove('filter-option-on')
	}
	if (filter.id.includes('filter')) {
		filter.classList.add('filter-option-on')
	} else {
		const parent = filter.parentElement
		parent.classList.add('filter-option-on')
	}

	$activities.forEach(($activity) => {
		const $category = $activity.querySelector('.activity-item-category'),
			category = $category.innerText.toUpperCase(),
			categoryButton = $category.parentElement

		if (category !== name) {
			$activity.classList.add('hidden')
			categoryButton.classList.remove('filter-option-on')
		} else {
			$activity.classList.remove('hidden')
		}
		categoryButton.classList.add('filter-option-on')
	})
}

function filterQuery(set, query) {
	let hiddenCounter = 0
	set.forEach((node) => {
		const $title = node.querySelector('h4'),
			$content = node.querySelector('p'),
			title = $title.innerText.toUpperCase(),
			content = $content.innerText.toUpperCase()

		if (!title.includes(query) || !content.includes(query)) {
			node.classList.add('hidden')
			hiddenCounter++
		}
		if (title.includes(query) || content.includes(query)) {
			node.classList.remove('hidden')
			hiddenCounter--
			if (query.length > 0) {
				highlightText(query, $title)
				highlightText(query, $content)
			} else {
				removeHighlightText($title)
				removeHighlightText($content)
			}
		}
	})
	if (hiddenCounter === set.length) {
		$searchNotFound.classList.remove('hidden')
		$paginationButton.classList.add('hidden')
	} else {
		$searchNotFound.classList.add('hidden')
		$paginationButton.classList.remove('hidden')
	}
}

function resetFilter() {
	const filtered = d.querySelectorAll('.filter-option-on')
	filtered.forEach((el) => {
		el.classList.remove('filter-option-on')
	})
	$activities.forEach((el) => {
		el.classList.remove('hidden')
	})
}

function sortItemsToCache(state, sortFilter) {
	if (state === 'off') {
		const sorted = [],
			$fragment = d.createDocumentFragment()

		$activities.forEach(($activity) => {
			const $name = $activity.querySelector('h5')
			const $clone = $activity.cloneNode(true)
			sorted.push({ name: $name.innerText, el: $clone })
			$activity.classList.add('hidden')
			$activity.setAttribute('data-reset', '')
		})
		sorted.sort((a, b) => {
			return a.name.localeCompare(b.name)
		})
		sorted.forEach((activity) => {
			activity.el.setAttribute('data-sorted', '')
			$fragment.appendChild(activity.el)
		})
		$activitiesParent.insertBefore($fragment, $paginationButton)
		sortFilter.innerText = 'filter_list_off'
		sortFilter.setAttribute('data-sort', 'on')
		isTasksSorted = true
	}
}

function sortItemsByCache(state, sortFilter) {
	const $sorted = $activitiesParent.querySelectorAll('[data-sorted]'),
		$unsorted = $activitiesParent.querySelectorAll('[data-reset]')
	$unsorted.forEach((unsorted) => {
		unsorted.classList.toggle('hidden')
	})
	$sorted.forEach((sorted) => {
		sorted.classList.toggle('hidden')
	})
	if (state === 'off') {
		sortFilter.setAttribute('data-sort', 'on')
		sortFilter.innerText = 'filter_list_off'
	} else {
		sortFilter.innerText = 'filter_list'
		sortFilter.setAttribute('data-sort', 'off')
	}
}

function sortItems(sortFilter) {
	const state = sortFilter.dataset.sort
	if (isTasksSorted) {
		sortItemsByCache(state, sortFilter)
	} else {
		sortItemsToCache(state, sortFilter)
	}
}

function highlightText(text, el) {
	const old = el.querySelectorAll('.highlight-text')
	old.forEach((oldElement) => {
		const parent = oldElement.parentNode
		const textNode = document.createTextNode(oldElement.textContent)
		parent.replaceChild(textNode, oldElement)
	})

	const regex = new RegExp(`${text}`, 'gi')
	const highlight = '<span class="highlight-text">$&</span>'
	const replace = el.innerHTML.replace(regex, highlight)
	el.innerHTML = replace
}

function removeHighlightText(set) {
	const setHightlight = set.querySelectorAll('.highlight-text')
	setHightlight.forEach((highlight) => {
		const textNode = d.createTextNode(highlight.textContent)
		set.replaceChild(textNode, highlight)
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

d.addEventListener('click', (e) => {
	if (e.target.closest('#reset-filter')) {
		resetFilter()
	}
	if (e.target.closest('.filter-options li')) {
		if (e.target.id !== 'reset-filter') {
			filterByCategory(e.target)
		}
	}
	if (e.target.matches('.search-sort ')) {
		sortItems(e.target)
	}
})

d.addEventListener('keyup', (e) => {
	if (e.target.matches('.search-dialog input')) {
		searchItem(e.target.value)
	}
})
