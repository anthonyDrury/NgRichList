# RichList

This is a minor project developed as a technical challenge. It allows you to view the top 50 richest celebrities as well as filtering options and minor styling.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.1.

## View

You can view this application (at the current time) live at `http://207.148.83.97:3004/`. This is running as a docker container on my server.

## Recommended Local Use

Simply clone this project to your local machine with whichever method you use.

Open a terming and navigate to the folder hosting the project.

In order to make sure you have the dependencies run `npm install @angular/cli && npm install`.

I have added a simple method to quickly view the application running on a basic node server. Run `npm run easy-run`.

Navigate to `http://localhost:3004/`. You will be able to see the application running in your browser.

## Docker

There is also a docker file if you instead wish to run it as a docker container.

Make sure you have docker installed, otherwise install it. This changes highly depending on OS so I will not cover this.

Run `docker build -t {imageName} .`

Run `docker run -p 3004:3004 {imageName}`

Now navigate to `http://localhost:3004/` and you will be able to see the application running!

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
