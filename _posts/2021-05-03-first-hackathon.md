---
layout: post
title: "Dungeons and Data Structures Hackathon Reflection"
date: 2021-05-03
modified_date: 2021-05-12

publish: true
tags: normal gold
excerpt: 'A little analysis on my first ever hackathon. Hosted by Coder One as their AI Sports Challenge 2021, it seemed like a fun starting point and I learnt <em>a lot </em> in this (especially around workflows and realistic team-based projects).'
# comments: false
---

<style>
	.post img {
		width: 50%;
	}
</style>


### Abstract (Spoilers) 

First hackathon I've done. Joined a team, learnt a bunch of stuff about workflows, git, branches and communicating with a team among other things. Skip to <em> The Game </em> if you're a boring nancy, and skip to <em> Results </em> if you're the most boring nancy. T'was a wild week. Team name: Totoro.

Here's our github repo: <a href="https://github.com/chrisrabe/ai-sports-2021"> AI sports 2021 </a>.

Silent (team leader) also made his own reflection type thing: <a href="https://docs.google.com/document/d/1ozkP3XgFPLWy1wzUtgNeFF_y5ijLSH4Aw17bPBEn7fM/"> Here it is. </a> See May 1st Logs for my definitely not cherrypicked praise hehe.


<h2> Table of Contents </h2>

<ol>
</ol>
* Table of Contents (this text is replaced with the table of contents)
{:toc}

## Background Information 
<a href="https://www.gocoder.one/aisports"> Coderone </a> is a (recent) startup company who so far hosts AI competitions. In December 2020, they hosted their first hackathon - a bomberesque game where your bot vs' another bot and wins by having more points than the enemy or letting the enemy die.

<img src="/assets/coderone/oldgame.gif" alt="Gif of the old game">
<small> Gif of the old game. </small>

Unfortunately, I wasn't there for that.
Instead, the variation of the game when I joined (May 2021) was where your goal was to eliminate the enemy. Kill or be killed. This was my first ever hackathon, and there were people who already had previous experience from Coderone's other hackathon. Ready to kill my bot.

Fun.

<img src="/assets/coderone/game.gif" alt="Gif of the game. Not yoinked from Valgrowth's article.">
<small> Gif of the new game. Kill or be killed. </small>

