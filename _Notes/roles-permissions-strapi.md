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

1. user click on connect with Provider on frontend app.
2. frontend redirect the tab to the backend URL: https://backend.com/connect/provider
3. backend create the authorization request to the provider, in query params define:

   - parameters that identify application
   - permissions that the user will be asked to grant
   - redirect_uri - Determines where the API server redirects the user after the user completes the authorization flow.  
     The value must exactly match one of the authorized redirect URIs for the OAuth 2.0 client (on google panel)

4. Redirect the user to Google's OAuth 2.0 server to initiate the authentication and authorization process.
5. backend waits for the response from Google's OAuth 2.0 server (authorization status return in query param)
   - Grant : https://oauth2.example.com/auth?code=4/P7q7W91a-oMsCeLvIaQm6bTrgtp7
   - Error : https://oauth2.example.com/auth?error=access_denied
6. authorization code, can exchange for an access token
   server send another request to google api with -> client_id (app), client_secret, code(from latest request),
   redirect_uri (to send response) - must to match uri define in google panel.
   google response with access token & refresh token
7. After backend obtains an access token, it can be used to make calls to a Google API on behalf of a given user account (email)
8. the backend asks google for the user's profile and a match is done on Github user's email and Strapi user's email
9. backend redirects the tab to the url of your choice (set in provider settings) with the param access_token (google)
   (example: http://website.com/connect/google/redirect?access_token=google access token)
   int the response body strapi token & user data sent

<hr/>

### **Workflow**

<hr/>

1. specify the absolute url of your backend in config / server.js  
    this url will given to the provider.
   some providers don't accept the use of localhost, in this case use proxy (DOC)
