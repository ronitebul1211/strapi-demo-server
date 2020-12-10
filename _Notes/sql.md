http://www.techbrothersit.com  
https://www.techonthenet.com/sql_server/foreign_keys/foreign_delete.php

<hr/>

### ALTER Table

<hr/>

The ALTER TABLE command adds, deletes, or modifies columns in a table.  
The ALTER TABLE command also adds and deletes various constraints in a table.

```
ALTER TABLE Customers
ADD Email varchar(255);
```

</br>

<hr/>

### Primary Key

<hr/>

The PRIMARY KEY constraint uniquely identifies each record in a table, and ensure uniqueness of rows.  
**Primary keys must:**

- contain UNIQUE values
- cannot contain NULL values
- can consist of single or multiple columns

A table can have only **ONE primary key**

</br>

<hr/>

### Foreign Key

<hr/>

in a table is a column or group of columns that provides a link between data in two tables.  
**The Foreign Key in a table points to the primary key in another table.**

**Persons** ( Referenced / Parent table)

| PersonID | Name           | Age |
| -------- | :------------- | --- |
| 1        | Hansen Ola     | 30  |
| 2        | Svendson Tove  | 23  |
| 3        | Pettersen Kari | 20  |

</br>

**Orders** ( Child Table )

| OrderID | OrderNumber | PersonID |
| ------- | :---------- | -------- |
| 1       | 77895       | 3        |
| 2       | 44678       | 3        |
| 3       | 22456       | 2        |
| 4       | 24562       | 1        |

</br>

The table containing the foreign key is called the **child table**,  
and the table containing the candidate key is called the **referenced** or **parent table**.

</br>

- The "PersonID" column in the "Persons" table is the PRIMARY KEY in the "Persons" table.
- The "PersonID" column in the "Orders" table is a FOREIGN KEY in the "Orders" table.
- The FOREIGN KEY constraint is used to prevent actions that would destroy links between tables.
- The FOREIGN KEY constraint also prevents invalid data from being inserted into the foreign key column,  
  because it has to be one of the values contained in the table it points to.

```
CREATE TABLE Orders (
    OrderID int NOT NULL,
    OrderNumber int NOT NULL,
    PersonID int,
    PRIMARY KEY (OrderID),
    FOREIGN KEY (PersonID) REFERENCES Persons(PersonID)
);
```

</br>

<hr/>

### Cascade

<hr/>

A foreign key with cascade delete means that if a record in the parent table is deleted, then the corresponding records in the child table will automatically be deleted. This is called a cascade delete in SQL Server.

```
CREATE TABLE child_table
(
  column1 datatype [ NULL | NOT NULL ],
  column2 datatype [ NULL | NOT NULL ],
  ...

  CONSTRAINT fk_name
    FOREIGN KEY (child_col1, child_col2, ... child_col_n)
    REFERENCES parent_table (parent_col1, parent_col2, ... parent_col_n)
    ON DELETE CASCADE
    [ ON UPDATE { NO ACTION | CASCADE | SET NULL | SET DEFAULT } ]
);
```

- **child_col :**  
  The columns in child_table that will reference a primary key in the parent_table.
- **parent_table :**  
  The name of the parent table whose primary key will be used in the child_table.
- **parent_col :**  
  The columns that make up the primary key in the parent_table.
- **ON DELETE CASCADE :**  
  It specifies that the child data is deleted when the parent data is deleted.
- **ON UPDATE CASCADE (Optional) :**  
  It specifies what to do with the child data when the parent data is updated.
- **CASCADE Options (ON DELETE \ ON UPDATE):**
  - **NO ACTION :**  
     no action is performed with the child data when the parent data is deleted or updated.
  - **CASCADE :**
    It means that the child data is either deleted or updated when the parent data is deleted or updated.
  - **SET NULL :**  
    It means that the child data is set to NULL when the parent data is deleted or updated.
  - **SET DEFAULT :**  
     It means that the child data is set to their default values when the parent data is deleted or updated.

</br>

<hr/>

### Trigger

<hr/>

triggers are database objects, a special kind of stored procedure, which 'reacts' to certain database actions.

```
CREATE TRIGGER trigger_name
   {BEFORE | AFTER}
   { INSERT | DELETE | UPDATE }
   ON table_name
   [FOR [EACH] { ROW | STATEMENT }]
       EXECUTE PROCEDURE trigger_function
```

- **BEFORE \ AFTER :**  
  specify whether the trigger is invoked before or after an event
  - BEFORE : it can skip the operation for the current row or even change the row being updated or inserted.
  - AFTER : all changes are available to the trigger.

</br>

Triggers are useful to keep the cross-functionality within the database  
that runs automatically whenever the data of the table is modified.  
For example, if you want to keep the history of data without requiring the application  
to have logic to check for every event such as INSERT or UDPATE.

</br>

Triggers are useful to maintain complex data integrity rules  
which cannot implemented elsewhere except at the database level.  
For example, when a new row is added into the customer table,  
other rows must be also created in tables of banks and credits.

</br>

**The main drawback of using a trigger is that you must know the trigger exists and understand its logic to figure it out the effects when data changes**

</br>

<hr/>

### Duplicate

https://blog.theodo.com/2018/01/search-destroy-duplicate-rows-postgresql/

Duplicate row is a row in a table **looking exactly or almost exactly** like some another row in this table.  
So, what can you do with the duplicates?

- For absolutely identical rows: **FIND + DELETE**
- For almost identical rows (identical except for one or more properties):
  - Combine information from duplicate rows into one row
  - Select one of the rows according to some criteria and delete the remaining ones.

<hr/>

<hr/>

### Sub Query

<hr/>
