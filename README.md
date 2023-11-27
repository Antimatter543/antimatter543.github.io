My Jekyll site, woohoo! This is the 3rd website design I've had, but hopefully I'll like it enough for it to stay. If I get around to it (lol), I'll write up how this website works in this readme. Using Utterances instead of Disqus. Why? Well, a friend showed me a thirst clickbait scam ad (came from Disqus ads!) on their phone when they went on my website. That's why. Was a bit awkward to see.

Side note: I highly recommend being exposed to at least *some* discrete maths in your lifetime -- sets, boolean logic, implies, basic proofs. It gives you an understanding of *precision*, and lets you understand how important definitions are. If you have different definitions, then, you can't undermine someone else's statements.

https://antimatter543.github.io/


To execute:
`jekyll serve` in console, or `bundle exec jekyll serve --port 5000`.

## Styling
Stying occurs and gets overridden in custom-styles.scss and custom-variables.scss.

#### Custom Specialties
Doing
```
<a href='' class='tooltip'> Test. <span> Hovering over test shows this magic text!! </span> </a>
```
makes the word 'Test.' hoverable, and upon hover you can see all that hidden text. Good for side tangents.

## Projects
Projects are stored in the _data/home.yml, and follow this format:
project_entries:
  - title: Project 1
    url: overview-post
    desc: This is an example project, configured in _data/home.yml

Later, I might have another frontmatter to link to a blog post if it exists, but for now I'll let it just go to github.
