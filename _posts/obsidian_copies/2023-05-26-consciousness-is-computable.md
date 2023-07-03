---
layout: post
title: Consciousness is computable
date: 2023-05-26
modified_date: 2023-06-04
publish: true
tags: ['consciousness', 'life', 'information', 'turingcomplete', 'thoughts']
mathjax: true
comments: true 
excerpt: A small post detailing my view on consciousness and computability. Meant to be in a larger post, but it became a bit too unwieldy and I felt like it.
---



## Preface

Note that this is unsolved, with a major proponent against this being Penrose. However, I agree with [Demis' viewpoint](https://www.youtube.com/watch?v=Gfr50f6ZBvo&t=1941s) that it is in fact computable. There are many arguments you could try to make as for/against, but I'm going to present a simple idea that may convince you. It might sound stupidly simple, and the first time I heard it I thought so too and wasn't sure about how rigorous this was, but I guess it's grown on me over time. There are different routes you can go to try and argue for the computability of the mind, but I'll go with something [Church-Turing thesis](https://en.wikipedia.org/wiki/Church%E2%80%93Turing_thesis)-esque. Enjoy!

## Turing Completeness

- To prove that two systems A and B are equivalent, we need to show A's capabilities are a subset of B, AND B's capabilities are a subset of A. If this is the case, the only possible conclusion is that they are equal. I.e:  

$$ (A \subseteq B) \wedge (B \subseteq A) \to A = B$$

[^1]

This isn't even necessarily related to computers, but a key part of (discrete) mathematics. This is how you show that two sets are equal (by showing each set is a subset of the other).

- For instance, a Turing machine can be modelled by lambda calculus and the lambda calculus can be modelled by a turing machine. Since they can both model each other, their capabilities must be equal. [A proof is here](https://arxiv.org/pdf/2010.15600.pdf )[^2]. More generally, this idea is known as *[turing completeness](https://en.wikipedia.org/wiki/Turing_completeness)*.[^3]

## Humans and Computers

It is extremely easy to show that a human brain can model a computer. I mean, we invented the bloody things!

For one, where did the *term* of [computers](https://en.wikipedia.org/wiki/Computer_(occupation)#:~:text=Alan%20Turing%20described%20the%20%22human,work%20was%20divided%20so%20that) come from? Humans. When lots of calculations needed to be done (like in astronomy, the Manhattan project, …), there were teams of (human) computers whose entire jobs were to follow basic instructions and complete math problems — they crunched numbers.

Then came along [godel numbering](https://en.wikipedia.org/wiki/G%C3%B6del_numbering) and eventually turing machines (and lambda calculus). We can complete lambda expressions, act upon their rules, and we can simulate turing machines — in fact, we did on paper, before physical computers were invented to find out their properties. You yourself can act out an algorithm (like sorting a list), instruction by instruction. We've done mathematics for much longer than modern day computers.  
So we can simulate everything a turing machine can do. Slowly, perhaps, but that is irrelevant.  

We've fulfilled Brain $$\subseteq$$ Turing Machine, i.e the brain can simulate a (universal) turing machine.

This means **there are only two possible options**. Either:  
- The Turing machine *can* simulate the brain. In this case the brain becomes a Turing complete system, and supports the Church-Turing thesis even more. Or:
- It cannot.

##### The reality we live in is **one of these**.

In the latter case, this means that the human brain is a model of *[hypercomputation](https://en.wikipedia.org/wiki/Hypercomputation)* — a hypercomputer. The human mind, in its little 30x30x30 box[^4] and 20W usage is a *hypercomputer* that can do everything a universal Turing machine (and lambda calculus, and all other equivalent systems) can do, **and more**. This is an incredibly big idea, and not something to trivially say 'sure' to, especially as no system has been found to exceed Turing complete capabilities (yet?)

Hypercomputation so far seem to be a mathematical abstraction. [Church-Turing](https://en.wikipedia.org/wiki/Church%E2%80%93Turing_thesis) thesis stuff.[^5]  

Our little 'rigid' Turing machine systems have given us a communication system across the entire planet, ways to explore stars, emergence[^6]. *Video games*. Capturing of media — image, text, whatever you want. Simple instructions can generate effectively any image you could imagine — [[A Tale of Finite - Images of Babel]].

AI — built from simple mathematical foundations (really "just"[^7] matrices and a bit of calculus) — has exceeded the practical expectations of humans again and again and again *and again*. From Go to computer vision to face generation to diffusion to photo editting to text generation.

Choose which side you want. There are many people that believe it's possible — Demis Hassabis, Max Tegmark, a whole host of AI researchers. There are also some proponents of conscience being impossible to compute — [Penrose etc..](https://en.wikipedia.org/wiki/Orchestrated_objective_reduction), invoking ye' old quantum. **In the end, it's still an unsolved problem.**

### Conclusion

I see consciousness (and for completeness sake; the brain too) is computable — which means:
- **Digital intelligence is completely possible** — AI *can* be conscious entities. What this means, and it's a bit wild to think about, is: there exists some model architecture with some set of parameters, initalised to certain values, with some type of perception and some control over its environment that, upon being run, results in a conscious entity.  

That seems wild, but it's also wild to think that somewhere between being a single cell, and being 7 years old, you somehow became conscious.


How does one reach it then?  
Who knows, but I don't get why it *wouldn't* be possible. What would be preventing an entity who processes information through metal instead of biological mush not be capable of *experience* like we are? This would imply a mechanism that *only* exists for 'mushy' (biological, or whatever you want to call it) substances. This would lead to consequences about possible alien life forms, and place a discriminator for consciousness — on not just whether a system can process information in certain ways, but what material it's made of as well.


Perhaps I'm being biased. To me, a world where the mind is computable is much more interesting than one where it isn't. Imagine — if we are the only special entities capable of consciousness, would that not make us so much lonelier in this grand universe?[^8]

## Extras: A curiosity on Penrose's arguments

Apologies to all who expected a non-controversial post. Oh well — I can't *just* be a poster of already-known things. I guess this is more of me 'thinking' aloud — exploration is important!

Now, I haven't actually read the books, but I've read some summaries and the general idea seems to be around quantum phenomena in the brain causing conscience, and this phenomena by some mechanism (either specified in the book or unspecified — don't know, haven't read) cannot be attained by machines.

My question is… why? Specifically the second bit. I'm simply curious about this. I don't even want to argue about how under this model, the brain would be a hypercomputer.  Supposing that consciousness does indeed need some quantum mechanical effects in order to occur — why would that stop computers and digital things from being conscious?

What's the proposed limitation that lets the thing within the bounding box of the skull be conscious, but stops a machine from ever reaching conscience? To my knowledge, machines also exist in reality.

Why would a digital system not be able to exploit quantum effects in order to become conscious, if a human could do it in the bounding box of their skull (and if these quantum things are in fact, how conscience arises)?  Also, quantum computers — where does this fit? Whatever magic is happening must occur within the skull, but this model of conscience — to my knowledge — makes it unable to occur in silicon/metal.

And if that *is* the case, what is preventing a metallic system from (pardon me for the imagery) just bootstrapping itself to a biological one and exploiting its material properties to gain hypercomputation capabilities?

Either way, anyone who even tries to tackle these subjects are *incredibly based* and have my respect. Hopefully there these are answers that we can reach, as a collective intelligence!

[^1]: "If (A is a subset of B) AND (B is a subset of A) this implies A is equivalent to B."
[^2]: and other places. Now, I haven't actually read it because I have semester finals in a week, but one can always trust latex documents :P
[^3]: My precise wording may be a bit off — there seem to be a lot of nuance and turing complete vs turing equivalent vs blah blah. You get the idea, that's all that matters right now.
[^4]: Yes, you can include the spine if you want. Hell, include the whole body. And hormonal influences. Happy? 
[^5]: I didn't have a good place to mention this, since this post just came out of the blue from another, larger post but how could I not mention the Church-Turing thesis here???
[^6]: Game of life, etc…
[^7]: Be very careful when you say the words "Just". Some people would say "Oh the brain can't *just* be a statistical prediction engine". Bet?
[^8]: Look… I needed to end this post somehow; give me a break.