// source: Matt Pocock post on linkedin
// only match keys that start with "on" and are in the HTMLElement interface
// the template literal `on${string}` serve as a filter
type Handlers = keyof HTMLElement & `on${string}`
type ExtractEventName<T extends string> = T extends `on${infer U}` ? U : never

// Example
type HandlersObj = {
  [key in Handlers]?: (
    event: DocumentEventMap[ExtractEventName<Handlers>],
  ) => void
}

const o: HandlersObj = { onclick: (e) => console.log(e) }
