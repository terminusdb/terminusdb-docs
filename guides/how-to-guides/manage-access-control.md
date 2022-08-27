---
description: Managing access control with the TerminusDB local dashboard
---

# Manage Access Control

This article is a beginner's guide to managing organizations/teams and users with the TerminusDB dashboard.

In this article, we’ll do the following:

* Install the local TerminusDB dashboard&#x20;
* Provide an overview of the default admin login and screens&#x20;
* Go through the administration and access control mechanisms to create new roles, users, and teams and connect them to data products.

### Install the Dashboard

[Install and run TerminusDB as a Docker container](../../get-started/install/install-as-docker-container.md), also referred to as TerminusDB bootstrap.

When installed, TerminusDB creates by default, an **admin user** and **admin team**. The admin user has the privileges to manage data products, and create teams and users. The admin default password is **root**.

Go to [**http://localhost:6363/dashboard**](http://localhost:6363/dashboard) **and start to build your teams, users, and data products.**

**Admin Password Change**

{% hint style="danger" %}
If you change the admin user password, the dashboard will display this error: _"Incorrect authentication information, please enter your username and password again"_
{% endhint %}

<figure><img src="../../.gitbook/assets/01-terminusdb-access-control-admin-password.png" alt=""><figcaption></figcaption></figure>

Simply log **** in again with the new password to continue working.

1. Select the "Login to TerminusDB" button&#x20;
2. A pop-up window will appear&#x20;
3. Fill the form with the user (admin) and new password, you can omit the organization field&#x20;
4. Press "Connect with the User"&#x20;
5. You'll be redirected to the home page

### **Dashboard Home Page**

On the home page, you'll find a list of teams (referred to as Organizations in the TerminusDB System Database)

Select an existing team or create a new one. If no team is created or selected, some of the dashboard functionalities are disabled.

The "Create a new Team" button is enabled only for the admin user.

Admin can create a new personal team where they are the admin and can also create additional Teams and Users and configure user roles using the administrator interface.

<figure><img src="../../.gitbook/assets/02-terminusdb-access-control-admin-change-password.png" alt=""><figcaption></figcaption></figure>

### **Creating a new team for the admin user**

1. Click the button Create a new Team&#x20;
2. The Create new team window will pop **** up&#x20;
3. Insert the team name in the input field (the team name must be unique)&#x20;
4. Click Create Team button&#x20;
5. You will be redirected to the Team home page

<figure><img src="../../.gitbook/assets/03-terminusdb-access-control-admin-home.png" alt=""><figcaption></figcaption></figure>

#### **Team Home Page**

The top bar from right to left displays:

* The user role&#x20;
* The user name&#x20;
* The team name

#### **Create a New Data Product**

* Select the 'New Data Product' button&#x20;
* Enter the Data Product ID and name&#x20;
* Click Create Data Product button

<figure><img src="../../.gitbook/assets/06-terminusdb-access-control-new-dataproduct (1).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../.gitbook/assets/07-terminusdb-access-control-new-dataproduct.png" alt=""><figcaption></figcaption></figure>

## **Administration and Access Control**

The administrator interface provides a visual console to easily administer TerminusDB teams and data products. In order to create roles, users, and teams, you need to be logged in as the admin.&#x20;

Access the User Management section from the top bar.

<figure><img src="../../.gitbook/assets/08-terminusdb-access-control-user-management.png" alt=""><figcaption></figcaption></figure>

[Full documentation and all the definitions can be found here](https://github.com/terminusdb/terminusdb-access-control)

<figure><img src="../../.gitbook/assets/09-terminusdb-access-control-user-diagram.png" alt=""><figcaption><p>This diagram illustrates the roles we'll create in this how-to guide.</p></figcaption></figure>

### Create a new Role

We are going to create four different roles: _appAdmin_, _reader_, _writer,_ and _schema\_writer_.

* Navigate to the User Management section
* Select the Roles tab&#x20;
* Select create a new Role and a pop-up window will appear&#x20;
* Insert the role name and select the role permissions
* Click 'Create Role' button and a new role will be created

<figure><img src="../../.gitbook/assets/10-terminusdb-access-control-user-role-selection.png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../.gitbook/assets/11-terminusdb-access-control-user-roles.png" alt=""><figcaption></figcaption></figure>

### Create New Users

We are going to create three new Users:&#x20;

User\_01, User\_02, and User\_03 , all with the default password "NO\_KEY"

* Select the Users tab
* Select Create New User and a pop-up window will appear&#x20;
* Insert the user name and NO\_KEY as the password
* Click Create User Button and a new User will be created

Repeat these steps for the three users.

<figure><img src="../../.gitbook/assets/12-terminusdb-access-control-new-user.png" alt=""><figcaption></figcaption></figure>

The new users are currently unrelated to any teams.

<figure><img src="../../.gitbook/assets/13-terminusdb-access-control-users-teams.png" alt=""><figcaption></figcaption></figure>

Next, we’ll get your teams up and running.

### Create a New Team

We are going to create three new teams: _team\_01_, _team\_02_, and _team\_03_

* Select the Teams' tab&#x20;
* Select ‘Create New Team’ and a pop-up window will appear&#x20;
* Insert the team name&#x20;
* Click the ‘Create Team’ button and a new Team will be created
* Repeat these steps for the other two teams.&#x20;

<figure><img src="../../.gitbook/assets/14-terminusdb-access-control-new-team.png" alt=""><figcaption></figcaption></figure>

The new teams are not currently linked with any users.

<figure><img src="../../.gitbook/assets/15-terminusdb-access-control-users-teams.png" alt=""><figcaption></figcaption></figure>

### Add Users to Team\_01&#x20;

We are going to add users to team\_01, assigning them roles:

* Choose the Teams tab
* In the team\_01 row, Select the "Show Team Users" icon&#x20;
* Select add Users to team\_01 Team&#x20;
* From the drop-down list, select User\_01 and check the appAdmin role
* Click 'Create User Button' and a new User will be created

<figure><img src="../../.gitbook/assets/16-terminusdb-access-control-users-assign-roles.png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../.gitbook/assets/17-terminusdb-access-control-users-assign-roles.png" alt=""><figcaption></figcaption></figure>

Repeat the same steps for the other users:&#x20;

User\_01 -> role -> reader&#x20;

User\_02 -> role -> reader /writer

Then do the following:

* Connect team\_03 with User\_01 with a role as appAdmin&#x20;
* Connect team\_02 with User\_02 with a role as appAdmin

### Log in with the User\_01

Now we are going to log in with User\_01:

* From the top bar, select **Change User**&#x20;
* A pop-up window will appear&#x20;
* Add the user name and password - User\_01 and NO\_KEY&#x20;
* Press the "Connect with the User" button

<figure><img src="../../.gitbook/assets/17-terminusdb-access-control-change-user.png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../.gitbook/assets/17-terminusdb-access-control-user-login.png" alt=""><figcaption></figcaption></figure>

#### User\_01 teams Homepage

When you first sign in, you will see a list of the teams associated with this user, select team\_01.

<figure><img src="../../.gitbook/assets/18-terminusdb-access-control-user1-home.png" alt=""><figcaption></figcaption></figure>

There are no data products associated with the team, so first we’ll create two new data products.

* Press the "New Data Product" button and name it dataproduct\_01&#x20;
* Repeat the process and name this one dataproduct\_02

On the top bar, you will see from right to left:

* the user team role/s "appAdmin",&#x20;
* the user name, User\_01&#x20;
* the selected team name team\_01

<figure><img src="../../.gitbook/assets/19-terminusdb-access-control-user-roles-bar.png" alt=""><figcaption></figcaption></figure>

User\_01 has the access privileges to create new data products and manage them.

#### Create a Schema

* Select the "Data Product Model" icon from the icons menu on the left
* Select "JsonView" on the Data Product Model page and copy the following schema&#x20;
* Select the save icon

```json
[
    {
        "@base": "terminusdb:///data/",
        "@schema": "terminusdb:///schema#",
        "@type": "@context"
    },
    {
        "@id": "Person",
        "@key": {
            "@fields": [
                "name"
            ],
            "@type": "Lexical"
        },
        "@type": "Class",
        "name": "xsd:string"
    }
]
```

<figure><img src="../../.gitbook/assets/20-terminusdb-access-control-schema.png" alt=""><figcaption></figcaption></figure>

User\_01 has ‘appAdmin’ privileges, so if navigating around the dashboard you can see that they can perform all the actions. For example, select the "document explorer" button on the left and insert a new Person Document.

<figure><img src="../../.gitbook/assets/21-terminusdb-access-control-new-doc.png" alt=""><figcaption></figcaption></figure>

### Connect with User\_02

* Select change user for the upper user menu&#x20;
* Insert the credentials - User\_02, password NO\_KEY and team\_01 (in the team field)&#x20;
* You'll arrive on the team\_01 main page&#x20;
* From the left menu, Select dataproduct\_01

On the top bar from right to left you can see the user role "**reader**", the user name **User\_02**, and the team name team\_01

The user does not have permission to create databases within team\_01 so the "New Data Product" button is hidden.

<figure><img src="../../.gitbook/assets/22-terminusdb-access-control-dataproduct_01.png" alt=""><figcaption></figcaption></figure>

The user has schema\_read permission level, from the "Data Product Model" section, they can see the schema graph in view mode.

<figure><img src="../../.gitbook/assets/23-terminusdb-access-control-data-model.png" alt=""><figcaption></figcaption></figure>

### Data product level permissions.

Login with the admin user again (the admin user is the only one that can manage teams, user roles, and capabilities)

* Select change user from the top menu bar,&#x20;
* Insert admin and your admin password (default is root)&#x20;
* Select "User Management" from the top user menu to navigate to the access control management interface&#x20;
* From the team list table, select the green icon in the team\_01 row

<figure><img src="../../.gitbook/assets/24-terminusdb-access-control-db-permissions.png" alt=""><figcaption></figcaption></figure>

* From the "team\_01 -- Team Users Roles" table list, select the green icon in the User\_02 row

<figure><img src="../../.gitbook/assets/25-terminusdb-access-control-db-permissions.png" alt=""><figcaption></figcaption></figure>

The user has no specific permissions at thr data product level, but each data product inherits the team access level, in this instance a **reader** role.

In the User\_02 Dataproducts Roles table list, in the dataproduct\_02 row:

* Select the green "Add database user roles" icon&#x20;
* The Add Database new\_data\_product\_02 roles window displays&#x20;
* Select schema\_writer and writer roles for the list&#x20;
* Click send

<figure><img src="../../.gitbook/assets/26-terminusdb-access-control-db-user-permissions.png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../.gitbook/assets/27-terminusdb-access-control-db-product-role.png" alt=""><figcaption></figcaption></figure>

#### Check the new User\_02 Permission

Login with User\_02, NO\_KEY, team\_01

* On the team\_01 home page, select the dataproduct\_02 from the data products pane&#x20;
* On the top bar, from right to left you will see:&#x20;
  * User roles - reader + schema\_writer + writer&#x20;
  * The user name User\_02&#x20;
  * The selected Team team\_01

As you can see, User\_02 can now edit the schema in dataproduct\_02.

<figure><img src="../../.gitbook/assets/28-terminusdb-access-control-user2.png" alt=""><figcaption></figcaption></figure>

Now select dataproduct\_01, you will see that the user’s role is reader, so User\_02 can only view the schema for this data product.

<figure><img src="../../.gitbook/assets/29-terminusdb-access-control-user2-dp1.png" alt=""><figcaption></figcaption></figure>



## Further Reading

[**Access Control Documentation**](https://terminusdb.github.io/terminusdb-access-control/#/)****

****[**Access Control JavaScript Reference Guide**](../reference-guides/javascript-client-reference/accesscontrol.md)****
