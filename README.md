# e-commerce


# USER 

## Register Customer

Register a customer

**URL** : `/register`

**Method** : `POST`

**Auth Required** : NO

**Request Body**
```json
    {
      "name": "Kamado Tanjiro",
      "email": "tanjiro@mail.com",
      "password": "nezukopoi",
    }
```

**Success Status Code** : 201

**Success Response**
```json
  {
    "_id": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    "name": "Kamado Tanjiro",
    "email": "tanjiro@mail.com",
    "password": "lkajfslj21324kjsdkjashflkasd" (hashed)  
  }
```

## Login

Login as admin or customer, same route

**URL** : `/login`

**Method** : `POST`

**Auth Required** : NO

**Request Body**
```json
    {
      "email": "tanjiro@mail.com",
      "password": "nezukopoi",
    }
```

**Success Status Code** : 200

**Success Response**
```json
  {
    "token":   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    "_id": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    "name": "Kamado Tanjiro",
    "email": "tanjiro@mail.com",
    "role": "customer"
  }
```
#
# PRODUCT

## Get All Products

Get All Products

**URL** : `/products`

**Method** : `GET`

**Auth Required** : NO

**Success Status Code** : 200

**Success Response**
```json
  {
    [
      {
        "_id":"asdjhfuakjsdkjjsandfvjjasdnll",
        "name":"Gundam Barbatos",
        "description": "Gundam Saikyo",
        "category": "HG",
        "price": 100000,
        "stock": 5,
        "image": "blablabla.com/hahaha.img",
        "slug": "gundam-barbatos"
      },
      {
        "_id":"akahdkf234khk5j4kj235jkgjksadl",
        "name":"Gundam Barbatos 2",
        "description": "Gundam Saikyo 2",
        "category": "HG",
        "price": 150000,
        "stock": 10,
        "image": "blablabla.com/hahaha2.img",
        "slug": "gundam-barbatos2"
      },
    ]  
  }
```
## Get Product

Get One Specific Product Based On Slug

**URL** : `/products/:slug`

**Method** : `GET`

**Auth Required** : NO

**Success Status Code** : 200

**Success Response**
```json
  {
    "_id":"asdjhfuakjsdkjjsandfvjjasdnll",
    "name":"Gundam Barbatos",
    "description": "Gundam Saikyo",
    "category": "HG",
    "price": 100000,
    "stock": 5,
    "image": "blablabla.com/hahaha.img"
  }
```

## Post Product

Create a new product

**URL** : `/products`

**Method** : `POST`

**Auth Required** : YES (Admin Only)

**Request Body**
```json
    {
      "name": "Gundam Barbatos",
      "description": "Barbatos Saikyo",
      "category": "HG",
      "price": 150000,
      "stock": 5,
      "image": "hahaha.com/barbatos.jpg"
    }
```

**Success Status Code** : 201

**Success Response**
```json
  {
    "_id":"asdjhfuakjsdkjjsandfvjjasdnll",
    "name":"Gundam Barbatos",
    "description": "Gundam Saikyo",
    "category": "HG",
    "price": 150000,
    "stock": 5,
    "image": "blablabla.com/hahaha.img"
  }
```

## Patch Product

Edit a spesific product based on product id

**URL** : `/products/:id`

**Method** : `PATCH`

**Auth Required** : YES (Admin Only)

**Request Body**
```json
    {
      "price": 200000,
      "stock": 1,
    }
```

**Success Status Code** : 200

**Success Response**
```json
  {
    "_id":"asdjhfuakjsdkjjsandfvjjasdnll",
    "name":"Gundam Barbatos",
    "description": "Gundam Saikyo",
    "category": "HG",
    "price": 200000,
    "stock": 1,
    "image": "blablabla.com/hahaha.img"
  }
```

## Delete Product

Delete a spesific product based on product id

**URL** : `/products/:id`

**Method** : `DELETE`

**Auth Required** : YES (Admin Only)

**Success Status Code** : 200

**Success Response**
```json
  {
     "n": 1, 
     "ok": 1, 
     "deletedCount": 1 
  }
```

#

# CART

## Get All Cart

Get all user (customer) owned cart items

**URL** : `/carts`

**Method** : `GET`

**Auth Required** : YES (Customer Only)

**Success Status Code** : 200

**Success Response**
```json
  {
     [
       {
         "_id": "dh234g271324fgh712364",
         "productId": "1235hsdjh776232gghgds",
         "qty": 5,
         "userId": "213yuggwe564f123hgdsduywe" 
       },
       {
         "_id": "dh234g271324fgasjfashd4",
         "productId": "2134jhhsdjh776232gghgds",
         "qty": 1,
         "userId": "yugqwet164f123hgdsduywe" 
       }
     ]
  }
```