Anyways, I scouted out their previous game's repo and inspected the #1 agent's code (Jigglybluff). Safe to say I did not know what I was looking at (I think that'd be the case for most of the repos I looked at). In hindsight it looks like they wrote for a bunch of special cases (i.e spam if statements), which works well when you have good knowledge of the game. 
<cite> Madman himself commented on this.[^1] </cite> There'll be more info in Our Bot.

[^1]: The if statements were essentially a strategy hierarchy, which allowed only required information to be executed instead of every possible function needed over the entire bot. In other words, if we could kill an enemy, there's no reason to calculate anything (including the pathfinding, etc.) involved in executing a pickup strategy. Ultimately, this leads to increased efficiency (since you basically made the 'worst case' of your current bot the 'normal case' of your previous bot (w.r.t computation resources)). Coincidentally, our team also did something similar to this when we were optimising our bot with respect to time. Huh!


A few days before the <b> kill </b> version started, they set up a #LFT (Looking For Team) chat. 
I was planning on going solo, but yolo. Maybe a team would be good? (Spoilers: yes.) 

After writing a quick self intro, someone we shall call Silent asked if I wanted to join their team. I asked a few questions, then joined. There were already 2 other people in the team. I was going to talk about them straight up, but there's some terminology there so it's better if I explain the game first.

### The Game 

Here's the <a href ='https://docs.gocoder.one/'> game docs </a> for this version of the game if you're keen to delve further. As said before, it's a 1v1 kill or be killed situation. The game is a 9x9 map where players spawn with <code> 3 (initial ammo, hp, player diameter) </code> at a set position. Maps are symmetrical and pickups (ammo, powerups) spawn at random tiles every once in a while. You damage the enemy with bombs (more specifically, the 'blast' entities it shoots out). A powerup increases the player diameter by 1, so the length of the blast zone that explodes from the bomb is  <code> player_diameter //  2 </code>.

Also, there's <b> fire </b> that starts spreading at 1800 ticks, and encircles the map until everything has a fire (technically a 'blast' with no expiry date) object on it.
You can destroy the wood tiles with bombs, but the shiny stuff is immortal.

#### Tournament Rules 
There's qualifiers, which is a round-robin tournaments. Results in... Results.
The bot we submitted was the algo-bot instead of vm bot (we'll talk about that later).

For playoffs - I didn't know they'd do this - but all the top 16 bots from qualifiers already played vs each other, and I think only the top 4? or top 8? were featured on stream. Sad! Definitely did not tell my english teacher about the stream (oops).

 

Previously they used python but this time they decided to use a thing called <a href='https://www.docker.com/'> Docker </a> (something about letting other programming languages submit their bots as long as it runs in Docker - linux container or something). All I'm saying is I'm very grateful that I joined a team because to someone who's never used this type of thing before, what the <em> hell </em> is a Docker image?

Anyways, let's go meet the team!

### The Team 
<p>Silent - Software engineer guy, participated last time. Very pog. </p>
<p> Anti - Me guy, it's me! </p>
Waz - Data science guy, participated last time. Very nice.

Gaurav - High school student 2 cores guy, participated last time. Very nice.
<s> 
Alex - Consists of 2 people (5th members) who didn't do anything so they essentially left after a few 
days joining. Basically, the guys that joined & quit. Alex is the term used for this. 
</s>

#### The team but more

<b> Silent </b> was essentially the team leader. Once the game started (or close to it), he shared the private repo we would be committing in for the duration of the hackathon.
The codebase he set up abstracted away the weird Docker stuff so our team could just focus on actually coding the bot instead of worrying about the infrastructure. He drew diagrams explaining the structure of the project as well as set up a discord server for the team, having chats for strategies, replays, todos, bug-fixes, etc (team decision).
Dude is also crazy good at finding bugs in code. We had meetings about once every day @ ~8PM, just to see where everyone is, and what the next few goals/long term goals are. Very pog.

He also showed us how to use git (more than the very basic stuff), and set up a develop branch that we branch AGAIN to add features. Showed how to pull, merge, push, compare to prevent any conflicts. Very epic.

As a side note, the code <em> may </em> have been a bit over-organised for my own taste (in the latter half of the project anyways), but it was still definitely useful & workable. Highly-highly organised environments are not my thing (my room will vouch for this; only I know where everything belongs in this domain).

This absolute madlad also made his own reflection type thing, which looks better than mine. <a href="https://docs.google.com/document/d/1ozkP3XgFPLWy1wzUtgNeFF_y5ijLSH4Aw17bPBEn7fM/"> Here it is. </a>

<b> Anti </b>- My main role was the brain decision guy, as well as the originator of the algo-bot (or atleast the continuer of it once the team began focusing on a bot that used value-map). For instance, in the repo, I'm the one that made basic_avoid and the properties of enemy_immediate_trapped and enemy_onestep_trapped among others. Onestep trap is a very useful concept, which I'll probably use and expand on in later tournaments. Obviously, bugs came and bugs died. I probably spend around ~4-7 hours / day for a week working on the bot, and that's not including the time I wasn't at my PC. I slept thinking about it, and woke up thinking about it.

The main reason why I voted to do the algo-bot (even when the valuemap bot was better at this point) was to get a feel for how pre-RL solutions worked - the nitty gritty, pure coded algorithms that told the bot what to do when to do it. 
That way, once I eventually do create an RL solution, I can appreciate the ?elegancy? of it much more. Let's just say there was *a lot* of working memory and debugging required to properly write those algorithms. Not to mention, an RL bot can greatly exceed the level of human-capable coding & understanding of the game if done right (and if the game is complex enough such that humans can't figure out an optimal strategy without RL).


<b> Waz </b> - He mainly worked on the value-map bot, and experimenting with creating better versions of how the value map operated - setting rewards, using different discount rates & the method of propagation, etc. I didn't get to see what he was doing too much because I was too busy with algo-bot, but Silent & Waz were the ones that worked on vm-bot the most.

<b> Gaurav </b> - Gaurav did what he did. He worked on the pickup and block destroy, and probably some other things that I'm not aware about. (I don't know about my team, but I <em> really </em> didn't want to work on pickup or block destroy for some reason, so this guy basically took the L for me. Pog. I think Silent helped a bit with those too.)


## Our Bot / Results 

Here's the [github repository again](https://github.com/chrisrabe/ai-sports-2021). Talking about the bot(s) first, then the results. Our team name was Totoro (and for fun, our final submission was 'Spicy Totoro'. Don't ask me why, I have no clue.)

### Bot
From our in-house scrims, the vm-bot consistently the algo-bot one it had the 'retreat' strategy, which was essentially a valuemap version of the basic avoid strat.
However, when our local 2 core Gaurav ran the image, the vm bot was glitching out (and the algo-bot, but less so). Turns out that the vm bot was returning & executing strategies too late -- it was too slow. Now, we didn't find this until the day we had to submit for playoffs, so we quickly had to submit the algo-bot which I had diligently been working on, just watching it *lose and lose and lose* to vm-bot. Luckily, I had just created an immediate_enemy_trapped property (added it to the gamestate), and along with some last minute bugfixes with the team, algobot made it through qualifiers. Turns out working on algo-bot was useful after all.

