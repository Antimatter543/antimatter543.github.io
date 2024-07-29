---
layout: page
title: About
permalink: /about/
---

<!-- 🚧 WIP!! 🚧 Of course it's WIP, past Anti... It's always WIP> That's life. Life is a work in progress. <3 We don't need that sign postage anymore-->

<!-- what the hell ctrl+q on my vscode line wraps the paragraph I'm on -->


{% assign target_date = '2036-11-25' | date: '%s' %}
{% assign current_date = 'now' | date: '%s' %}
{% assign seconds_diff = target_date | minus: current_date %}
{% assign days_till_deadline = seconds_diff | divided_by: 86400 | plus: 1 %}

<center> {{ days_till_deadline }} </center>

I'm a *human*, and I think universal function approximators are pretty cool! I'm
a game theory enjoyer: **computation is based.**

Sometimes, I like having a gander at large problems, or just things to *think
about*, playing with the ideas and see where they lead, what consequences they
would have, even if the idea itself may sound out there or infeasible. It's just
fun to do! I'd love to write about these in blogs as well, although I feel like
they deserve a different section since they'd be pretty different to the vibe
that my usual blogs -- i.e practical career progression, ... -- like *first
hackathon*, *flask website*, ... have.


Sometimes, I like writing about problems that I'm just struggling with, or to
have a conversation with myself. It's not really intended for professional
sakes, but I post it because why not? Just a bit of tidying up and there we go!
Life can be about more than just my pure profession. It's a bit strange to do
this, but I realised something very simple but also very important: it's [my
website](https://github.com/Antimatter543/antimatter543.github.io). To live out
my life without talking about the things I want to talk about sounds too sad,
even if it might not necessarily boost my odds of being a favourable developer
candidate. 


Since I've been procrastinating on these so much, I'm going to do something. For
a while, I've been unsure of who my target audience is. In my head, it always
flickers -- from university peers, to strangers on the internet, to sort of me,
to career prospectors. And I've always had such trouble writing it for other
people; I feel as if some of my flair has to inevitably be cut down to become
common enough for it to be accepted. And then I realised something, which I'll
say by a similar event. In english, I would always do poorly if I listened to
the task sheet as is, and tried to write 'to their goals'. But, when I twisted
the wording, the task, to something I was interested in, to something I wanted
to do, I ended up getting better grades. *And I was more passionate about it.* I
actually enjoyed writing. It seems that, my best work is when I'm enjoying
myself[^1].

Anyways, so my target audience is **a younger version of myself.** I will not
force myself to be overly practical, or reduce my tangents TOO MUCH (of course,
I will have to reduce it a fair bit to make it readable...). I will write
practically, my rationale for how I came to do these things, and blah. It is
mine. This is mine. Simply put, I want my writing to be:
- Practical
- Funny
- Interesting
I.e hopefully improve one's model of the world in a fun way.


**Extra:** Here's an XKCD that really resonates with me.
![XKCD 137!](https://imgs.xkcd.com/comics/dreams.png)


Side note: I highly recommend being exposed to at least some discrete maths in your lifetime -- sets, boolean logic, implies, basic proofs. It gives you an understanding of precision, and lets you understand how important definitions are. If you have different definitions, then, you can't undermine someone else's statements.

[^1]: Which is pretty obvious and not at all a unique trait, but sometimes you must go in a weird spiral to come to obvious conclusions yourself.