## Post Cart

Create a new Cart Item

**URL** : `/carts`

**Method** : `POST`

**Auth Required** : YES (Customer Only)

**Request Body**
```json
    {
      "productId": "2134jhhsdjh776232gghgds",
      "qty": 1,
      "userId": "yugqwet164f123hgdsduywe" 
    }
```

**Success Status Code** : 201

**Success Response**
```json
  {
    "_id":"asdjhfuakjsdkjjsandfvjjasdnll",
    "productId": "2134jhhsdjh776232gghgds",
    "qty": 1,
    "userId": "yugqwet164f123hgdsduywe" 
  }
```

## Delete Cart

Delete a spesific cart item based on cart id

**URL** : `/carts/:id`

**Method** : `DELETE`

**Auth Required** : YES (Customer Only)

**Success Status Code** : 201

**Success Response**
```json
  {
    "n": 1, 
    "ok": 1, 
    "deletedCount": 1 
  }
```

#

# TRANSACTION

## Get All Transactions (Admin)

Get all transactions using admin-role account

**URL** : `/transactions`

**Method** : `GET`

**Auth Required** : YES (Admin Only)

**Success Status Code** : 200

**Success Response**
```json
  {
    [  
      {
        "_id":"2132kj48713412hsjhd",
        "items": ["Object"],
        "totalPrice": 1500000,
        "delivLocation": "Hacktiv8 Indonesia",
        "phoneNumber": "08123456789",
        "userId": "3743jgj7sad7fas7643234",
        "status": "waiting"
      },
      {
        "_id":"kfdkjhsj48713412hsjhd",
        "items": ["Object"],
        "totalPrice": 200000,
        "delivLocation": "Kosan Pondok Indah",
        "phoneNumber": "0876543210",
        "userId": "dsjfhsdj67643234",
        "status": "verified"
      }
    ]
  }
```

## Get All Transactions (Customer)

Get all transactions using customer-role account

**URL** : `/transactions`

**Method** : `GET`

**Auth Required** : YES (Customer Only)

**Success Status Code** : 200

**Success Response**
```json
  {
    [  
      {
        "_id":"2fassaj48713412hsjhd",
        "items": ["Object"],
        "totalPrice": 1500000,
        "delivLocation": "Hacktiv8 Indonesia",
        "phoneNumber": "08123456789",
        "userId": "3743jgj7sad7fas7643234",
        "status": "waiting"
      },
      {
        "_id":"2132kj48713412hsjhd",
        "items": ["Object"],
        "totalPrice": 2500000,
        "delivLocation": "Hacktiv8 Indonesia",
        "phoneNumber": "08123456789",
        "userId": "3743jgj7sad7fas7643234",
        "status": "closed"
      },
    ]
  }
```

## Post Transaction

Create a new Transaction

**URL** : `/transactions`

**Method** : `POST`

**Auth Required** : YES (Customer Only)

**Request Body**
```json
    {
      "items": ["Object"],
      "totalPrice": 1500000,
      "delivLocation": "Hacktiv8 Indonesia",
      "phoneNumber": "08123456789"
    }
```

**Success Status Code** : 201

**Success Response**
```json
  {
    "_id":"asdjhfuakjsdkjjsandfvjjasdnll",
    "items": ["Object"],
    "totalPrice": 1500000,
    "delivLocation": "Hacktiv8 Indonesia",
    "phoneNumber": "08123456789",
    "userId": "3743jgj7sad7fas7643234",
    "status": "waiting"
  }
```

## Patch Transaction (Customer)

Patch or edit a spesific transaction based on transaction id

**URL** : `/transactions/:id`

**Method** : `PATCH`

**Auth Required** : YES (Customer Only)

**Success Status Code** : 200

**Success Response**
```json
  {
    "_id":"asdjhfuakjsdkjjsandfvjjasdnll",
    "items": ["Object"],
    "totalPrice": 1500000,
    "delivLocation": "Hacktiv8 Indonesia",
    "phoneNumber": "08123456789",
    "userId": "3743jgj7sad7fas7643234",
    "status": "verify"
  }
```

## Patch Transaction (Admin)

Patch or edit a spesific transaction based on transaction id

**URL** : `/transactions/:id/admin`

**Method** : `PATCH`

**Auth Required** : YES (Admin Only)

**Success Status Code** : 200

**Success Response**
```json
  {
    "_id":"asdjhfuakjsdkjjsandfvjjasdnll",
    "items": ["Object"],
    "totalPrice": 1500000,
    "delivLocation": "Hacktiv8 Indonesia",
    "phoneNumber": "08123456789",
    "userId": "3743jgj7sad7fas7643234",
    "status": "verified"
  }
```