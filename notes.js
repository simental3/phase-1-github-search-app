// GitHub Search App Notes //

// I. 'User Search Endpoint' Search Input
const baseURL = "https://api.github.com/search/users?q="


const form = document.querySelector('#github-form')         // => <form id="github-form">...</form>   // grabs the 'github-form' 
// const form = document.getElementById('github-form');     // getElementById also works
form.addEventListener('submit', (event) => {                // adds a 'submit' event to the form
	event.preventDefault()                                  // prevents form submission from automatically refreshing page
	// console.log('event', event)                          // => event: SubmitEvent {isTrusted: true, submitter: input, type: 'submit', target: form#github-form, currentTarget: form#github-form, …}
	// event.target[0].value                                // => what we want to target
   // fetch(`https://api.github.com/search/users?q=${event.target[0].value}`) // also works
	fetch(`${baseURL}${event.target[0].value}`)             // fetches the username that is submitted into the github-form 
	.then(response => response.json())                      // 
	.then(data => {
		//username: (login), avatar: (avatar_url), link to profile: (url)
		console.log("data:", data)})                        //    {total_count: 1, incomplete_results: false, items: Array(1)}   // print out the data first to make sure it's the data I'm looking for (enter username to check: 'simental3')
                                                            //    incomplete_results: false
                                                            // => items: Array(1)
                                                            //    total_count: 1
                                                            //    [[Prototype]]: Object
      console.log(data.items[0])                            // =>     0: {login: 'simental3', id: 99388697, node_id: 'U_kgDOBeyNGQ', avatar_url: 'https://avatars.githubusercontent.com/u/99388697?v=4', gravatar_id: '', …}     
      console.log("login:", data.items[0].login)            // drills down to the 'login' info we want which can be found in the 'items' section
})

// II. Display User Info
const form = document.querySelector('#github-form')
form.addEventListener('submit', (event) => {
	event.preventDefault()
	// data we want to pass from the form
	// event.target[0].value
	fetch(`${baseURL}${event.target[0].value}`)
	.then(response => response.json())
	.then(data => {
		//username: (login), avatar: (avatar_url), link to profile: (url)
      data.items.map(item => {                              // 'data.items.map' gets us to the array     // '.map' iterates through the array & returns a new array     // use 'item' because it is the singular of 'items' (name of array) ex: 'user' for 'users' (name of array)
			const li = document.createElement('li')         // creates <li> tags inside the <ul>
			const h2 = document.createElement('h2')         // creates <h2> heading 
			h2.textContent = item.login                     // adds 'login' info text
			const img = document.createElement('img')       // creates <img> tags 
			img.src = item.avatar_url                       // adds 'avatar url' text to display image via the url link
   
			const userList = document.querySelector('#user-list') // grabs the <ul id ='user-list'>, where the <li's> we are .map'ing will appear
			li.append(h2, img)                              // appends an <h2> & <img> inside each <li>
			userList.append(li)                             // appends user the <li('s)> inside the <ul> we grabbed above
      })
	})
})

// III. 'User Repos Endpoint' GET Request (Return Data)
const baseURL = "https://api.github.com/search/users?q="

const form = document.querySelector('#github-form')
form.addEventListener('submit', (event) => {
	event.preventDefault()
	// data we want to pass from the form
	// event.target[0].value
	fetch(`${baseURL}${event.target[0].value}`)
	.then(response => response.json())
	.then(data => {
		//login, avatar_url, url
		// console.log("login:", data.items[0].login)
		data.items.map(item => {
			const li = document.createElement('li')
			const h2 = document.createElement('h2')
			h2.textContent = item.login

			h2.addEventListener('click', (event) => displayUserRepos(item.login, event)) // makes a 'click' event (w/ an event listener) for the username ('item.login' is the identifier to get username info). needs to be 'item.login' to work, replacing it with 'username' will return: index.js:19 Uncaught ReferenceError: username is not defined at HTMLHeadingElement.<anonymous> (index.js:69:61)
			const img = document.createElement('img')
			img.src = item.avatar_url
   
			const userList = document.querySelector('#user-list')
			li.append(h2, img)
			userList.append(li)
		})
	})
})

function displayUserRepos(username, event) {                // needs the event in the argument for preventDefault(), & username for the `fetch(link${username})` 'username' can be replaced with anything, such as 'login' or 'Halo'
    event.preventDefault()                                  // stops form from refreshing web page
    // console.log(username)                                // => username: octocat     // double check by searching username 'octocat', click on 'octocat' to print it out in the console
    fetch(`https://api.github.com/users/${username}/repos`) // 
    .then(response => response.json())                      // 
	.then(data => console.log(data))                        // 
}

// IV. 'User Repos Endpoint' Display Repos
const baseURL = "https://api.github.com/search/users?q="

