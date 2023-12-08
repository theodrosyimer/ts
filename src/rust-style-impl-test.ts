interface BoxDimensions {
  width: number
  height: number
  depth: number
}

type BoxColor = 'red' | 'brown'

interface BoxInt {
  weight: number
  dimensions: BoxDimensions
  color: BoxColor
}

interface BoxImpl {
  print: () => void
}

type Box = BoxInt & BoxImpl

const box: Box = {
  color: 'brown',
  dimensions: {
    depth: 15,
    height: 20,
    width: 20,
  },
  weight: 800,
  print() {
    return {
      dimensions: this.dimensions,
      color: this.color,
      weight: this.weight,
    }
  },
}

box.print() /*?*/
box.color = 'red' /*?*/
box.print() /*?*/
