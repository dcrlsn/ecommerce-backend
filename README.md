# eCommerce Backend

![](./assets/img/ecommerce.gif)

## Table of Contents
  
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
  
## Description
  
This app allows you to manage a sql database for products via an api
      
## Installation
  
Load the schema located in the ```/db/``` directory with ```source db/schema.sql``` while in the root directory of the program. You can also use the seeds sql if you need to seed the database with ```source db/seeds.sql```

After which run to install dependencies

```npm install```

If you need to seed the database you can run the command ```npm run seed```

## Usage
  
While in the root directory of the project run ```npm start``` and access the API via postman or insomnia, the routes are ```/api/products``` ```/api/categories``` and ```/api/tags```

Each route allows you to GET all from the table, GET by ID, POST new items, PUT to update, and DEL to delete.
      
## Questions

Find me on Github at https://github.com/dcrlsn/

Any Questions please contact me at
carlson.daniel.j@gmail.com