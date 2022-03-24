# AccessControl

## AccessControl

**License**: Apache Version 2

## new AccessControl()

The AccessControl object has various methods to control the access for users. for the credential you can use the JWT token or the API token

**Example**

```javascript
//connect with the API token 
//(to request a token create an account in  https://terminusdb.com/)
const accessContol = new AccessControl("https://servername.com",
{organization:"my_team_name",
token:"dGVybWludXNkYjovLy9kYXRhL2tleXNfYXB........"})
accessControl.getOrgUsers().then(result=>{
     console.log(result)
})

//connect with the jwt token this type of connection is only for the dashboard 
//or for application integrate with our login workflow
const accessContol = new AccessControl("https://servername.com",
{organization:"my_team_name",
jwt:"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkpXUjBIOXYyeTFORUd........"})
accessControl.getOrgUsers().then(result=>{
     console.log(result)
})

//if the jwt is expired you can change it with
accessControl.setJwtToken("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkpXUjBIOXYyeTFORUd.......")
```

## getDefaultOrganization

**accessControl.getDefaultOrganization(params) ⇒ `string` | `undefined`**

Get a organization from parameters.

**Returns**: `string` | `undefined` - - organization

| Param  | Type     | Description    |
| ------ | -------- | -------------- |
| params | `object` | The parameters |

## setJwtToken

**accessControl.setJwtToken(jwt)**

Sets the Jwt token for the object

| Param | Type     | Description              |
| ----- | -------- | ------------------------ |
| jwt   | `string` | The jwt api token to use |

## setApiToken

**accessControl.setApiToken(atokenpi)**

Sets the API token for the object, to request a token create an account in https://terminusdb.com/

| Param    | Type     | Description                                    |
| -------- | -------- | ---------------------------------------------- |
| atokenpi | `string` | The API token to use to connect with TerminusX |

## getAPIUrl

**accessControl.getAPIUrl(cloudAPIUrl) ⇒ `string`**

Get a API url from cloudAPIUrl

**Returns**: `string` - apiUrl

| Param       | Type     | Description            |
| ----------- | -------- | ---------------------- |
| cloudAPIUrl | `string` | The base url for cloud |

## getAccessRoles

**accessControl.getAccessRoles() ⇒ `Promise`**

Get all the system database roles types.

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

## createOrganization

**accessControl.createOrganization(orgName) ⇒ `Promise`**

Any user can create their own organization. IMPORTANT This does not work with the API-TOKEN.

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param   | Type     | Description                     |
| ------- | -------- | ------------------------------- |
| orgName | `string` | The organization name to create |

**Example**

```javascript
accessControl.createOrganization("my_org_name").then(result=>{
     console.log(result)
})
```

## ifOrganizationExists

**accessControl.ifOrganizationExists(orgName) ⇒ `Promise`**

Check if the organization exists. it is a Head call . IMPORTANT This does not work with the API-TOKEN.

**Returns**: `Promise` - A promise that returns the call status object, 200: if the organization exists and 404: if the organization does not exist

| Param   | Type     | Description                               |
| ------- | -------- | ----------------------------------------- |
| orgName | `string` | The organization name to check if exists. |

## getPendingOrgInvites

**accessControl.getPendingOrgInvites(\[orgName]) ⇒ `Promise`**

Get the pending invitations list.

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param      | Type     | Description            |
| ---------- | -------- | ---------------------- |
| \[orgName] | `string` | The organization name. |

**Example**

```javascript
const invitationList = accessControl.getPendingOrgInvites().then(result=>{
   console.log(invitationList)

})
//this will return an array of invitations object like this
//[{@id: "Organization/my_team_name/invitations/Invitation/7ad0c9eb82b6175bcda9c0dfc2ac51161ef5ba7cb0988d992c4bce82b3fa5d25"
//      @type: "Invitation"
//      creation_date: "2021-10-22T11:13:28.762Z"
//      email_to: "new_user@terminusdb.com"
//      invited_by: "User/auth0%7C6162f8ab33567406a6bee0c"
//      role: "Role/dataReader"
//      status: "needs_invite"}]
```

