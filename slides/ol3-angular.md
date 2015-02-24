name: inverse
class: center, middle, inverse

# Angular — Integration with OpenLayers 3
<img src="https://pbs.twimg.com/profile_images/2149314222/square_400x400.png" height="100"> <img src="http://cdn1.iconfinder.com/data/icons/musthave/256/Add.png" height="25"> <img src="https://avatars3.githubusercontent.com/u/240579?v=3&s=400" height="100">

.footnote[[Gerard Sans](https://twitter.com/gerardsans)]

---

# Agenda

1. Who Am I?
2. Demo
3. Integration
4. More

---

# 1. Who Am I?

Gerard Sans, BST Senior JavaScript Developer

- CS Engineer (5 years degree) 
- Former C# .NET Developer, doing mainly Web Development (overall +10 years) 
  - Worked for consultancies, end-clients and startups
- Just recently switched to full-time JavaScript/AngularJS Developer (1 year)
- Started the AngularJS Meetup Waterloo last August to help Josh and Ed.
  - New format. Hacking sessions (looking for sponsors)
- Started blogging about JS/AngularJS at Coderwall and later on Medium.

---

# 2. Demo

[Demo](http://embed.plnkr.co/u6IR40otaEXiUeJYp9BX/preview)

---

# 3. Integration

- Map to Angular (View)
  - via `$timeout(function(){...})`

- Angular (View) to Map
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
  @import url(//fonts.googleapis.com/css?family=Droid+Serif);
  @import url(//fonts.googleapis.com/css?family=Yanone+Kaffeesatz);
  @import url(//fonts.googleapis.com/css?family=Ubuntu+Mono:400,700,400italic);

  body {
    font-family: 'Droid Serif';
  }
  h1, h2, h3 {
    font-family: 'Yanone Kaffeesatz';
    font-weight: 400;
    margin-bottom: 0;
  }
  .remark-slide-content h1 { font-size: 3em; }
  .remark-slide-content h2 { font-size: 2em; }
  .remark-slide-content h3 { font-size: 1.6em; }
  .footnote {
    position: absolute;
    bottom: 3em;
  }
  li p { line-height: 1.25em; }
  .red { color: #fa0000; }
  .large { font-size: 2em; }
  a, a > code {
    color: rgb(249, 38, 114);
    text-decoration: none;
  }
  code {
    -moz-border-radius: 5px;
    -web-border-radius: 5px;
    background: #e7e8e2;
    border-radius: 5px;
  }
  .remark-code, .remark-inline-code { font-family: 'Ubuntu Mono'; }
  .remark-code-line-highlighted     { background-color: #373832; }
  .pull-left {
    float: left;
    width: 47%;
  }
  .pull-right {
    float: right;
    width: 47%;
  }
  .pull-right ~ p {
    clear: both;
  }
  #slideshow .slide .content code {
    font-size: 0.8em;
  }
  #slideshow .slide .content pre code {
    font-size: 0.9em;
    padding: 15px;
  }
  .inverse {
    background: #272822;
    color: #777872;
    text-shadow: 0 0 20px #333;
  }
  .inverse h1, .inverse h2 {
    color: #f3f3f3;
    line-height: 0.8em;
  }

  /* Slide-specific styling */
  #slide-inverse .footnote {
    bottom: 12px;
    left: 20px;
  }
  #slide-how .slides {
    font-size: 0.9em;
    position: absolute;
    top:  151px;
    right: 140px;
  }
  #slide-how .slides h3 {
    margin-top: 0.2em;
  }
  #slide-how .slides .first, #slide-how .slides .second {
    padding: 1px 20px;
    height: 90px;
    width: 120px;
    -moz-box-shadow: 0 0 10px #777;
    -webkit-box-shadow: 0 0 10px #777;
    box-shadow: 0 0 10px #777;
  }
  #slide-how .slides .first {
    background: #fff;
    position: absolute;
    top: 20%;
    left: 20%;
    z-index: 1;
  }
  #slide-how .slides .second {
    position: relative;
    background: #fff;
    z-index: 0;
  }

  /* Two-column layout */
  .left-column {
    color: #777;
    width: 20%;
    height: 92%;
    float: left;
  }
    .left-column h2:last-of-type, .left-column h3:last-child {
      color: #000;
    }
  .right-column {
    width: 75%;
    float: right;
    padding-top: 1em;
  }
</style>
