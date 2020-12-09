# Appointment Scheduler

**Note**

- dates on server side saved on ISO format
- displayed in local time in the client ( admin / other client)

<hr/>

### SQL Table

<hr/>

- **instructor** ( related to user )
- **client** ( related to user )
- **date** ( date type )
- **remainder** ( [ HALF_HOUR, ONE_HOUR, ONE_HOUR, TWO_HOURS ] )
- **remainderDate** ( date type ) ( auto set from model lifecycles) ( private )

<hr/>

### Add / Update an Appointment

<hr/>

add / update appointment from admin panel / api request  
will trigger beforeCreate / beforeUpdate lifecycles method of the appointment model.  
in the implementation of those methods the value of remainderDate will calculated  
based on the date and the remainder field with the use of date-fns (npm package).  
the seconds and milliseconds of the remainder date will set to 0

```
date: 2020-12-03T11:06:45.120Z
remainder: HALF_HOUR
```

store as ->

```
remainderDate: date: 2020-12-03T10:36:00.000Z
```

<hr/>

### Identify Remainders + Send Sms

<hr/>

cron job, run every minute, get current date, set seconds and milliseconds to 0.  
search in DB remainderDate that match current date.  
send the list of appointment who spouse to get remainder to service that take care of it.

<hr/>
 
 ### Improvements
 
<hr/>

**Model:**

- SET in the model with group / enumeration (possible ?)  
  list of -> reminder { key: "HALF_HOUR", title: "חצי שעה", value: 30 }
- simplified the appointment beforeCreate beforeUpdate implementation (no switch).

**Cron:**

- depend on data changes, instead of test every minute, test every 30 minute,  
  sort in array by reminder time, set next cron to next reminder time
