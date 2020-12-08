<hr/>

### Response Strapi

<hr/>

The context object - accessible through ctx.response, from controllers and policies.  
ctx contains a list of values and functions useful to manage server responses.

<br/>

First arg -> response body, second arg -> status code

```
ctx.send( { message: "The content was created!" }, 402 );
```

<br/>

can send 4xx - 5xx status code,  
error + message generate base on status code from koa api, unless its override

```
ctx.throw(405, "access_denied");

// Response Body
{
    "statusCode": 405,
    "error": "Method Not Allowed", // Koa message
    "message": "access_denied" // Override message
}
```

-> status 400

```
ctx.badRequest("custom message")
```
