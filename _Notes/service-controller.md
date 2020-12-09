# Services & Controllers

https://www.coreycleary.me/what-is-the-difference-between-controllers-and-services-in-node-rest-apis

**controller** -> manager  
**service** -> worker

Manager's role:

- manages the incoming work requests
- decides which worker should do the work
- splits up the work into sizable units
- passes that work off
- if the work requires multiple people working on multiple things, orchestrates the work
- but does not do the work himself/herself

Worker role:

- receives the request from the manager
- figures out the individual details involved in completing the request
- is generally only concerned with the tasks he/she has to complete
- not responsible for making decisions about the "bigger" picture
- does the actual work necessary to complete the tasks/request
- returns the completed work to the manager

The overarching theme here is that the manager/controller receives the work,  
decides who should do it, then passes off the request to be completed.  
While the worker/service is the one that takes that request and actually completes it.

# Strapi Controllers

files which contain a set of methods called **Actions reached by the client according to the requested route.**  
It means that every time a client requests the route, the action performs the business logic coded and sends back the response.  
In most cases, the controllers will contain the bulk of a project's business logic.

## Extending a Model Controller

Here are the core methods (and their current implementation). You can simply copy and paste this code in your own controller file to customize the methods.
