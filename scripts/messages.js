const d = document,
	$search = d.querySelector('.search-dialog'),
	$searchContent = d.querySelector('.search-dialog input'),
	$topNavbar = d.querySelector('.top-navbar'),
	$chats = d.querySelectorAll('.message-item'),
	$searchNotFound = d.querySelector('.search-not-found'),
	$hiddenItemsForChat = d.querySelectorAll(
		'.top-navbar,.search-dialog, main,.navbar-bottom'
	),
	$chat = d.querySelector('.chat'),
	$chatContactName = d.querySelector('.chat-information-name'),
	$messages = d.querySelector('.chat-messages'),
	$message = d.querySelector('.chat-message-input'),
	$dialogAlert = d.querySelector('.dialog-alert')

function searchItem(search) {
	search = search.toUpperCase()
	filterQuery($chats, search)
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

function openMessage(message) {
	let $message = message
	if (message.tagName !== 'FIGCAPTION') {
		$message = message.parentElement
	}
	const $contactName = $message.querySelector('.message-item-name'),
		contactName = $contactName.innerText
	$chatContactName.textContent = contactName
	toggleChat()
}

function toggleChat() {
	$hiddenItemsForChat.forEach((el) => {
		el.classList.toggle('hidden')
	})
	$chat.classList.toggle('hidden')
}

function sendNewMessage() {
	const $lastMessage = d.querySelector('.chat-messages li:last-child'),
		$clone = $lastMessage.cloneNode(true),
		$newMessage = $clone.querySelector('p'),
		$hourMessage = $clone.querySelector('small'),
		now = new Date()
	let hours = now.getHours()
	minutes = now.getMinutes()

	if (minutes < 9) minutes = `0${minutes}`

	$newMessage.innerText = $message.value
	$hourMessage.innerText = `${hours}:${minutes}`
	$messages.appendChild($clone)
	$clone.scrollIntoView({ behavior: 'smooth', block: 'start' })
	$message.focus()
	$message.value = ''
}

function confirmDialog() {
	$dialogAlert.classList.toggle()
}

function deleteCurrentChat(response) {
	const $currentMessages = $messages.querySelectorAll('li')
	if (response) {
		$currentMessages.forEach(($currentMessage) => {
			$messages.removeChild($currentMessage)
		})
	}
}

function getConfirmResponse(response) {
	const responseContent = response.innerText.toUpperCase(),
		isConfirm = responseContent === 'CONFIRM'
	$dialogAlert.classList.toggle('hidden')
	return isConfirm
}

d.addEventListener('scroll', (e) => {
	changeNavBG()
})
d.addEventListener('click', (e) => {
	if (e.target.matches('.dialog-alert-response p')) {
		const response = getConfirmResponse(e.target)
		deleteCurrentChat(response)
	}
	if (e.target.closest('.message-item figcaption')) {
		openMessage(e.target)
	}
	if (e.target.matches('.chat-back-button')) {
		toggleChat()
	}
	if (e.target.matches('.chat-send-button')) {
		if ($message.value.length > 0) sendNewMessage()
	}
	if (e.target.matches('.chat-delete-button')) {
		$dialogAlert.classList.remove('hidden')
	}
})
d.addEventListener('keyup', (e) => {
	if (e.target.matches('.search-dialog input')) {
		searchItem(e.target.value)
	}
})
