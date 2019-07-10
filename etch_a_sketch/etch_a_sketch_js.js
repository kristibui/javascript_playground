const body = document.querySelector('#container');

// Initializes the grid
function build_grid(first_iteration, value) {

  let i;
  let grid_sq;
  let grid_coord = value * value;

  for (i = 0; i < grid_coord; i++) {

    // Create each square 'div'
    grid_sq = document.createElement('div');
    grid_sq.classList.add('grid');
    grid_sq.setAttribute("id", "grid_" + i);

    // If grid has been reset, then modify the css to adjust for different grid
    // sizes
    if (!first_iteration) {
      grid_sq.style.flex = '0 0 calc(100% * (1/' + value +'))';
      grid_sq.style.flex = 'calc(100% * (1/' + value +'))';

    }

    body.appendChild(grid_sq);
  }

  grid_hover();
}

// Grid divs change color when mouse passes over them - add event listeners to
// each grid element
function grid_hover() {

  // Get list of grid div elements
  let grid_list = document.querySelectorAll('.grid');

  // Iterate through each button, add hover event listener
  grid_list.forEach((grid) => {

    // Hover listener
    grid.addEventListener('mouseover', (event) => {

        grid.style.backgroundColor = 'powderblue';
    });
  });
}

// Button Event listener
let button = document.querySelector('#reset_button');
button.addEventListener('click', () => {
  value = prompt('How many squares per side for your new grid?', '16');
  reset_grid(value);
});

// Button to clear the grid and reset the grid
// Default value is 16
function reset_grid(value) {

  // Default value: 16
  if (value == '') {
    value = 16;
  }

  // Delete old grid
  let old_grid_list = body;
  while(old_grid_list.hasChildNodes()) {
    old_grid_list.removeChild(old_grid_list.firstChild);
  }

  build_grid(false, value);
}

// ----- Program Execution ------
build_grid(true, 16); // initial dimensions for 16 x 16 grid coordinates
