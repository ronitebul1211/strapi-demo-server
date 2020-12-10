<hr/>

### **Roles & Permissions Plugin**

<hr/>

This plugin provides a way to protect your API with a full authentication process based on JWT.  
This plugin comes also with an ACL strategy.  
ACL - Access Control List (ACL) to help give you finer control over permissions on your website

<br/>

#### **How it's Work?**

plugin adds an access layer on your application.  
it uses jwt token to authenticate users.

1. Each time an API request is sent
2. server checks if an Authorization header is present
3. JWT contains user ID,
4. server search for the permissions group user is in
5. server determine if user allow access to the route

<br/>

<hr/>

### **Authentication**

<hr/>

#### **Token usage**

The token variable received when logging in or registering data.jwt (response).  
To make an API request as a user, place the jwt token into an Authorization header of the request.  
A request without a token, will assume the public role permissions by default.

<br/>

<hr/>

### **Providers**

<hr/>

#### **Understanding the login flow**

- strapi's backend is located at: strapi.website.com.
- app frontend is located at: website.com.

1. user goes on frontend app and click on connect with Provider.
2. frontend redirect the tab to the backend URL: https://backend.com/connect/provider
3. backend redirects the tab to the provider login page
4. user logs in.
5. Provider redirects the tab to the backend URL:  
   https://strapi.website.com/connect/provider/callback?code=abcdef.
   Why?
   Because this url defined in the provider as authorized uri,
   that the users will be redirected to this path after they have authenticated with Google.
   The path will be appended with the authorization code for access.

6. backend uses the given code to get from Github an access_token.
7. it used to make authorized requests to Github to get the user info.
8. backend redirects the tab to the url of your choice with the param access_token  
   (example: http://website.com/connect/github/redirect?access_token=eyfvg)
9. The frontend (http://website.com/connect/github/redirect)
   calls the backend with https://strapi.website.com/auth/github/callback?access_token=eyfvg
10. backend returns the strapi user profile with its jwt.

**Under the hood**  
the backend asks Github for the user's profile and a match is done on Github user's email and Strapi user's email
The frontend now possesses the user's jwt, with means the user is connected and the frontend can make authenticated requests to the backend!

1. user click on Login with Google
2. frontend make an request to the backend to tell it user want login in with google provider

<hr/>

### **Workflow**

<hr/>

1. specify the absolute url of your backend in config / server.js  
    this url will given to the provider.
   some providers don't accept the use of localhost, in this case use proxy (DOC)
