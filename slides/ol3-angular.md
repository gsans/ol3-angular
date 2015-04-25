class: center, middle

# Angular — Integration with OpenLayers 3
<img src="https://pbs.twimg.com/profile_images/2149314222/square_400x400.png" height="100"> <img src="http://cdn1.iconfinder.com/data/icons/musthave/256/Add.png" height="25"> <img src="https://avatars3.githubusercontent.com/u/240579?v=3&s=400" height="100">

[Gerard Sans](https://twitter.com/gerardsans)

---

# Agenda

###1. Who Am I?
###2. Demo
###3. Integration
###4. Extras
###5. Q&A

---

# 1. Who Am I?

.section[

- **Gerard Sans**, Senior JavaScript Developer
  - CS Engineer (5 years degree) 
  - Former **C# .NET Developer**, doing mainly Web Development (overall +10 years) 
    - Worked for consultancies, end-clients and startups (Spain, Germany, UK and Brazil)
  - Just recently switched to **full-time JavaScript/AngularJS Developer** (1 year)
  - Planning to get the [Google Developer Expert badge for AngularJS](https://developers.google.com/experts/become-an-expert) in 2015.

- **AngularJS Community**
  - Started the [AngularJS Meetup Waterloo](https://www.facebook.com/angularjswaterloo) last August to help Josh and Ed.
  - New format. Hacking sessions (**looking for sponsors**)
  - Idea to create the first **Angular Festival** (Panel, Submissions, Teams, Categories). [Google doc](https://docs.google.com/document/d/1kcbcCOiLmcKuvyoocYqTStsC5_kMzeq4IKUlfqHPuW0/edit?usp=sharing)
      - Help me make it happen! =) 
  - Started blogging about JS/AngularJS at [Coderwall](https://coderwall.com/p/u/gsans) and later on [Medium](https://medium.com/@gerard.sans).

]

---

# 2. Demo

- Anybody with experience with OpenLayers 3? Maps?
- How about your experience with Angular? new, 3m, 6m, +1y?

##[Demo](http://plnkr.co/edit/DHRLO6T89Wn92Dt1KNZT?p=preview)

---

# 3. Integration (1/2)

- **Architecture**
  - First Level: **Model** Markers/Coordinates + **View** (map, search/details tabs) +  **Controller**
     - **View** uses *directives*, *expressions* and *filters*
  - Second Level: **ol3 library**, **Map Service**, **Filters** (multiple, highlight)
  - Communication is done using **events** (*event handlers*)

- **Map to Angular (View)**
  - via `$timeout(function(){...})`

- **Angular (View) to Map**
  - via message bus `$broadcast` and `$on`
  - via `ng-click`

---

# 3. Integration (2/2)

- **Angular Providers Overview**
  - ngMdIcons (Angular Material Icons), ui.bootstrap, ngSanitize

- **Angular Directives Overview**
  - ng-app, ng-controller, ng-show, ng-click, ng-model, ng-model-options, ng-repeat 
  - ng-md-icon (ngMdIcons)
  - ng-bind-html ($sce, Strict Contextual Escaping, privileged context)

---

# 4. Extras

- Extending default Angular single search term to accept multiple terms.
- Custom SVG markers, with custom styles and adding a drop-shadow effect.
  - [Angular Material Icons with custom fill-color and size](http://klarsys.github.io/angular-material-icons/). 
  - Includes optional [SVG Morpheus](http://alexk111.github.io/SVG-Morpheus/).    
- Custom OpenLayers Button Control, zoom to extent.
- Using OpenLayers smooth animations.
- Styling: using [UI Bootstrap](http://angular-ui.github.io/bootstrap/) and Open Sans Google font.

- Links:
  - Swiss Confederation geo.admin.ch  (OpenLayers 3 + Angular 1.3.x). [live](http://map.geo.admin.ch/) | [github](https://github.com/geoadmin/mf-geoadmin3)

---

# 5. Q&A

- Check out this [post](https://medium.com/angularjs-meetup-south-london/angular-integration-with-openlayers-3-5a6e8d29e635) for more in-depth details.

- You can contact me at `gerard.sans@gmail.com` if you want to collaborate or have any questions.

# Thank you!

<style type="text/css">
  @import url(http://fonts.googleapis.com/css?family=Yanone+Kaffeesatz);
  @import url(http://fonts.googleapis.com/css?family=Open+Sans:400,600);
  @import url(http://fonts.googleapis.com/css?family=Ubuntu+Mono:400,700,400italic);
  
  body { xfont-family: 'Open Sans'; }
  h1, h2, h3 {
    xfont-family: 'Open Sans';
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
  
  .section {
    font-size: 18px;
  }
  
  a, a > code {
    color: #a33;
    background: #ffeaea;
    text-decoration: none;
  }
</style>
