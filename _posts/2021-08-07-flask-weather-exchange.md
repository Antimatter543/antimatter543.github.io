---
layout: post
title: "Flask Weather Data Exchange"
reviewed: 2021-08-07
tags: professional
publish: true
excerpt: "Flask website with encrypted login system, displaying data from BOM API. Made as my last school assignment."
---

# Summary
There's a register page, login page, and dashboard page - all working. You can register whatever you want (as long as it's valid), and the details will be stored in a database. Don't worry, the password is hashed with SHA256 so an attacker can't *immediately* just read your password and go 'Huh.'

![Image](/assets/random/flaskweather.png "Dashboard page")


Once you're in, the dashboard displays data from the Bureau of Meteorology's API (it's just a link that spouts a big json). You can actually zoom in and interact with the graphs which isn't shown in the video (thanks, plotly!). On the left, you can see the 'Raspberry Pi' data. Since our expectation of what the assignment was had to be changed 3 times, we didn't end up learning the Raspberry Pi. Instead, I simply randomised the pi data by basing the random range from the BOM data ± an error margin. 
🤷‍♂️.

Github repo: <https://github.com/Antimatter543/flask-weather-exchange>


Here's a 1-2 minute video that definitely wasn't on 1.15x speed to make it fit the criteria requirements.

{% include embed.html url="https://www.youtube.com/embed/BFlL4tBam1w" %}

All the code had to be self-taught, as previously done. Anyways, now I only have tests left. Woo!

I would've much rather had to design / create + implement a game, but, this was nice too! It's a bit of a pain that the code only accounts for maybe 3, total, out of 25 marks. Most of it is documentation. Oh, school system! 

As a side note, it wouldn't be too hard to make this into an app using Kotlin, right?