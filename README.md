# NgRx Store App

This project is a small Angular application built to demonstrate the use of NgRx Store and NgRx Effects in a real shopping flow.

It includes:

- user authentication flow
- protected routes
- product listing
- cart management
- user profile page
- local storage persistence for the session and cart
- state management driven by actions, reducers, selectors, and effects

## Tech stack

- Angular 22
- Standalone components
- NgRx Store
- NgRx Effects
- RxJS
- Tailwind CSS
- FakeStore API

## App flow

The app is structured around a typical NgRx pattern:

1. The component dispatches an action.
2. A side effect listens to that action and performs an async task.
3. The reducer updates the state.
4. Components read the state via selectors and update the UI.

This is used for:

- authentication
- products loading
- profile loading
- cart updates

## Authentication

The app uses a FakeStore authentication flow. The login form sends credentials to the FakeStore API endpoint:

```text
https://fakestoreapi.com/auth/login
```

The backend validates the credentials and returns a JWT-like token when the user is valid.

### Example valid user

The FakeStore users list includes users such as:

- username: `mor_2314`
- password: `83r5^_`

This is a valid example that works with the project’s demo login flow.

You can also check the documented user list at:

- https://fakestoreapi.com/docs#tag/Users/operation/getAllUsers

Use one of the existing users from that endpoint, then enter the matching password.

> The app is designed as a demo. It does not implement a real backend auth system. It relies on the FakeStore API behavior for login simulation.

## Registration

The registration page is only demonstrative.

The project includes a register form, but FakeStore does not support real user creation in the same way a production backend would. In practice, this endpoint is only used as a front-end demo and does not persist users reliably.

So, the register flow is meant to demonstrate the UI and NgRx state handling, not to create real accounts on the API.

## Protected routes

Some routes are protected by an auth guard:

- products
- profile
- cart

If there is no token in the auth state, the app redirects the user back to the login page.

## Features

### Products

The products page loads the catalog from FakeStore and displays the available items.

### Cart

The cart stores selected products and keeps the state synchronized in local storage.

### Profile

Once a valid token is obtained, the app reads the user ID from the JWT payload and loads the matching profile information.

### Header and layout

The main layout provides navigation and user session state. It also shows the current cart summary and logout controls.

## Running the app

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm start
```

Then open the app in the browser:

```text
http://localhost:4200/
```

## Building the app

```bash
npm run build
```

## Running tests

This project uses Vitest for unit testing.

```bash
npx vitest run
```

## Notes

This project is meant as a learning and demo app for NgRx patterns in Angular, not as a production-ready authentication system.

The login is functional with the FakeStore API, while register is intentionally non-persistent and should be treated as a front-end demo only.

## Useful references

- Angular: https://angular.dev/
- NgRx Store: https://ngrx.io/guide/store
- NgRx Effects: https://ngrx.io/guide/effects
- FakeStore API: https://fakestoreapi.com/
