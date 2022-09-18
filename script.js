const drawing_space = document.getElementById('drawing_space');

//Treat each divs as individual pixels
//Add them to live node using getElementsBy... to get live node
function generatePixel(node, npx) {
    for(let i = 0; i < npx ; i++){
        let child_node = document.createElement('div');
        child_node.style.border = '1px solid black';
        child_node.setAttribute('onmousedown','return false');
        node.appendChild(child_node);
    }
}

//Assuming it has divs in it clear everything in it
function clearPixels(node){
  const child_nodes = node.childNodes;
  for(let j = child_nodes.length - 1; j >= 0; j--)
  {
    node.removeChild(child_nodes[j]);
  }
}

//npx by npx drawing space
//This is default
let drawing_color = 'black';
let drawing_border_color = '1px solid white';
function makeDrawingSpace(node, npx){
    if (npx > 1){
    let ncol = npx;
    let nrow = npx
      //Add the divs
      generatePixel(node, npx*npx);
      //Split the fucking divs using grids
      node.style.display = 'grid';
      node.style.gridTemplateColumns = '1fr '.repeat(ncol);
      node.style.gridTemplateRows = '1fr '.repeat(nrow);

      //Drawing this will draws the pixel
      //BUT you can't click then release on a pixel, you must click then
      //drag the mouse to draw 
      //Source: https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event
      let isDrawing = false;
      node.childNodes.forEach( (child_node) => {
        child_node.addEventListener("mousedown", (event) => {
          isDrawing = true;
        });
        child_node.addEventListener("mouseup", (event) => {
          isDrawing = false;
        });
        child_node.addEventListener("mousemove", (event) => {
          if(isDrawing){
            child_node.style.border = drawing_border_color;
            child_node.style.backgroundColor = drawing_color;
          } 
        });
        //Supporting mobile device
        child_node.addEventListener("touchstart", (event) => {
          isDrawing = true;
        });
        child_node.addEventListener("touchmove", (event) => {
          event.preventDefault();
          if(isDrawing){
            child_node.style.border = drawing_border_color;
            child_node.style.backgroundColor = drawing_color;
          }
        });
        child_node.addEventListener("touchend", (event) => {
          event.preventDefault();
          isDrawing = false;
        });
     });
    } else {
        return 'Number of pixel should be atleast 2 and not negative';
    }
}

//Update current drawing color
const current_color = document.getElementById('current-drawing-color');
current_color.style.padding = '10px 20px';

function updateColor(){
  current_color.style.backgroundColor = drawing_color;
  current_color.style.border = drawing_border_color;
}

//Clear function
function clearDrawingSpace(){
  drawing_space.childNodes.forEach( (child_node) => {
    child_node.style.backgroundColor = 'white';
    child_node.style.border = '1px solid black';
  });
}
const clear_button = document.getElementById('clear');
clear_button.addEventListener('click', clearDrawingSpace);

//Gay color function
function randomColor(){
  drawing_color = '#' + Math.floor(Math.random() * 65535).toString(16);
  drawing_border_color = '1px solid #' + Math.floor(Math.random() * 65535).toString(16);
  updateColor();
}
const random_color_button = document.getElementById('random-color');
random_color_button.addEventListener('click', randomColor);

//Default reset
function defaultColor(){
  drawing_color = 'black';
  drawing_border_color = '1px solid white';
  updateColor();
}

const default_color_button = document.getElementById('default-color');
default_color_button.addEventListener('click', defaultColor);
//Eraser
function eraser(){
  drawing_color = 'white';
  drawing_border_color = '1px solid black';
  updateColor();
}
const eraser_button = document.getElementById('eraser');
eraser_button.addEventListener('click', eraser);

//Grid size
const slide_grid_size = document.getElementById('slide-pixels');
const manual_grid_size = document.getElementById('manual-pixels');
const current_grid_size = document.getElementById('current-pixel');
slide_grid_size.addEventListener('change', (event) => {
  manual_grid_size.value = slide_grid_size.value;
  clearPixels(drawing_space);
  makeDrawingSpace(drawing_space, manual_grid_size.value);
  current_grid_size.textContent = `${manual_grid_size.value} x ${manual_grid_size.value}`;
});
manual_grid_size.addEventListener('change', (event) => {
  slide_grid_size.value = manual_grid_size.value;
  clearPixels(drawing_space);
  makeDrawingSpace(drawing_space, slide_grid_size.value);
  current_grid_size.textContent = `${manual_grid_size.value} x ${manual_grid_size.value}`;
});


//Color picker
const color_picker = document.getElementById('color-picker');
const border_color_picker = document.getElementById('border-color-picker');
drawing_color = color_picker.value;
drawing_border_color = '1px solid ' + border_color_picker.value;

color_picker.addEventListener('input', () => {
  drawing_color = color_picker.value;
  drawing_border_color = '1px solid ' + border_color_picker.value;
  updateColor();
})

border_color_picker.addEventListener('input', () => {
  drawing_color = color_picker.value;
  drawing_border_color = '1px solid ' + border_color_picker.value;
  updateColor();
});