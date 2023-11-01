import { menuArray } from '/data.js'

const form = document.getElementById('modal')

let order = {}
let orderComplete = false

menuArray.forEach((element) => {
	order[element.id] = 0
})

document.addEventListener('click', (e) => {
	if (e.target.dataset.item) {
		handleAddBtnClick(e.target.dataset.item)
	} else if (e.target.dataset.remove) {
		handleRemoveClick(e.target.dataset.remove)
	} else if (e.target.id === 'order-btn') {
		handleCompleteOrderClick()
	} else if (e.target.id === 'overlay') {
		toggleModal()
	}
})

form.addEventListener('submit', (e) => {
	e.preventDefault()
	orderComplete = true
	toggleModal()
	renderOrder()
})

renderMenuList()

function calculateOrder() {
	let totalPrice = 0
	Object.keys(order).forEach((key) => {
		totalPrice += menuArray[key].price * order[key]
	})
	return totalPrice
}

function handleAddBtnClick(id) {
	order[id]++
	renderOrder()
}

function handleRemoveClick(id) {
	order[id]--
	renderOrder()
}

function handleCompleteOrderClick() {
	toggleModal()
	orderComplete = true
}

function handlePayBtnClick() {
	orderName = document.getElementById('name-input').value
	// renderOrder()
	// toggleModal()
}

function toggleModal() {
	document.getElementById('modal').classList.toggle('hidden')
	document.getElementById('overlay').classList.toggle('hidden')
}

function getMenuHtml() {
	let html = ``
	menuArray.forEach((element) => {
		html += /*html*/ `
			<li class="menu-list-item">
				<p>${element.emoji}</p>
				<div>
					<h3>${element.name}</h3>
					<h5>${element.ingredients}</h5>
					<h4>${element.price}$</h4>
				</div>
				<button
					class="menu-list-btn"
					data-item="${element.id}">+</button>
			</li>`
	})
	return html
}

function getOrderHtml() {
	let html = /*html*/ `
		<h3>Your order</h3>
		<ul id="order-list">`

	Object.keys(order).forEach((key) => {
		if (order[key]) {
			html += /*html*/ `
			<li class="order-list-row">
				<h3>x${order[key]} ${menuArray[key].name}</h3>
				<p data-remove="${key}">remove</p>
				<h3>${menuArray[key].price * order[key]}$</h3>
			</li>`
		}
	})

	html += /*html*/ `
		</ul>
		<div id="order-summary">
			<h3>Total price:</h3>
			<h3>${calculateOrder()}$</h3>
		</div>
		<button id="order-btn">Complete order</button>`

	return html
}

function renderMenuList() {
	document.getElementById('menu-list').innerHTML = getMenuHtml()
}

function renderOrder() {
	const orderEl = document.getElementById('order')
	if (!orderComplete) {
		orderEl.innerHTML = getOrderHtml()
	} else {
		orderEl.innerHTML = /*html*/ `
			<h3 id="order-complete">Thanks, ${
				document.getElementById('name-input').value
			}! Your order is on its way!</h3>
		`
	}
}
