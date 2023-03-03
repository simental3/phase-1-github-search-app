// GitHub Search App //

const baseURL = "https://api.github.com/search/users?q="


const form = document.querySelector('#github-form');

// Search Input Form ('Submit') Event Listener
form.addEventListener('submit', (event) => {
	event.preventDefault()
	// data we want to pass from the form
	// event.target[0].value
	fetch(`${baseURL}${event.target[0].value}`)
	.then(response => response.json())
	.then(data => {
		const reposList = document.querySelector('#repos-list')
		const userList = document.querySelector('#user-list')
		reposList.innerHTML = ""
		userList.innerHTML = ""
		
		// login, avatar_url, url
		data.items.map(item => {
			const li = document.createElement('li');
			const h2 = document.createElement('h2')
			h2.textContent = item.login

			h2.addEventListener('click', (event) => displayUserRepos(item.login, event))
			const img = document.createElement('img')
			img.src = item.avatar_url
   
			li.append(h2, img)
			userList.append(li)
		})
	})
	form.reset()
})


function displayUserRepos(username, event) {
	event.preventDefault()

	const reposList = document.querySelector('#repos-list')
	reposList.innerHTML = ""

	fetch(`https://api.github.com/users/${username}/repos`)
	.then(response => response.json())
	.then(data => data.map(repo => {
		const li = document.createElement('li') // maybe delete???
		const h1 = document.createElement('h1')
		h1.textContent = repo.name

		li.append(h1)
		reposList.append(li)
	}))
}


/*
// Deliverables //
You are going to build a JavaScript application which searches GitHub for users by name and displays the results on the screen. Clicking on a specific user will show all the repositories for that user.
   1. The index.html file has a form with a search input. When the form is submitted, it should take the value of the input and search GitHub for user matches using the User Search Endpoint.
   2. Using the results of the search, display information about the users to the page. (You might include showing their username, avatar and a link to their profile.)
   3. Clicking on one of these users should send a request to the User Repos Endpoint and return data about all the repositories for that user.
   4. Using the response from the Users Repos Endpoint, display all the repositories for that user on the page.
// Bonus //
   - Toggle the search bar between searching for users by keyword and searching for repos by keyword by adding an extra button. Hint: you can use the same search bar for this, but you may need to create a variable which stores what the current search type is (user or repo). The endpoint to search repositories by keyword is here.
*/