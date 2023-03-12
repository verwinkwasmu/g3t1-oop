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
[Example Request Body]
{ 
    name: "test-form",
    assignedTo: "user-id",
    assignedBy: "admin-id",
    formType: "one of the type",
    approvalStatus: "INITIAL_DRAFT",
    fields: {
            ...
        }
}
```

5. Update form by id (returns one form)

``[PUT] /api/v1/form/update``
```
[Example Request Body]
{ 
    id: "form-id",
    name: "test-form",
    assignedTo: "user-id",
    assignedBy: "admin-id",
    formType: "one of the type",
    approvalStatus: "INITIAL_DRAFT",
    fields: {
            ...
        },
    created_at: "2022-10-20"    
}
```

6. Delete form by id

``[DELETE] /api/v1/form/delete/{id}``

7. Get forms based on workflowStatus (returns a list of forms)

``[GET] /api/v1/form/workflowStatus/{workflowStatus}``

---

### User 

---

### Workflow

---