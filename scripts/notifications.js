const d = document,
	$notifications = d.querySelectorAll('.message-item'),
	$topNavbar = d.querySelector('.top-navbar'),
	$searchNotFound = d.querySelector('.search-not-found')

function searchItem(search) {
	search = search.toUpperCase()
	filterQuery($notifications, search)
}

function filterQuery(set, query) {
	let hiddenCounter = 0
	set.forEach((node) => {
		const $title = node.querySelector('.message-item-name'),
			$content = node.querySelector('.message-item-content'),
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
	} else {
		$searchNotFound.classList.add('hidden')
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
d.addEventListener('keyup', (e) => {
	if (e.target.matches('.search-dialog input')) {
		searchItem(e.target.value)
	}
})