## sendOrgInvite

**accessControl.sendOrgInvite(userEmail, role, \[note], \[orgName]) ⇒ `Promise`**

Send a new invitation

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param      | Type     | Description                                                       |
| ---------- | -------- | ----------------------------------------------------------------- |
| userEmail  | `string` | The email of user.                                                |
| role       | `string` | The role for user. (the document @id role like Role/collaborator) |
| \[note]    | `string` | The note to send with the invitation.                             |
| \[orgName] | `string` | The organization name.                                            |

**Example**

```javascript
accessControl.sendOrgInvite("new_user@terminusdb.com","Role/admin","please join my team").then(result=>{
   console.log(result)
})
```

## getOrgInvite

**accessControl.getOrgInvite(inviteId, \[orgName]) ⇒ `Promise`**

Get the invitation info

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param      | Type     | Description                |
| ---------- | -------- | -------------------------- |
| inviteId   | `string` | The invite id to retrieve. |
| \[orgName] | `string` | The organization name.     |

**Example**

```javascript
const fullInviteId="Organization/my_team_name/invitations/Invitation/7ad0c9eb82b6175bcda9c0dfc2ac51161ef5ba7cb0988d992c4bce82b3fa5d25"
accessControl.getOrgInvite(fullInviteId).then(result=>{
 console.log(result)
})
```

## deleteOrgInvite

**accessControl.deleteOrgInvite(inviteId, \[orgName]) ⇒ `Promise`**

Delete an invitation

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param      | Type     | Description              |
| ---------- | -------- | ------------------------ |
| inviteId   | `string` | The invite id to delete. |
| \[orgName] | `string` | The organization name.   |

**Example**

```javascript
const fullInviteId="Organization/my_team_name/invitations/Invitation/7ad0c9eb82b6175bcda9c0dfc2ac51161ef5ba7cb0988d992c4bce82b3fa5d25"
accessControl.deleteOrgInvite(fullInviteId).then(result=>{
     console.log(result)
})
```

## updateOrgInviteStatus

**accessControl.updateOrgInviteStatus(inviteId, accepted, \[orgName]) ⇒ `Promise`**

Accept /Reject invitation. if the invitation has been accepted we add the current user to the organization.

the only user that can accept this invitation is the user registered with the invitation email, we indentify the user with the jwt token

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param      | Type      | Description                   |
| ---------- | --------- | ----------------------------- |
| inviteId   | `string`  | The invite id to updated.     |
| accepted   | `boolean` | The status of the invitation. |
| \[orgName] | `string`  | The organization name.        |

**Example**

```javascript
const fullInviteId="Organization/my_team_name/invitations/Invitation/7ad0c9eb82b6175bcda9c0dfc2ac51161ef5ba7cb0988d992c4bce82b3fa5d25"
accessControl.updateOrgInviteStatus(fullInviteId,true).then(result=>{
  console.log(result)
})
```

## getOrgUsers

**accessControl.getOrgUsers(\[orgName]) ⇒ `Promise`**

Get all the organization's users and roles

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param      | Type     | Description            |
| ---------- | -------- | ---------------------- |
| \[orgName] | `string` | The organization name. |

**Example**

```javascript
accessControl.getOrgUsers().then(result=>{
 console.log(result)
})

//this function will return an array of capabilities with users and roles
//[{capability: "Capability/3ea26e1d698821c570afe9cb4fe81a3......"
//     email: {@type: "xsd:string", @value: "user@terminusdb.com"}
//     picture: {@type: "xsd:string",…}
//     role: "Role/dataReader"
//     scope: "Organization/my_org_name"
//     user: "User/auth0%7C613f5dnndjdjkTTT"}]
```

## removeUserFromOrg

