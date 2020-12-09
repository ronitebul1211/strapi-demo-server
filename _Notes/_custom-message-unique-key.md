<hr/>

### Notification Error admin Panel

<hr/>

1. **EditViewDataMangerProvider** - submit handler get called
2. **EditViewDataMangerProvider** - inside try block request to POST / PUT data
3. **ContentManagerController** - create / update function invoked ...
4. **ContentManagerController** - inside try block content manager create / update service invoked
5. **ContentManagerController** - inside catch block strapi log message to console, catch the error,  
   wrap error message in response body and send it inside 400 response

   ```
   catch (error) {
         strapi.log.error(error);
         ctx.badRequest(null, [
           {
             messages: [{ id: error.message, message: error.message, field: error.field }],
             errors: _.get(error, 'data.errors'),
           },
         ]);
       }
   ```

6. **EditViewDataMangerProvider** - inside catch notification toggle invoke  
   **EditViewDataMangerProvider** - with message id ...error.record.fetch
7. **EditViewDataMangerProvider** - notification display

**SOLUTION** :

1. send postgreSQL error ('23505') message from controller,
2. test in EditViewDataMangerProvider for error ('23505')
   - true - handle notification message
   - false - default handle notification
3. create message in english / hebrew for each unique key, and generate message id base on key.

<hr/>

### Response Message

<hr/>

create an middleware that catch and test for error '23505' and generate customize message.  
**CHECK** :  
how can i use strapi message by its id ?
