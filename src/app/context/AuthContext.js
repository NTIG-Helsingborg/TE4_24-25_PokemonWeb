"use client" //Indicates that following code should run on the client-side

export const useAuth = () => {
  "use client"
	const output_object = {
		currentUser: null,
		get isAuthenticated() {
			return this.currentUser !== null
		},
		register: (email, password) => {
			const users = JSON.parse(localStorage.getItem("users")) || [] //retrieves list of existing users from localStorage
			//Checks if the current user already exists by searching for their email. If they do, it alerts and exits.
			const userExists = users.find((user) => user.email === email)
			if (userExists) {
				alert("User already exists")
				return
			}

			//If currentUser does not exist, it creates a new user object and adds it to the list.
			const newUser = { email, password }
			users.push(newUser)

			//The updated user list is then saved back to localStorage.
			localStorage.setItem("users", JSON.stringify(users))
			alert("Registration successful")
			location.href = "/TE4_24-25_PokemonWeb/login"
		},
		login: (email, password) => {
			const users = JSON.parse(localStorage.getItem("users")) || [] //Retrieves the existing users from localStorage.

			//Checks if the provided email and password match any user in the list
			const user = users.find((user) => user.email === email && user.password === password)

			//If a match is found, it updates the currentUser state, saves the user to localStorage
			if (user) {
				localStorage.setItem("currentUser", JSON.stringify(user))
        output_object.currentUser=user
				alert("Login successful")
				location.href = "/TE4_24-25_PokemonWeb/"
			} else {
				alert("Invalid email or password") //If no match is found, it alerts the user about the invalid credentials
			}
		},
		logout: () => {
			//Sets the currentUser state back to null and removes the currentUser from localStorage
      output_object.currentUser=null
			localStorage.removeItem("currentUser")
      window.location.href = '/TE4_24-25_PokemonWeb/login'
		},
	}
  if (typeof window !== 'undefined') {
    output_object.currentUser=JSON.parse(localStorage?.getItem("currentUser"))
  }
	return output_object
}
export const AuthProvider = ({ children }) => {
	return <>{children}</>
}
