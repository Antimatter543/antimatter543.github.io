---
layout: post
title: A Tale of Finite - Images of Babel
date: 2023-04-23
modified_date: 2023-07-01
publish: true
tags: ['thoughts', 'exploratory']
excerpt: 
---


So, I was doing some wondering (in the shower of course) about finiteness, and how powerful something finite could even get. And then I remembered reading something funny about how the display of your monitor is finite — of course it is! It can only display a certain amount of pixels, each pixels having only certain values. And yet. We have access to *everything we have access to* on here — games, social media, masterpieces of text and film. All of it! And when you think about it some more, I came to a simple realisation that just because something can be counted does not mean it should be scoffed at. 
- [ ] XXtask convert our 4K to 1024 x 1024 lol.... and fix the maths so it's 256^((1024*1024)*3). talk about how this is an absurdly large number, but, similar to godel's number -- it doesn't matter. we've done it. Every possible image, every possible variation of an image is in there, bounded under the finiteness of a simple (large) number.
	- [ ] then change as required, etc...

### The Library of Babel

You might have heard of it. Gaining inspiration from the *[Tower of Babel*](https://en.wikipedia.org/wiki/The_Library_of_Babel), the library of babel is effectively a library of all possible known texts (up to a limited size, just so it can be calculated). There's even a [website](https://libraryofbabel.info/) for it! You can go and peruse the library, where there lies all the texts ever written, and that ever will be written, right there. Among the hexagonal sections. Since they've already done that, let's talk about *images*[^1].

….

#### Peer Into The Abyss Of Images — God's Eye View?

We can imagine a site that just displays random pixels. Let's say it's a 4096 x 4096 pixel display. That's *pretty damn high resolution*. If there's any pictures on your phone, then that picture is definitely in this. I'll talk about this a bit more later as I'm (unapologetically) going to insert some maths here.

Now, I know 4K is pretty overloaded — you can probably see most images in 1024 x 1024 just fine (without pixel artifacts, and being able to clearly discern the image and its contents), but I'm going to stick with 4K[^2] for now because who doesn't want to suffer existential crises with pretty images?

How could we set some order to this mess? It all seems a bit arbitrary right now, and how big is this really? Could we somehow number every possible picture, and would that be unfathomably large?

Turns out, yes. And it's pretty simple too!

### Babel Numbers

Similar to Godel's numbers, let's construct Babel's numbers (if you want to give me a shoutout, call it Anti's numbers[^3] :P — I don't want to search if this has been done before; I would like to relish in the little glory I can have, thank you. It is a first on my personal timeline!)

Basically, we can describe *every possible image* in this 4K display as a simple number! Say, a picture of your cat would be 3024244925.  We can even describe a video as a sequence of these numbers like: {0, 696932929352, 2112303010, 23020, …}

But how high can these Babel numbers go? We have to understand that, in a 4K resolution, that's a really detailed image of everything you can think of in your head. Seriously, if there's an image in your head, you could probably show someone else a 4K version of it and they would understand. Let's start calculating!

### Calculating Everything.

Spoilers: It's not that big.

If we assume that the 4096 x 4096 pixel image is just an RGB with no alpha value, each pixel has 256^3 possible values. Now, multiplying this by the number of pixels in the image — $$4096 * 4096$$ — gets us our total number of "Babel Numbers":  

 $$(256)^{3} * 4096^{2} = 2.8147498e14 \approxeq 2.815*10^{14} $$
Would be really awkward if I got the maths wrong and had to rewirte a majority of the post...[^4]
 So. There are  approximately 2.8 * 10^14 possible images in 4K (with no alpha value). All things accounted for — and seeing how this could effectively account for anything and everything that could show up on our screen — that's not that much actually! Only 280 trillion possible images. And consider, like the library of babel, that most of these images convey nothing and are effectively gibberish to us humans, so the space of 'useful images'[^5] must be drastically lower!

And remember, we could see images in 1024 x 1024 just fine (perhaps even 512x512). In the case of 1024x1024, there are $$1.76 * 10^{13}$$ possible Babel numbers instead.

Even adding the alpha value to the 4K example leads to $$256^{4} * 4096^{2} \approxeq 7.2*10^{16}$$ Babel numbers. Not even remotely anywhere close to the number of atoms in the universe! Hell, even the Earth weighs more in kilograms[^6]. 


- **add the way to calculate the given babel number of some image** with the vector notation and stuff... Pog.
	- Note: Since every babel number is being multiplied by the '256^n vector', there might be some prime mathemagic one could do to reduce the highest babel number, but I'm not sure how. For our purposes, it doesn't matter.
##### To store it 

**Storing** all these is just:
- Use longs. 64 bits per number is enough (and a bit execessive) as a 64 bit number can go up to 2^64  = 1.84e19.
	- 2^48 works fine too. Actually.. It's exactly the same as our calculated one?? Oh. Because 256 and 4096 both have 2 as a factor. Right.

Anyways, let's use 64 bit just to be fancy. So, that's 8 bytes per number, leading to 2.252 * 10^15 bytes to store *all the numbers*, which is about 2252TB[^7] of storage. Okay, maybe it's a bit large 😅, but nothing compared to industry scale storage solutions. Also, maybe we should have asked this before we calculated but, why would you want to store *all of it* at once instead of just generating new numbers when you want? Well, I won't judge your fetishes. Your secret is safe with me![^8]

Anyways. Back on track.

### Ordering the bloody images

Right now, there's no order to the numbers — we know that every image is attached to some unique Babel number, but there's no systematic ordering to this. So let's make one.

- Let's say Babel Number 0 goes to the image where every pixel in the screen is (0,0,0). It's just a black image.  
{show black image}

- Babel number 1 goes to the image where the first (top left) pixel is (1,0,0) and every other pixel on the image is (0,0,0).[^9] This is effectively the same image as the above, but with the first pixel having a *slight* red hue.  
{show img}

- BN 255 has same as above, but its top left pixel is (255,0,0). This is a full black image but its first pixel is a pure red.  
{show img}

- BN 256 is top left pixel (0, 1, 0) and everything else as (0,0,0). 

- BN 258 is (2, 1, 0) and everything else (0,0,0)
![[A Tale of Finite - Images of Babel June 26, 2023.excalidraw]]
Hopefully you get the idea by now. A good exercise for the reader would be to make an image -> ~~Anti~~ Babel number program. You could also try the converse: Babel number -> Image. After a sneaky attempt, making the number -> image is much easier compared to image -> number...

And there's no reason to stop at images. I mean, videos are quite literally a sequence of images, so you could convert videos to a series of Babel Numbers too. In fact, storing a video like this would be somewhat "efficient"[^10] — you just need the Babel number sequence (at 30fps, a 10 second video is 300 numbers) as opposed to the each number being an image. And at max, each number would be under 300 000 000 000 00. Just… don't expect the video playback time to be quick.  

- **an interesting Idea I just came across in the shower** -- although these images are finite, you can combine two images with the babel numbers to make a *larger image* that wouldn't be possible within the 512 x 512 system. What I mean by this:
	- Imagine we have a camera and a room with a baby inside it. One babel number (512x512) would lead to the left half of the image -- perhaps the carpet, some toys, a desk, a window. Another corresponding babel number must contain the right side of the room!! The side with the baby and the crib, to make a 512 x 1024 image. There must also be *many* possible images of the left and right -- perhaps one of the left images has lovecraftian monsters waiting under the shadows, for instance. 
		- Upon some further thought, this is actually a very obvious conclusion. Consider a single pixel -- with this, we can construct **all possible images**. It's funny how sometimes you discover ideas in complex systems, but then these ideas can also be found in the simplest case. But it always feels *more special* when you find it in the complicated system.[^11]
This is still a pretty cool idea though -- to make something 1024 x 1024 resolution, we just need four 512 x 512 images. That is, for every 4 babel numbers in the 512 size, we can generate a babel number for a 1024 size. Similarly, this means we can create a 4K documentary of your whole life, provided we had the right babel numbers, in the given location.

Now the great thing about this is that, if you've ever done anything in your life — public or private — **you are caught!** In **4K!** Yes. You know what you did. Shame on you.

Now that we've gotten the maths out of the way, let's head back to what this means.

### What it means

Essentially, *every possible image that you could imagine in your head* is in a Babel Number — you can "only" have 280 trillion visual images. Maybe not its *exact* the resolution, but you can be damn sure the ideas of the image and what it represents are there.

There's your baby photos in there. A photo of your first birthday, with your family surrounding you — *even if nobody took that photo*. 

One of those pictures will have your date of death on it. It will have a picture of your funeral, along with all its attendants.  
Another will have how you died, the moments before, the moments after. Perhaps you fell down stairs — it will have them. One of those combinations will have the picture of the moment you died, and at this resolution, a good written summary of how you died right below. And that summary? There's a picture for *every known human language*.

Actually, it's not just one photo. It's an entire set. Take for instance, the babel number that'd lead to an image of your birth from a bird's eye view. Now, we can have 1 pixel off, and you would still be able to easily discern it as your birth, yes? So realistically, we have at least 4096 * 4096 images that have your birth on it, within a one pixel accuracy. Inexorably bigger if you consider the alpha opacity values. There'd be a gray scale version of that image too, of course. And another one, half gray scale and half coloured.


*All those combinations*. Just for you.

Your most private moments, right there, for anyone to see, if they could only search through the combination space. One click of a button, one little randomisation to a babel number. And you appear. 


Any private thoughts that could be written within a 4K image — right there. Any mathematical proofs that could fit on it — it's in there.  
There could be things that would scar you for life, or things that would bring you immense joy.  
…  
If you had the right numbers, from one possibility to the next, you could attach the images into a fully comprehensive documentary of your *life*.  

Your past.  

Your present.  

Your future.  

It's all there. Just waiting.  

**IN 4K!**

Yes, infinity is cool.
But, do not underestimate the power of the finite.

##### Author's Notes:

So, I created the document for this post on April 11th, and it was mainly just the idea and the emotional OOMPH you had at the end — string the top bit of the introduction, and everything under "What it means".  
However, when I revisited this in late June, I added the Babel numbers. I'm not sure how this impacts the flow / if this mix between math and existential oomph is jarring, so feedback is appreciated!

[^1]: Although there seems to be an image thing on the site too… Is it seriously just impossible to come across a unique idea? Damn! Any idea you come up with, search long enough and someone else has done it before.
[^2]: It turns out 4K isn't actually 4096 x 4096 lol, it's less!! But for the sake of continuity, I'm just going to refer to 4096 x 4096 as 4K for now, because why not! 4096 x 2160 seems like the "actual" 4K. = 1.4e14 Anti numbers.
[^4]: Let's just not talk about it.
[^3]: But. Y'know. Without all the groundbreaking relevations and game-changing ideas that shook the foundations of mathematics. Yeah, maybe just call it a Babel Number.
[54]: Images that actually tell us something — like a dog, or a cat, or a CCTV snapshot of a person at a gas station counter late at night. 
[65]: 5.972 * 10^24kg for those wondering.
[76]: Oh my god. TB??? Terabyte vs Tibibyte?? What on earth? I always thouht Terabyte etc… were the 1024s, but apparently they're just base 10s??
[87]: Because you aren't actually speaking to me. You're reading a blog. Are you alright? Do you need to drink some water, maybe lay down? Rest well, friend. You need it to live.
[98]: Before, I actually had it like Babel # 1 goes to all pixels (0,0,0) except for the bottom right pixel, which would be (0,0,1). I decided to flip it just because it's more intuitive for the number to "fill up" the pixels, and potentially a bit easier to code for as well.
[109]: Better than holding every pixel in the video as its unique value. This is beginning to make me wonder how does video compression do its magic, but uh, let's try doing that another time.
[^11]: Before slapping yourself in the face when you realise it's not an emergent property, and could've been found much more easily. This happens a lot to me, for some reason.  