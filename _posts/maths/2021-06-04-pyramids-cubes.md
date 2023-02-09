---
layout: post
title: Exploration of Multidimensional Pyramids and Cuboids (Hyperpyramids and Hypercubes) 
date: 2021-06-06
modified_date: 2021-06-10
publish: false
tags: non-professional 
excerpt: Playing around with the proportion of volume for an N-dimensional pyramid within an N dimensional cuboid. Tried to figure out the proportion using only my background knowledge and no researching. 
---
NOT  COMPLETE -- YOU KNOW WHAT, ABANDONED TBD. Why are you here!?!? Stop looking! Just read A Mathematician's Lament and begone! AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH

After reading an excerpt of [A Mathematician's Lament](https://www.maa.org/external_archive/devlin/LockhartsLament.pdf) (a good short read, by the way), I became intrigued by an extension of a problem they solved which involved splitting a triangle stored within a rectangle by 2, and coming to the natural conclusion (via logic) that the triangle was half the area of the rectangle. Obviously, there's the hidden assumption that the base of the triangle is also covering the base of the rectangle, and that the triangle's top must be touching the top of the rectangle, but that's it. Insane!



////////////// COPIED FROM STICKY NOTES //////

"This is the result of me just playing around with this concept for a week or two, and having a few shower sessions thinking about it. None of what I'm saying here has been researched thus far, and the whole idea/problem stemmed from a Mathematician's Lament, with the amazing 2D geometry analogy. After that, I thought, what about 3D and got excited. Then I thought what about N-Dimensional?
Start from 2D -> 3D
Have tons of pictures, 2d, 1d, 3d, 4d..? Etc.

At first, I thought that the proportion of pyramid: cuboid would be 1/2 for any N dimensional thing, but then the formula of V=1/3… for a pyramid flew in my mind somewhere (I don't know where this formula comes from, but I think I might figure it out here). So perhaps it's 1/N instead for an N dimensional thing?

An interesting thing about this conjecture (we'll call it that), you need the base of the triangle to be attached to the base of the square, and the bases' corners (points, vertexes, whatever), should be connected.

(Show image of 2D triangle and cube/rectangle, showing 

Oh yeah, we'll just focus on solving for cubes for now. If we get an answer, we can probably apply it to rectangles really easily.
Talk about funky shit for N dimensional thing (we'll just go to 4D for the examples). And how a 4D plane would have 4 axis, all perpendicular to each other. So Imagine the 3D plan with its x,y,z, and then add a plane 90 degrees to all of those. That's 4D. Crazy.
Try to calculate 'volume' of pyramid in cube for 4D by using (0,0,0,0), (0,0,0,1), system, etc.

For a 2D system, you'd have 4 points for a cube (0,0), (0,1), (1,0), (1,1).
For 1D, you'd only have (0), and (1). 2 points. From this, we extrapolate that for an N dimensional system, there are N possible coord planes you can get. I.e for 3D you have (a,b,c).

The minimum number of coordinates required to create an N dimensional cuboid is 2^N. I.,e for a 2D shape (a square), you only need 4 coordinates. For 1D, you need 2. For 3d, you need 8. (0,0,0), (0,0,1), …
You get my point.

From this, you can create a pyramid. Note that the base of a 2d triangle is attached onto the 1D plane of the square. And for 3D pyramid, it's attached onto a 2D plane.

So an N dimensional pyramid will be attached onto a N-1 dimensional plane which is just a 'side' of the cuboid.

Which is funny, because that means for a 4D cuboid, you need 8 coordinates to describe the base of the pyramid. LOL???? Because for 3D, you only need 4. 
For 2d, you'd need (0,0), (0,1).
3D: (0,0,0), (0,0,1), (0,1,0), (0,1,1).

From this, we extrapolate that only the first column will be changed to find the singular point (vertex) of the pyramid that connects to the top of the cube. Which makes sense, because.. For the coords above (3D for example), we changed the coords for a fully 2D plane whilst keeping the final 'new' plane (the 3rd axis) untouched. Then, we touch it to create a vertext. Neat!
