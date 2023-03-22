## API Reference Documentation
1. [Form](#Form)
2. [User](#User)
3. [Workflow](#Workflow)

---

### Form

1. Get all forms (returns a list of forms)

``[GET] /api/v1/form``

2. Get form by id (returns one form)

``[GET] /api/v1/form/{id}``

3. Get form by assignedTo (returns a list of forms)

``[GET] /api/v1/form/user/{id}``

4. Create form (returns one form)

``[POST] /api/v1/form/create``
```
[Example Request Body, MUST STRICTLY FOLLOW THIS FORMAT]
{ 
    name: "test-form",
    assignedTo: "user-id",
    assignedBy: "admin-id",
    formType: "one of the type",
    email: "jeremy@kewlies.com"
    formStatus: "INITIAL_DRAFT", (it has to be these values or error: INITIAL_DRAFT, SUBMITTED, APPROVED, REJECTED)
    fields: {
            ... (any json)
        },
    submissionDate: null,
    notes: "salted sauteen spoons"
}
```

5. Update form by id (returns one form) (WHENEVER U NEED TO UPDATE ANY FIELD JUST USE THIS METHOD)

``[PUT] /api/v1/form/update``
```
[Example Request Body]
{ 
    name: "test-form",
    assignedTo: "user-id",
    assignedBy: "admin-id",
    formType: "one of the type",
    email: "jeremy@kewlies.com"
    formStatus: "INITIAL_DRAFT", (it has to be these values or error: INITIAL_DRAFT, SUBMITTED, APPROVED, REJECTED)
    fields: {
            ... (any json)
        },
    submissionDate: null,
    notes: "salted sauteen spoons",
    created_at: "2022-10-20"    
}
```

6. Delete form by id

``[DELETE] /api/v1/form/delete/{id}``

7. Get forms based on workflowStatus (returns a list of forms)

``[GET] /api/v1/form/formStatus/{formStatus}``

---

### User 

1. Get all users and vendors

``[GET] /api/v1/users``

``[GET] /api/v1/users/vendors``

2. Get all users based on user type
- User Types `userType` include: `ADMIN`, `APPROVER`

**NOTE:** this is only to get admin and approver

``[GET] /api/v1/users/{userType}``

3. Get all vendors from 1 company

``[GET] /api/v1/users/vendors/{companyName}``

4. Get 1 user based on unique user id
- Regardless of the user type  

``[GET] /api/v1/users/{id}``

``[GET] /api/v1/users/vendors/{id}``

5. Create a user and vendor

``[POST] /api/v1/users/create``

```
[Example post request body for ADMIN/APPROVER]
{
    id: "admin1",
    name: "Harry Styles",
    email: "harrystyles@quantum.com",
    password: "watermelonsugar",
    userType: "ADMIN",
}
```
``[POST] /api/v1/users/vendors/create``

```
[Example post request body for VENDOR]
{
    "id":"vendor1",
    "name": "Harry Styles",
    "email": "harrystyles@lovetour.com",
    "password": "watermelonsugar",
    "userType": "VENDOR",
    "companyName": "Love",
    "regNumber": "4567",
    "bizNature": "Love",
    "contactNum": "91234567",
    "gstnumber": "GST456"
}
```
6. Delete user and vendor by id

``[DELETE] /api/v1/users/delete/{id}``

``[DELETE] /api/v1/users/vendors/delete/{id}``

7. Update user and vendor

``[PUT] /api/v1/users/update``

```
[Example post request body for ADMIN/APPROVER]
{
    id: "admin1",
    name: "Harry Styles",
    email: "harrystyles@quantum.com",
    password: "treatpeoplewithkindness",
    userType: "ADMIN",
    createdAt: "2023-03-21T11:09:36.533"
}
```

``[PUT] /api/v1/users/vendors/update``

```
[Example post request body for VENDOR]

{
    "id":"vendor1",
    "name": "Harry Styles",
    "email": "harrystyles@lovetour.com",
    "password": "watermelonsugar",
    "userType": "VENDOR",
    "companyName": "Love",
    "regNumber": "4567",
    "bizNature": "Love",
    "contactNum": "91234567",
    "gstnumber": "GST456"
}

```


---

### Workflow

---