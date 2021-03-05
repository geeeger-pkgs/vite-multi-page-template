import MyDirective, { name as MyDirectiveName } from './custom'

const config: {
  [key: string]: any
} = {
  [MyDirectiveName]: MyDirective
}

export function apply(app: any) {
  Object.keys(config).forEach((name) => {
    app.directive(name, config[name])
  })
}
