export function generate_coordinates() {
  var coordinates = new Array()
  for (let i = 0; i < 100; i++){
    coordinates.push({x: Math.floor(Math.random() * (400 - 0) + 0), y: Math.floor(Math.random() * (400 - 0) + 0)})
  }
  return coordinates
}

export function draw_lines(){
  var coordinates = generate_coordinates()
  for (let i = 0; i < coordinates.length - 1; i++){
    line(coordinates[i].x, coordinates[i].y, coordinates[i+1].x, coordinates[i+1].y)
  }
}