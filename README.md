# DealHub

DealHub is a customer-to-customer e-commerce platform. It provides users with a feature-rich online marketplace where they can create accounts, list items for sale, purchase items, rate other users, engage in messaging, and enjoy various other functionalities.

![DealHub](https://res.cloudinary.com/dbwfcqbx8/image/upload/v1685268908/project-dealhub_bzkdxh.png)

## Usage

Clone this repo

```bash
git clone https://github.com/miljan-code/dealhub.git
```

Install necessary dependencies

```bash
npm install
# or
yarn
```

Add keys and secrets to .env file

```env
# AUTH

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_ID=
GITHUB_SECRET=

# DB - PlanetScale

DATABASE_URL='mysql://root:root@localhost:3500/dealhub'

# Cloudinary

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```

Run the development server

```bash
npm run dev
# or
yarn dev
```

## Demo

Try it out here

[https://dealhub.miljan.xyz/](https://dealhub.miljan.xyz/)
