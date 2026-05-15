# Ecommerce

This project is an ecommerce frontend prototype built with Laravel, Inertia, React, TypeScript, and Vite. It includes a public storefront interface and Laravel authentication pages.

The main public pages are the home page, the products page, and the details page. The home page contains a hero slider, featured product sections, category blocks, and trend links. The products page shows a catalog layout with filters, sorting, product cards, and pagination. The details page shows a single product view with gallery images, condition labels, reviews, pricing, and product information. The project also includes dashboard and profile pages for authenticated users through Laravel Breeze.

The application uses Laravel 12 on PHP 8.2 and uses SQLite as the default database in the current setup. The frontend is rendered with Inertia and React, and the assets are built with Vite.

The main routes currently available are `/`, `/products`, `/details`, `/dashboard`, and `/profile`.

To run the project locally, install the PHP and Node dependencies, create the environment file, generate the application key, run migrations, and start the development services.

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
npm run build
composer run dev
```

The `composer run dev` command starts the Laravel server, the queue worker, the log watcher, and the Vite development server.

This project also includes Docker support. The repository contains a `Dockerfile`, a `docker-compose.yml`, and a `.dockerignore` file. The Docker setup builds backend dependencies with Composer, builds frontend assets with Node, and serves the application with Apache on PHP 8.2.

To run the project with Docker, use:

```bash
docker compose up --build
```

When started with Docker, the application is available at `http://localhost:8080`. The SQLite database file is stored in `database/database.sqlite`, and the `database` and `storage` folders are mounted so data persists across container restarts.

At the moment, several pages use placeholder product content and static sample data. The current version is focused on UI structure and frontend presentation rather than a full backend commerce workflow.
