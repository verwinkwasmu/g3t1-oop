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

---

### Workflow

---
