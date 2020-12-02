# What Should I Know ?

- cron job & node-schedule  
  https://www.npmjs.com/package/node-schedule
- Serverless - what & why?
  - pipedream  
     https://docs.pipedream.com/
  - AWS Lambada  
    https://aws.amazon.com/lambda/-
- strapi - implement custom status code on strapi
- strapi - PostgreSQL - migration (from cmd ?) + install PostgreSQL client
- strapi - customize admin panel components  
   https://strapi.io/documentation/v3.x/guides/custom-admin.html#introduction  
   https://strapi.io/documentation/v3.x/admin-panel/customization.html#development-mode

## Cron Job & Node-Schedule & Strapi

<hr/>
### What is Cron Job ?

<hr/>

Cron is useful utility that can find be found in any Unix-like operating system.  
It is used to schedule commands at a specific time. These scheduled commands or tasks are known as "Cron Jobs".  
Cron is generally used for running scheduled backups, monitoring disk space, deleting files (for example log files)  
running system maintenance tasks and a lot more.

**CMD - command structure**

```
( \* min 0-59) ( \* hour 0-23 ) ( \* day 1-31 ) ( \* month 1-12 ) ( \* day of week 0-6 ) \<command-to-execute>
```

<hr/>

### Create a Cron Job on Strapi

<hr/>

- https://strapi.io/documentation/v3.x/concepts/configurations.html#cron-tasks
- https://strapi.io/documentation/v3.x/guides/scheduled-publication.html#introduction

Cron tasks allow you to schedule jobs (arbitrary functions) for execution at specific dates, with optional recurrence rules.  
**It only uses a single timer at any given time** (rather than reevaluating upcoming jobs every second/minute).  
This feature is powered by node-schedule node modules.  
Check it for more information -> https://www.npmjs.com/package/node-schedule

**Steps:**

1.  Make sure the enabled cron config is set to true in ./config/server.js file.

    ```
    cron: { enabled: true }
    ```

2.  To define a CRON job, add your logic to -> ./config/functions/cron.js

    ```
    module.exports = {
      '*/1 * * * *': () => {
        console.log('1 minute later');
      },
    };
    ```

    - If your CRON task is required to run based on a specific timezone then:  
      List of valid timezones: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List

              module.exports = {
                  '0 0 1 \* \* 1': {
                    task: () => { . . . },
                    options: {
                      tz: 'Asia/Dhaka',
                    },
                  },
              };
