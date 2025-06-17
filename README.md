# Personal Portfolio Website

A modern portfolio website built with React.js for CS 601 Web Development course. This project showcases my skills as an AI/ML Engineer and Software Developer.

**Live Demo**: [https://6850c9bf6cd7d089bb28c1d7--animated-croissant-177628.netlify.app/](https://6850c9bf6cd7d089bb28c1d7--animated-croissant-177628.netlify.app/)

## Features

### Core Features
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between dark and light modes
- **Smooth Navigation**: Fixed navbar with smooth scrolling between sections
- **Interactive Elements**: Hover effects, animations, and transitions throughout

### Advanced Features
- **Animated Canvas Background**: Floating particles using HTML5 Canvas API
- **Drag & Drop Skills**: Reorder skills by dragging them
- **SVG Visualizations**: Animated radar chart showing skill proficiency
- **Project Gallery**: Images with hover effects showing project demos
- **Custom Cursor**: Interactive cursor effect on desktop

## Technologies Used

- React.js (Hooks, State Management)
- CSS3 (Grid, Flexbox, Custom Properties)
- HTML5 APIs (Canvas, SVG, Drag & Drop)
- JavaScript ES6+
- Netlify for deployment

## Project Structure

```
my-portfolio/
├── public/
│   ├── index.html      # Main HTML file
│   ├── profile.jpg     # Your profile picture
│   ├── 1.jpg          # Project 1 image
│   ├── 2.jpg          # Project 2 image
│   └── 3.jpg          # Project 3 image
├── src/
│   ├── index.js        # React entry point
│   ├── Portfolio.js    # Main component (all functionality)
│   └── App.css        # All styles
├── package.json       # Dependencies
└── README.md         # This file
```

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/gaganv007/my-portfolio
cd my-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm start
```

4. **Build for production**
```bash
npm run build
```

## Sections

1. **Main**: Introduction with animated code snippet
2. **About**: Personal information and skills radar chart
3. **Skills**: Technical skills with icons (drag to reorder!)
4. **Projects**: Featured projects with images and GitHub links
5. **Experience**: Work history timeline
6. **Education**: Academic background
7. **Contact**: Email, phone, and social links

## Customization

### Add Your Information
Edit these sections in `Portfolio.js`:
- `projects` array - Your projects
- `skillCategories` - Your skills
- `experiences` - Work history
- `education` - Academic background

### Change Colors
Edit CSS variables in `App.css`:
```css
:root {
  --primary-color: #64ffda;  /* Accent color */
  --bg-primary: #0a192f;     /* Background */
}
```

### Add Your Images
Place these in the `public` folder:
- `profile.jpg` - Your profile photo
- `1.jpg`, `2.jpg`, `3.jpg` - Project screenshots

## Design Inspiration

This portfolio was inspired by:
- **Brittany Chiang** - Clean navigation and color scheme
- **Soumyajit Behera** - Project cards layout
- **Matt Farley** - Simple, effective design

## Grade Considerations

### Requirements Met
- HTML, CSS, JavaScript, React, and DOM manipulation
- Fully responsive design
- Clean, well-commented code
- Successful deployment
- Complete documentation

### Extra Credit
- **CSS Grid & Flexbox**: No frameworks used
- **HTML5 APIs**: Canvas, SVG, and Drag & Drop
- **Enhanced Features**: Theme toggle, animations, interactive elements

## Contact

**Gagan Veginati**
- Email: gveginati@gmail.com
- LinkedIn: [linkedin.com/in/gagan-veginati](https://linkedin.com/in/gagan-veginati)
- GitHub: [github.com/gaganv007](https://github.com/gaganv007)

---

*Created for CS 601 Web Development - Professor Christian*