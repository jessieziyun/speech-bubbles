# Speech Bubbles

This code  allows a single user to blow digital bubbles of sound. Sound is played back when the user's ear enters a bubble. The total number of bubbles is limited to 10 at a time. If you reach the maximum, the earliest blown bubble will 'pop'.

### Next steps:

- share these bubbles with other users
- refine the sound detection code: work out the threshold for `sound=true` and `sound=false` and change the way I'm finding the volu, perhaps using gain nodesmemy : current methoseemsis unnecessarily expensive
- move bubbles with hands (hand tracking/edge detection?) \*note: if I include this, will all the processing be too heavy for the browser?

##### Made using [Node.js](https://nodejs.org/en/), [Threejs](https://threejs.org/), [TensorFlow.js](https://www.tensorflow.org/graphics), [FaceMeshFaceGeometry](https://github.com/spite/FaceMeshFaceGeometry) and [Socket.io](https://socket.io/).