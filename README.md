<h1 style='width:100%;text-align:center'>Uprodit Challenge</h1>

<p style='width:100%;text-align:center'> A simple tech assessment project</p>

<h2 style='width:100%;text-align:center'>Technologies Used</h2>

<div style='display:flex;flex-wrap:wrap;justify-content:center;width:100%;'>

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

<h2 style='width:100%;text-align:center'>Features</h2>

- [x] Simple search bar using REST API
- [ ] autocomplete (need better docs)
- [ ] filter (need better docs)

<h3 style='width:100%;text-align:center'>

[Demo](https://uprodit-challenge.vercel.app/)

</h3>

<h2 style='width:100%;text-align:center'>How To Use</h2>

- Clone this Repo
- Install Dependencies

  ```bash
  yarn
  # or
  npm install
  ```

- Add `env.local` file in the root folder:

  ```bash
  NEXT_PUBLIC_UPRODIT_APPID = "challenge_uprodit"
  NEXT_PUBLIC_UPRODIT_ENV = "production"
  NEXT_PUBLIC_UPRODIT_API = "api.uprodit.com"

  ```

- Run Development Server

  ```bash
  yarn dev
  # or
  npm run dev
  ```

<h2 style='width:100%;text-align:center'>Notes</h2>

The challenge is by [uprodit](https://doc.uprodit.com/docs/challenge/), a simple search engine that can be created in a couple of hours with very advanced features IF THE API AND DOCS WERE USABLE. the api needs to be remade and the docs aren't useful.
