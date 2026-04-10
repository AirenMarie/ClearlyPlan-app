# ClearlyPlan v1.0

## Overview

This app is a mobile-first tracking app which includes elements to help the user relieve stress and stay motivated.

## Description

We all need to plan our days, and that can be stressful. The purpose of ClearlyPlan is help you relax, focus, and stay motivated, using features like a quote card with relaxing images and inspirational quotes.

## Organization

Page | Description
Home | features the calendar, UI for setting tasks, and quote card
About | includes details about the app, my journey creating it, and planned future features

## Fulfilled Requirements

Requirement | Implementation
Analyze data that is stored in arrays, objects, sets or maps and display information about it in your app | Stored tasks and events in arrays of objects with the appropriate properties included
Visualize data in a user friendly way. (e.g. graph, chart, etc) | Visualized saved tasks using an interactive calendar, where tasks can be added upon clicking on a date, icon, or button; visualized priority levels using a color system
Persist important data to the user to local storage and make the stored data accessible in your app (including after reload/refresh) | Saved tasks and events to local storage to be accessed upon refresh or in new sessions; can use this for other settings as features are added in the future

## Features

The calendar allows you to set tasks, display them, and identify them based on priority level. You can set or edit a task by using the UI on the main page.

In the task form, you can set your tasks, give descriptions, choose a priority level (Low, Medium, or High), and set their date and time. The task is saved to localStorage, organized by date, and displays on the calendar as an expandable window.

The main page features a quote card which randomizes relaxing images and motivational quotes. This was created using APIs from Unsplash and API Ninjas.

ClearlyPlan is a mobile-first app, meaning it can adapt to multiple screen sizes.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript (ES Modules)
- **Backend:** Node.js, Express
- **APIs:** Unsplash (background images), API Ninjas (quotes)
- **Storage:** localStorage

---

## How to Run the App

### Prerequisites

- Node.js (v18 or higher recommended)
- npm
- a code editor, e.g Visual Studio Code

### Installation

1.  Clone the repository:
    a. install Git by downloading from https://git-scm.com/downloads.

    b. Clone the repository to access the project files and move to the project folder:

        ```bash
        git clone https://github.com/AirenMarie/ClearlyPlan-app
        cd clearlyplan
        ```

2.  Install necessary dependencies for the app:

    ```bash
    npm install
    ```

3.  Create a `.env` file in the root directory with your API keys:
    a. Obtain the necessary API Keys
    i. Unsplash - Register as a developer to open a new account - Navigate to the Developer Dashboard and click "New Application." - Agree to the API Guidelines and Terms before beginning. - Give a name and brief description for your application, then click "Create Application." - Upon creating your application, scroll to the "Keys" section, where you will find your Access Key (API key) and your Secret Key.
