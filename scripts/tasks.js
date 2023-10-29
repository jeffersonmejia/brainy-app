const d = document,
	$topNavbar = d.querySelector('.top-navbar'),
	$activities = d.querySelectorAll('.activity-item'),
	$activitiesParent = d.querySelector('.activities'),
	$searchNotFound = d.querySelector('.search-not-found'),
	$paginationButton = d.querySelector('.pagination-button'),
	$search = d.querySelector('.search-dialog input'),
	$searchSort = d.querySelector('.search-sort button')

let isClassified = false,
	classifiedCounter = 0

function searchItem(search) {
	search = search.toUpperCase()

	filterQuery($activities, search)
}

function filterByCategory(filter) {
	const $old = d.querySelector('.filter-option-on'),
		$oldItems = d.querySelectorAll('.activities .filter-option-on'),
		$oldCounter = $old?.querySelector('.filter-counter'),
		name = filter.dataset.filter.toUpperCase(),
		isParent = filter.id.includes('filter')

	let counter = 0,
		$counter = null

	$old?.classList.remove('filter-option-on')
	$oldCounter?.classList.add('hidden')
	$oldItems.forEach((el) => {
		el.classList.remove('filter-option-on')
	})
	if (isParent) {
		filter.classList.add('filter-option-on')
		$counter = filter.querySelector('.filter-counter')
	} else {
		const parent = filter.parentElement
		$counter = parent.querySelector('.filter-counter')
		parent.classList.add('filter-option-on')
	}

	counter = countCategories(name)
	classifiedCounter = counter
	$counter.innerText = `(${counter})`
	$counter.classList.remove('hidden')
	isClassified = true
	if ($search.value.length > 0) {
		searchItem($search.value)
	}
}

function countCategories(name) {
	let counter = 0
	$activities.forEach(($activity) => {
		const $category = $activity.querySelector('.activity-item-category'),
			category = $category.innerText.toUpperCase(),
			categoryButton = $category.parentElement

		if (category !== name) {
			$activity.classList.add('hidden')
			categoryButton.classList.remove('filter-option-on')
		} else {
			categoryButton.classList.add('filter-option-on')
			$activity.classList.remove('hidden')
			counter++
		}
	})
	return counter
}

function filterQuery(set, query) {
	let hiddenCounter = 0,
		isEmptyQuery = query.length > 0

	set.forEach((node) => {
		const $title = node.querySelector('h4'),
			$content = node.querySelector('p'),
			title = $title.innerText.toUpperCase(),
			content = $content.innerText.toUpperCase(),
			isFound = title.includes(query) || content.includes(query)

		if (isClassified) {
			const $category = node?.querySelector('.filter-option-on'),
				$parent = $category?.parentElement
			if ($parent) {
				if (!isFound) {
					$parent.classList.add('hidden')
					hiddenCounter++
				}
				if (isFound) {
					$parent.classList.remove('hidden')
					if (isEmptyQuery) {
						highlightText(query, $title)
						highlightText(query, $content)
					} else {
						removeHighlightText($title)
						removeHighlightText($content)
					}
					hiddenCounter--
				}
			}
		} else {
			if (!isFound) {
				node.classList.add('hidden')
				hiddenCounter++
			}
			if (isFound) {
				node.classList.remove('hidden')
				if (isEmptyQuery) {
					highlightText(query, $title)
					highlightText(query, $content)
				} else {
					removeHighlightText($title)
					removeHighlightText($content)
				}
				hiddenCounter--
			}
		}
	})
	if (isClassified) {
		toggleNotFound(hiddenCounter, classifiedCounter)
	} else {
		toggleNotFound(hiddenCounter, set.length)
	}
}

function toggleNotFound(counter, setSize) {
	if (counter === setSize) {
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
		const $counter = el.querySelector('.filter-counter')
		$counter?.classList.add('hidden')
		el.classList.remove('filter-option-on')
	})
	$activities.forEach((el) => {
		el.classList.remove('hidden')
	})
	isClassified = false
	$search.value = ''
	searchItem($search.value)
	classifiedCounter = 0
}

function sortItems(sortFilter) {
	const state = sortFilter.dataset.sort,
		$copyOfActivities = d.querySelectorAll('.activity-item:not(.hidden)')
	if (state === 'off') {
		const sorted = [],
			$fragment = d.createDocumentFragment()

		$copyOfActivities.forEach(($activity) => {
			const $name = $activity.querySelector('h5'),
				$clone = $activity.cloneNode(true)
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
	} else {
		const $sorted = $activitiesParent.querySelectorAll('[data-sorted]'),
			$unsorted = $activitiesParent.querySelectorAll('[data-reset]')
		$sorted.forEach((sorted) => {
			$activitiesParent.removeChild(sorted)
		})
		$unsorted.forEach((unsorted) => {
			const $classified = unsorted?.querySelector('.filter-option-on')
			if (isClassified) {
				$classified?.parentElement.classList.remove('hidden')
			} else {
				unsorted.classList.remove('hidden')
			}
		})

		sortFilter.innerText = 'filter_list'
		sortFilter.setAttribute('data-sort', 'off')
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
	if (e.target.closest('.filter-option-item')) {
		filterByCategory(e.target)
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
