enum CardNumericValue {
  Ace = 1,
  Two,
  Three,
}

type Suit = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades'

type Rank =
  | 'Ace'
  | 'Two'
  | 'Three'
  | 'Four'
  | 'Five'
  | 'Six'
  | 'Seven'
  | 'Eight'
  | 'Nine'
  | 'Ten'
  | 'Jack'
  | 'Queen'
  | 'King'

type Card = `${Rank} of ${Suit}`

const validCard: Card = 'Three of Hearts'
const invalidCard: Card = 'Three of Heart'
