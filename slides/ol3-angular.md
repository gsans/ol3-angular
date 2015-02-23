class: center, middle

# Angular — Integration with OpenLayers 3
<img src="https://avatars3.githubusercontent.com/u/240579?v=3&s=400" height="100"> <img src="http://cdn1.iconfinder.com/data/icons/musthave/256/Add.png" height="25"> <img src="https://pbs.twimg.com/profile_images/2149314222/square_400x400.png" height="100">
Gerard Sans

---

# Agenda

1. Who Am I?
2. Demo
3. Integration

---

# 1. Who Am I?

Gerard Sans, BST Senior JavaScript Developer

- CS Engineer (5 years) 
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
  - via ng-click