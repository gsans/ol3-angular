class: center, middle

# Angular — Integration with OpenLayers 3
<img src="https://pbs.twimg.com/profile_images/2149314222/square_400x400.png" height="100"> <img src="http://cdn1.iconfinder.com/data/icons/musthave/256/Add.png" height="25"> <img src="https://avatars3.githubusercontent.com/u/240579?v=3&s=400" height="100">

[Gerard Sans](https://twitter.com/gerardsans)

---

# Agenda

##1. Who Am I?
##2. Demo
##3. Integration
##4. More

---

# 1. Who Am I?

- **Gerard Sans**, BST Senior JavaScript Developer

  - CS Engineer (5 years degree) 
  - Former **C# .NET Developer**, doing mainly Web Development (overall +10 years) 
    - Worked for consultancies, end-clients and startups
  - Just recently switched to **full-time JavaScript/AngularJS Developer** (1 year)

- **AngularJS Community**
  - Started the [AngularJS Meetup Waterloo](https://www.facebook.com/angularjswaterloo) last August to help Josh and Ed.
    - New format. Hacking sessions (**looking for sponsors**)
  - Started blogging about JS/AngularJS at [Coderwall](https://coderwall.com/p/u/gsans) and later on [Medium](https://medium.com/@gerard.sans).

---

# 2. Demo

##[Demo](http://embed.plnkr.co/u6IR40otaEXiUeJYp9BX/preview)

---

# 3. Integration

##- **Map to Angular (View)**
    - via `$timeout(function(){...})`

##- **Angular (View) to Map**
    - via message bus `$broadcast` and `$on`
    - via `ng-click`

---

# 4. More

- Extending default Angular single search term to accept multiple terms.
- Custom SVG markers, with custom styles and adding a drop-shadow effect.
- Custom OpenLayers Button Control, zoom to extent.
- Using OpenLayers smooth animations.
- Styling: using UI Bootstrap and Open Sans Google font.

Check out this [post](https://medium.com/angularjs-meetup-south-london/angular-integration-with-openlayers-3-5a6e8d29e635) for more details.

Contact me at `gerard.sans@gmail.com` if you want to collaborate or have any questions.

<style type="text/css">
  @import url(http://fonts.googleapis.com/css?family=Yanone+Kaffeesatz);
  @import url(http://fonts.googleapis.com/css?family=Open+Sans:400,600);
  @import url(http://fonts.googleapis.com/css?family=Ubuntu+Mono:400,700,400italic);
  
  body { font-family: 'Open Sans'; }
  h1, h2, h3 {
    font-family: 'Open Sans';
    font-weight: normal;
  }
  code {
    -moz-border-radius: 5px;
    -web-border-radius: 5px;
    background: #e7e8e2;
    border-radius: 5px;
  }
  .remark-code, .remark-inline-code { font-family: 'Ubuntu Mono'; }
  .remark-code-line-highlighted     { background-color: #373832; }
  
  a, a > code {
    color: #a33;
    background: #ffeaea;
    text-decoration: none;
  }
</style>