{%include embed.html url="https://www.youtube.com/embed/gwcoWbcj13s"%}

<small> A later version of algo-bot vs aggro bot. These are both post-qualifiers, and aggro bot is well... A more aggro version of algo bot. Algo bot was submitted. Clean onestep kill by algo-bot at the end (that's my baby!) </small>

Even then, there were clear optimisations that we could make in terms of speed, so Silent began timing and setting benchmarks for each strategy, execution, etc. After the team enhanced the functionality of algo-bot to be a better killer, have some rudimentary zoning mechanism, better avoidance of hazards, etc. we submitted that one as our final bot.

Another thing was that we first placed all the custom trackers created (which appended new properties onto the game_state) into a finals_tracker. Here's the thing: some of the properties were pretty expensive to calculate (such as articulation points), and this would be executed every tick regardless of whether or not we needed it for our decision making algo-bot's brain.

Silent noticed this, and the 5head he is, decided to split the tracker updates based on which strategy needs them. For instance, we'd only update the necessary tools for pickup if all the previous conditions have failed, and we now needed the pickup info to decide on whether or not to bother picking anything up. Essentially, we just update the required parts for whatever strategy is ahead.
Might've worded it a bit odd, so here's the brain code.

<img src="/assets/coderone/brainsnippet.png">

**<a href="https://docs.google.com/document/d/1ozkP3XgFPLWy1wzUtgNeFF_y5ijLSH4Aw17bPBEn7fM/edit#"> Here's Silent's reflection that he somehow already made. </a>**

### Results 

TL;dr - Made it through qualifiers (came 13th), lost in playoffs. 

<img src="/assets/coderone/coderoneRankingsMay2021.png"  height='500' alt="Results for the qualifiers rounds. Not the greatest, not the worst.">

To be honest, it was oofed when our bot didn't even make it to semi-finals but 🤷. Not bad for a first time. At least we beat some teams, and actually looking back at the replays, our bot fared quite well.

<img src="/assets/coderone/playoffresults.png"> 

<small> 
Thanks to OtherBarry (Team Bruh) for providing a quick script that pulls the info into the .csv you see there.
</small>

It consistently managed to bring *Bruh* (which was the team we lost to in qualifiers) to the 2100 tick stage -- so our bot was actually decent early-mid game, but in the end, we didn't work enough on the fire & emphasis on the centre of the map. Which makes sense; we only started focusing on fire at the final few days of the hackathon. 

If I were to give any suggestions to the Coder One peeps, it's Docker. There has been expressed confusion about Docker from multiple people. Thankfully I didn't have to suffer as much since it was abstracted away but yeah. Luckily, I think they're already working on a better solution, so that's cool! Depending on the time of game, perhaps the hackathon duration could also be extended. This wouldn't be so much a direct improvement as much as a change, but it might be a welcome feature for those that don't have a lot of free time/day on their hands. Also the bots should theoretically become more complex (and hopefully fun to watch!) - unless there's an obvious stale meta but that's a different story.

Overall, good work Coder One people!
Shoutout to Valgrowth's comeback vs Wigglyblob (the team of Jigglybluff) in the grand finals. Wild games. Quite unfortunate for Wiggly, bit it is what it is.

# Conclusion 
Due to computation resource issues, we switched from vm-bot to algo-bot before Qualifiers, which luckily wasn't that much worse than our vm-bot since I had kept on working on it. Then, we continued upgrading the bot, adding in better pathfinding + hazard avoidance as well as better killable detection (+ a tiny amount of fire-zone code) before handing it in to playoffs. Still lost, but we held our ground in the battles, consistently making it to endgames of 1800-2100 ticks before eventually dying out.

This was definitely a fun experience, and I'll 100% do it again. The sheer amount I learnt from my team alone made this worthwhile even if we hadn't gone through qualifiers.

Next time, I'm most likely going to heavily invest in an RL bot and *potentially* play solo, just to see how different that is for a change. Trying new things is always beneficial for learning. And also, I'd like to see how much I was relying on my team here. I know they definitely helped out a **lot**, but I think going solo will have its own host of challenges and force me to either rise to the occasion / fail miserably. Both are fine; you learn either way.


Next time, I'm getting at least top 8 :).

Cya!

<br>
<br>
<br>
<br>
{% include embed.html url="https://www.youtube.com/embed/XJo87YbiHUo" %}

<small>
Bonus: A video of me playing trying to beat the bot. I tried 5 different times to get a good video, but messed up 5 different ways. Got onestepped in one, but this one was just... Pitiful for me. Oof. Decided to cut my losses and just upload it. </small>

<small>
As of now, this is the site you go on to vs enemies when you're using the docker image https://app.gocoder.one/game.
If you have a replay json file, you can shove it in https://app.gocoder.one/replays.
</small>