**accessControl.removeUserFromOrg(userId, \[orgName]) ⇒ `Promise`**

Remove an user from an organization, only an admin user can remove an user from an organization

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param      | Type     | Description                                                         |
| ---------- | -------- | ------------------------------------------------------------------- |
| userId     | `string` | The id of the user to be removed. (this is the document user's @id) |
| \[orgName] | `string` | The organization name in which the user is to be removed.           |

**Example**

```javascript
accessControl.removeUserFromOrg("User/auth0%7C613f5dnndjdjkTTT","my_org_name").then(result=>{
 console.log(result)
})
```

## getDatabaseRolesOfUser

**accessControl.getDatabaseRolesOfUser(userId, \[orgName]) ⇒ `Promise`**

Get the user's role for every databases under the organization

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param      | Type     | Description            |
| ---------- | -------- | ---------------------- |
| userId     | `string` | The user's id.         |
| \[orgName] | `string` | The organization name. |

**Example**

```javascript
accessControl.getDatabaseRolesOfUser('User/auth0%7C61790e366377Yu6596a').then(result=>{
     console.log(result)
})

//this is a capabilities list of databases and roles
//[ {capability: "Capability/b395e8523d509dec6b33aefc9baed3b2e2bfadbd4c79d4ff9b20dce2b14e2edc" 
//if there is an id we have a user specific capabality for this database
   // name: {@type: "xsd:string", @value: "profiles_test"}
   // role: "Role/dataUpdater"
   // scope: "UserDatabase/7ebdfae5a02bc7e8f6d79sjjjsa4e179b1df9d4576a3b1d2e5ff3b4859"
   // user: "User/auth0%7C61790e11a3966d006906596a"},

//{ capability: null 
// if the capability id is null the user level of access for this database is the same of the team
  //name: {@type: "xsd:string", @value: "Collab002"}
  //role: "Role/dataReader"
  // scope: "UserDatabase/acfcc2db02b83792sssb15239ccdf586fc5b176846ffe4878b1aea6a36c8f"
  //user: "User/auth0%7C61790e11a3966d006906596a"}]  
```

## createUserRole

**accessControl.createUserRole(userId, scope, role, \[orgName]) ⇒ `Promise`**

Create a user's a role for a resource (organization/database)

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param      | Type     | Description                   |
| ---------- | -------- | ----------------------------- |
| userId     | `string` | The user's id.                |
| scope      | `string` | The resource name/id.         |
| role       | `string` | The user role to be assigned. |
| \[orgName] | `string` | The organization name.        |

**Example**

```javascript
const dbId = "UserDatabase/acfcc2db02b83792sssb15239ccdf586fc5b176846ffe4878b1aea6a36c8f"
accessControl.assignUserRole('User/auth0%7C61790e11a3966d006906596a',dbId,"Role/collaborator").then(result=>{
     console.log(result)

})
```

## updateUserRole

**accessControl.updateUserRole(userId, capabilityId, scope, role, \[orgName]) ⇒ `Promise`**

Update user's a role for a resource (organization/database)

**Returns**: `Promise` - A promise that returns the call response object, or an Error if rejected.

| Param        | Type     | Description                  |
| ------------ | -------- | ---------------------------- |
| userId       | `string` | The user's id.               |
| capabilityId | `string` | The capability id.           |
| scope        | `string` | The resource name/id.        |
| role         | `string` | The user role to be updated. |
| \[orgName]   | `string` | The organization name.       |

**Example**

```javascript
const dbId = "UserDatabase/acfcc2db02b83792sssb15239ccdf586fc5b176846ffe4878b1aea6a36c8f"
const capId= "Capability/b395e8523d509dec6b33aefc9baed3b2e2bfadbd4c79d4ff9b20dce2b14e2edc"
accessControl.updateUserRole('User/auth0%7C61790e11a3966d006906596a',capId,dbId,"Role/dataUpdater").then(result=>{
     console.log(result)

})
```
