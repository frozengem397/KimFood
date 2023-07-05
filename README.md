# KimFood

KimFood is a web application for sharing and discovering food menu. Users can create an account, upload their favorite recipes, and explore menus shared by others. This repository contains the source code for the KimFood application.

## Web Link

**_Due to the Azure account issue, I no longer pay for the monthly fee (over 100$), so the link might not be able to be open.(Can still open the page since it was deployed in Github pages, but the API wouldn't be working, so it will returns errors.)_**
### Web: https://frozengem397.github.io/KimFood/
### API: https://kimshopapi.azurewebsites.net/index.html (https://github.com/frozengem397/Food_Menu)
<img width="1715" alt="Screenshot 2023-06-15 at 1 07 34 PM" src="https://github.com/frozengem397/KimFood/assets/77391202/545e5f62-c466-4d03-a8dc-e4170313b0bf">


## Features

- User registration and authentication: Users can create an account, log in, and manage their profile. The application supports two roles: admin and normal users.
- Admin functionality:
  - View all orders: Admin users can see all the orders placed by users.
  - Add menu items: Admin users can add new menu items to the system.
  - Payment processing: All users can pay for the items in their cart using the supported payment methods.
  - Change the status of orders: Admin users can change the status of each order, Confirmed, Being Cooked, Ready, Completed
- Normal user functionality:
  - Add items to cart: Normal users can add menu items to their cart for ordering.
  - Cart management: Normal users can view and manage the items in their cart.
  - Payment processing: All users can pay for the items in their cart using the supported payment methods.
- Search functionality: Users can search for specific menu items or keywords to find relevant items.
- Category feature: Menu items are categorized into different categories, allowing users to browse and filter items based on categories.

## Technologies Used

- Front-end (Deploy to Github page):
  - HTML and CSS ![HTML5](https://img.icons8.com/color/24/000000/html-5.png) ![CSS3](https://img.icons8.com/color/24/000000/css3.png)
  - TypeScript![TypeScript](https://img.icons8.com/color/24/000000/typescript.png)
  - React.js ![React.js](https://img.icons8.com/plasticine/24/000000/react.png)
  - Redux ![Redux](https://img.icons8.com/color/24/000000/redux.png)
  - Bootstrap ![Bootstrap](https://img.icons8.com/color/24/000000/bootstrap.png)

- Back-end (Deploy to Azure):
  - ASP.NET (C#) ![ASP.NET](https://img.icons8.com/color/24/000000/asp.png)
  - Microsoft SQL Server (Upload to Azure SQL Database) ![SQL Server](https://img.icons8.com/color/24/000000/microsoft-sql-server.png)
  - JWT (JSON Web Tokens) ![JWT](https://img.icons8.com/color/24/000000/json-web-token.png)
## Future developement
- Currently the application only support one shop, in the future, I will implement the feature that allows multiple shop to register as admin and their customer will be able to send order to the specific shop. And the shop admin can only see the order to their shop.
- Allow the email or message notification when the status is changed.
- Optimize some pagination
## Contact
If you have any questions, issues, or suggestions, please feel free to create an issue in this repository or contact the project maintainer at your-email.
