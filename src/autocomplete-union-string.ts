/* eslint-disable @typescript-eslint/no-unused-vars */
type Unit = 'px' | 'em' | 'rem' | 'vh' | 'vw' | 'vmin' | 'vmax' | '%'

type Length = `${number}${Unit}`
// eslint-disable-next-line @typescript-eslint/ban-types
type Padding = 'small' | 'medium' | 'large' | 'none' | Length

function getPadding(padding: Padding): string {
  if (padding === 'small') return '12px'
  if (padding === 'medium') return '16px'
  if (padding === 'large') return '24px'
  return padding
}

getPadding('small')
getPadding('12vmin')

let padding: Padding
padding = 'small'
padding = 'medium'
padding = '34px'
