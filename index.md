---
#
# By default, content added below the "---" mark will appear in the home page
# between the top bar and the list of recent posts.
# To change the home page layout, edit the _layouts/home.html file.
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
#
layout: home
title: Home
---
## Hey! 👋

{% assign target_date = '2036-11-25' | date: '%s' %}
{% assign current_date = 'now' | date: '%s' %}
{% assign seconds_diff = target_date | minus: current_date %}
{% assign days_till_deadline = seconds_diff | divided_by: 86400 | plus: 1 %}

Welcome to my new website! I talk about projects I've done, thoughts I've had and data I've collected.   <span id="countdown"></span>

<!-- Script for countdown timer, that's it. -->
<script>
    document.addEventListener("DOMContentLoaded", function() {
        // Set the date we're counting down to
        const countDownDate = new Date("2036-11-25T00:00:00").getTime();

        // Update the countdown every 1 second
        const countdownfunction = setInterval(function() {
            // Get today's date and time
            const now = new Date().getTime();
            
            // Find the distance between now and the count down date
            const distance = countDownDate - now;
            
            // Time calculations for days
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            
            // Display the result in the element with id="countdown"
            document.getElementById("countdown").innerHTML = days;
            
            // If the countdown is finished, write some text
            if (distance < 0) {
                clearInterval(countdownfunction);
                document.getElementById("countdown").innerHTML = "EXPIRED";
            }
        }, 1000);
    });
</script>