const form = document.querySelector('#github-form');
form.addEventListener('submit', (event) => {
	event.preventDefault()
	// data we want to pass from the form
	// event.target[0].value
	fetch(`${baseURL}${event.target[0].value}`)
	.then(response => response.json())
	.then(data => {
		// login, avatar_url, url
		data.items.map(item => {
			const li = document.createElement('li');
			const h2 = document.createElement('h2')
			h2.textContent = item.login

			h2.addEventListener('click', (event) => displayUserRepos(item.login, event))
			const img = document.createElement('img')
			img.src = item.avatar_url
   
			const userList = document.querySelector('#user-list')
			li.append(h2, img)
			userList.append(li)
		})
	})
})

function displayUserRepos(username, event) {
	event.preventDefault()
	fetch(`https://api.github.com/users/${username}/repos`)
	.then(response => response.json())
	.then(data => data.map(repo => {                        // => (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]     // => 0: {id: 132935648, node_id: 'MDEwOlJlcG9zaXRvcnkxMzI5MzU2NDg=', name: 'boysenberry-repo-1', full_name: 'octocat/boysenberry-repo-1', private: false, …}
        const li = document.createElement('li')             // creates an <li> tag for each repo because it's in between the '{ }' of 'data.map{ }'
        const h1 = document.createElement('h1')             // creates an <h1> tag for each 
        h1.textContent = repo.name                          // the h1 will display the 'repo name' for each repository in the 'data' array for the username that is clicked on
        const reposList = document.querySelector('#repos-list') // grabs the <ul> tag  id="repos-list" for where we want to place the <li's> & <h1's>
    }))                                    
}

// V.
const baseURL = "https://api.github.com/search/users?q="

const form = document.querySelector('#github-form');
form.addEventListener('submit', (event) => {
	event.preventDefault()
	// data we want to pass from the form
	// event.target[0].value
    // fetch(`https://api.github.com/search/users?q=${event.target[0].value}`) // also works
	fetch(`${baseURL}${event.target[0].value}`)
	.then(response => response.json())
	.then(data => {
		// login, avatar_url, url
		const userList = document.querySelector('#user-list')
        // const userList = document.getElementById('user-list')        // also works
		const reposList = document.querySelector('#repos-list')
        // const reposList = document.getElementById('repos-list')      // also works
		reposList.innerHTML = ""                                        // empties out the reposList <ul> to stop the search list from repeatedly appending the list if the h2 is clicked multiple times
		userList.innerHTML = ""                                         // empties out the userList <ul> to stop the search list from repeatedly appending the list if the h2 is clicked multiple times
		data.items.map(item => {
			const li = document.createElement('li');
			const h2 = document.createElement('h2')
			h2.textContent = item.login

			h2.addEventListener('click', (event) => displayUserRepos(item.login, event)) // calls on 'displayUserRepos' function when an 'h2' (username) is clicked
			const img = document.createElement('img')
			img.src = item.avatar_url
   
			li.append(h2, img)                                          // this part adds <li's> based on how many there are based on the reponse (aka the 'click')
			userList.append(li)                                         // ^^
		})
        // event.target[0].value = ""                                   // does the same thing as form.reset(), it is the least preferred way, but only does the first element
        // event.target[1].value = ""                                   // example of what you would need to do for each one if you had multiple elements
	})
    form.reset()												        // built-in function for forms that automatically clears out your input fields. the easier option, especially if you have multiple form inputs
})

function displayUserRepos(username, event) {                            // Step 1: empties out the repos-list <ul> first, Step 2: get fetch request & response/data, Step 3: adds the data onto the webpage
	event.preventDefault()
                                                                        // Step 1:
	const reposList = document.querySelector('#repos-list')             // grabs the <ul> section where the <h1's> & <li's> will be placed inside 
	reposList.innerHTML = ""                                            // takes off the old stuff BEFORE putting the new stuff in

	fetch(`https://api.github.com/users/${username}/repos`)             // Step 2:
	.then(response => response.json())
	.then(data => data.map(repo => {
		const h1 = document.createElement('h1')
		h1.textContent = repo.mame
                                                                        // Step 3:
		li.append(h1)                                                   // appends the <li> to the <h1> tag
		reposList.append(li)                                            // appends the rep
        // userList.innerHTML += `<li><h2>${item.login}</h2></li>`      // less preferred way to append to index.html
	}))
}

/*
// DELIVERABLES //
You are going to build a JavaScript application which searches GitHub for users by name and displays the results on the screen. Clicking on a specific user will show all the repositories for that user.
   1. The index.html file has a form with a search input. When the form is submitted, it should take the value of the input and search GitHub for user matches using the User Search Endpoint.
   2. Using the results of the search, display information about the users to the page. (You might include showing their username, avatar and a link to their profile.)
   3. Clicking on one of these users should send a request to the User Repos Endpoint and return data about all the repositories for that user.
   4. Using the response from the Users Repos Endpoint, display all the repositories for that user on the page.
// BONUS //
   - Toggle the search bar between searching for users by keyword & searching for repos by keyword by adding an extra button. Hint: you can use the same search bar for this, but you may need to create a variable which stores what the current search type is (user or repo). The endpoint to search repositories by keyword is here.
*/