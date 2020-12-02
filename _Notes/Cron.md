## Cron Job & Node-Schedule & Strapi

<hr/>

### **_What is Cron Job ?_**

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

### **Node-Schedule**

<hr/>
Node Schedule is a flexible cron-like and not-cron-like job scheduler for Node.js.     
  
It allows you to schedule jobs (functions) for execution at specific dates, with optional recurrence rules.     
**It only uses a single timer at any given time (rather than reevaluating upcoming jobs every second/minute).**  
- its time-based scheduling, not interval-based scheduling.
- it has has Windows support unlike true cron 
- it is designed for **in-process scheduling**, i.e. scheduled jobs will only fire as long as your script is running,   
and the schedule will disappear when execution completes.   
If you need to schedule jobs that will persist even when your script isn't running, consider using actual cron.
- Job objects are EventEmitter's, and emit a:
  - **run event** after each execution
  - **scheduled event** each time they're scheduled to run
  - **canceled event** when an invocation is canceled before it's executed

<hr/>

### **_Create a Cron Job on Strapi_**

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

    - (SECOND (optional)) (MINUTE) (HOUR) (DAY OF MONTH) (MONTH OF YEAR) (DAY OF WEEK)
    - If your CRON task is required to run based on a specific timezone then:  
      List of valid timezones: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List

              module.exports = {
                  '0 0 1 * * 1': {
                    task: () => { . . . },
                    options: {
                      tz: 'Asia/Dhaka',
                    },
                  },
              };

    - use \*/5 to define interval -> Execute a cron job every 5 Minutes = _/5 _ \* \* \*
