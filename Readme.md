# Sodux Child

Sodux is a wrapper on web sockets for Node. This goes along with Sodux Mothership [here](https://github.com/amaljose96/sodux-mother)
This follows a format similar to Redux to share state between users using web sockets.


## Concept

This repository is for Sodux Child, which contains the dispatcher and listener.
The Sodux child would connect to the server (Mothership) and starts listening for any changes.
Also, the sodux child can dispatch actions to the server so that all other children are informed.

In other words, the child can inform about changes to the mothership and also listen to the hivemind for changes from other children.

In the server, a reducer is used to determine the next state based on the action dispatched by the child.

## How to install?

All you have to do is run
``` npm install sodux-child ```

To import the module to your application
```
let SoduxChild = require("sodux-child");
```

## How to use?

A Sodux Child instance can be initiated in the WebApp by:
```
 let soduxChild = new SoduxChild ([URL],[listener],[options]);
```
URL is the sodux mothership URL
Listener is listener function which would listen to any change from the server.

Currently supported options are:
##### Debug
To log Sodux activities in console

### Listener

This is a function which recieves the latest state from the server.
This is invoked when the server broadcasts the state on reciving an action from any of the connected children.

The listener can be provided to the Sodux Child either while initiating or by calling the listen method.

```
soduxChild.listen(newState => {
   console.log("Mothership says ",newState);
})
```

The newState would contain the latest state of the space the user belongs to.
Also, newState.childInfo would contain child related information set using the SET_INFO action.

Multiple listeners can be registered by calling soduxChild.listen multiple times.

### Dispatch

This is used to dispatch an action to the server.
To dispatch an action,

```
soduxChild.dispatch({
    type: "CHANGE_SPACE",
    space: "Milky Way"
})
```
Sodux actions except CONNECTED and DISCONNECTED can be dispatched using soduxChild.dispatch
Sodux actions can be checked out [here](https://github.com/amaljose96/sodux-mother)

##### Note
Currently every dispatch and listen is synchronous.

Also try offloading logic to Sodux mother, since dispatch of an action and calling the listen due to that action is asynchronous.
Also try updating variables from listen instead of setting them manually while dispatching (perhaps include loaders to show that data is being processed) 



