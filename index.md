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

Welcome to my new website! I talk about projects I've done, thoughts I've had and data I've collected.  {{ days_till_deadline }}.

