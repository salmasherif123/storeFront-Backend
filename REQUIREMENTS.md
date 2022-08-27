# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index ():Promise<Product[]>
- Show (id:number):Promise<Product>
- Create (product: Product): Promise<Product> [token required] 
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (category: string): Promise<Product[]>

#### Users
- Index : Promise<User[]> [token required]
- Show (id: number): Promise<User>[token required]
- Create N (user: User): Promise<User>[token required]

#### Orders
- Current Order by user (id: number): Promise<Order & OrderedProduct> [token required]
- [OPTIONAL] Completed Orders by user (id: number): Promise<Order & OrderedProduct> [token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
## database schemas

### Product
  
  Products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR (30) UNIQUE NOT NULL,
    price INTEGER NOT NULL,
    category VARCHAR(20));
  
### User
  
  Users (
    user_id SERIAL PRIMARY KEY ,
     firstName VARCHAR(10) NOT NULL UNIQUE,
     lastName VARCHAR(10) NOT NULL,
     password VARCHAR NOT NULL UNIQUE,
     role VARCHAR
     );
  
### Order
  
  Orders (
    order_id SERIAL PRIMARY KEY ,
    user_id INTEGER REFERENCES Users(user_id) NOT NULL,
    status BOOLEAN NOT NULL DEFAULT TRUE
    );
  
### OrderdProduct
  
  Ordered_Products(
    ordered_product_id SERIAL PRIMARY KEY,
    quantity INTEGER NOT NULL DEFAULT 1,
    user_id INTEGER REFERENCES Users(user_id),
    product_id INTEGER REFERENCES Products(product_id) NOT NULL
);
