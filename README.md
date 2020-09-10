# Coding-Quiz

This is a webpage made in Html, CSS and Javascript. The coding quiz application provides users with a timed quiz asking coding-related questions. As questions are answered correctly, time is added to the timer, while incorrect answers subtract time from the timer. The final score is calculated as the number of correct answers multiplied by 2, added to the time remaining when the quiz ended. This score is then stored on the High Scores section using client-side local storage.
​
## Contents
<p>
The app is composed of 1 page, index.html. It includes a javascript file sciprt.js, which provides the functionality for the quiz and the array containing the quiz questions and answers. Page styling is a mixed solution using Bootstrap and a CSS styles sheet, style.css.
</p>

## Objective
<p>
The goal in this project was to use javascript to produce a timed quiz on coding questions that stores high scores. It needed to involve a start button which triggered the quiz, a timer, questions and dynamic feedback in response to answers. Once the game is over (whether from answering all the questions or running out of time), the user needed to be able to save their name/initals and score.
</p>

## Built With
​
* [VScode](https://code.visualstudio.com/) - The editor of choice
* [Git for Windows](https://gitforwindows.org/) - Brings the full feature set of Git SCM to Windows
​
## Summary of project
In this assignment, we were tasked to create a timed and scored quiz game. I decided to also make sure mine was a responsive design that would work on multiple viewport sizes.

The main challenges I faced were ensuring that all the elements and functionality could be included using a single html file - this meant relying almost entirely on javascript to perform my dynamic content changes, including creating, appending, showing and hiding elements.

I used Bootstrap to style the app as this gave me a passable aesthetic while not consuming a lot of time or effort.

I also intended on using some FontAwesome icons, but was not able to incorporate these satisfactorily so I left them out.

## Screenshots

![Quiz Home Page](https://i.imgur.com/W6Ss8pi.jpg)

![Quiz Questions](https://i.imgur.com/aWpeVls.jpg)

![Quiz Finished](https://i.imgur.com/4wV0W9V.jpg)

![Quiz High Scores](https://i.imgur.com/g83P5iY.jpg)

## Licence
​
No licence was required for this project.
​
## Link to the site
<a href="https://epanastatis2020.github.io/Coding-Quiz/">Please visit the site on GitHub Pages</a>

## Acknowledgements

My mentor John S was instrumental in helping me resolve some bugs, especially around jQuery functions which weren't firing properly. Thanks John!

James D helped me work out some of the local storage and timer functionality. Thanks James! 

## Authors
​
* **CON ANGELAKIS** - 
github.com/Epanastatis2020
con.angelakis@gmail.com