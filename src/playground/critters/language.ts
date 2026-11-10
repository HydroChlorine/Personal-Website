/** Original, bounded teaching language. Does not execute JavaScript or course code. */
export type Action =
  | 'forward'
  | 'backward'
  | 'left'
  | 'right'
  | 'eat'
  | 'attack'
  | 'bud'
  | 'grow'
  | 'wait'
export type Expr =
  | { kind: 'number'; value: number }
  | { kind: 'sensor'; name: string; arg?: Expr }
  | { kind: 'binary'; op: string; left: Expr; right: Expr }
  | { kind: 'unary'; op: string; child: Expr }
export interface Rule {
  condition: Expr
  action: Action | 'set'
  slot?: Expr
  value?: Expr
}
export interface Program {
  source: string
  rules: Rule[]
}
export const actions: Action[] = [
  'forward',
  'backward',
  'left',
  'right',
  'eat',
  'attack',
  'bud',
  'grow',
  'wait',
]
const constants: Record<string, number> = {
  empty: 0,
  rock: 1,
  food: 2,
  friend: 3,
  enemy: 4,
  true: 1,
  false: 0,
}
const sensors = new Set([
  'energy',
  'size',
  'age',
  'ahead',
  'nearby',
  'random',
  'mem',
])
const precedence: Record<string, number> = {
  or: 1,
  and: 2,
  '=': 3,
  '!=': 3,
  '<': 3,
  '>': 3,
  '<=': 3,
  '>=': 3,
  '+': 4,
  '-': 4,
  '*': 5,
  '/': 5,
  mod: 5,
}

/** Parse a finite AST; caps prevent expensive or deeply nested user programs. */
export function parseProgram(source: string): Program {
  if (source.length > 8000)
    throw new Error('Keep the program below 8,000 characters.')
  const clean = source.replace(/\/\/[^\n]*/g, '')
  const tokens: string[] = []
  const pattern = /\s+|-->|:=|!=|<=|>=|[a-zA-Z_][\w]*|\d+|[=<>+*/();\[\]-]/gy
  let pos = 0
  while (pos < clean.length) {
    pattern.lastIndex = pos
    const match = pattern.exec(clean)
    if (!match)
      throw new Error(
        `Unexpected character near “${clean.slice(pos, pos + 15)}”.`,
      )
    if (match[0].trim()) tokens.push(match[0].toLowerCase())
    pos = pattern.lastIndex
  }
  if (tokens.length > 1800) throw new Error('This program has too many tokens.')
  let i = 0
  function expect(s: string) {
    if (tokens[i++] !== s) throw new Error(`Expected “${s}” near token ${i}.`)
  }
  function expression(min = 0, depth = 0): Expr {
    if (depth > 32)
      throw new Error('Expressions may be nested at most 32 levels.')
    const token = tokens[i++]
    let left: Expr
    if (token === '(') {
      left = expression(0, depth + 1)
      expect(')')
    } else if (token === '-' || token === 'not')
      left = { kind: 'unary', op: token, child: expression(6, depth + 1) }
    else if (token && /^\d+$/.test(token))
      left = { kind: 'number', value: Math.min(1000000, Number(token)) }
    else if (Object.hasOwn(constants, token))
      left = { kind: 'number', value: constants[token] }
    else if (sensors.has(token)) {
      let arg: Expr | undefined
      if (tokens[i] === '[') {
        i++
        arg = expression(0, depth + 1)
        expect(']')
      }
      if (['nearby', 'random', 'mem'].includes(token) && !arg)
        throw new Error(`${token} needs an argument in brackets.`)
      left = { kind: 'sensor', name: token, arg }
    } else throw new Error(`Unknown value “${token ?? 'end of program'}”.`)
    while (
      Object.hasOwn(precedence, tokens[i]) &&
      precedence[tokens[i]] >= min
    ) {
      const op = tokens[i++]
      left = {
        kind: 'binary',
        op,
        left,
        right: expression(precedence[op] + 1, depth + 1),
      }
    }
    return left
  }
  const rules: Rule[] = []
  while (i < tokens.length) {
    if (rules.length >= 64) throw new Error('Use at most 64 rules.')
    const condition = expression()
    expect('-->')
    const action = tokens[i++]
    if (action === 'mem') {
      expect('[')
      const slot = expression()
      expect(']')
      expect(':=')
      const value = expression()
      rules.push({ condition, action: 'set', slot, value })
    } else if (actions.includes(action as Action))
      rules.push({ condition, action: action as Action })
    else throw new Error(`Unknown action “${action ?? ''}”.`)
    expect(';')
  }
  if (!rules.length)
    throw new Error('Add at least one condition --> action; rule.')
  return { source, rules }
}

export type Sense = (name: string, arg?: number) => number
/** Finite arithmetic and lazy Boolean evaluation keep programs safe and predictable. */
export function evaluate(e: Expr, sense: Sense): number {
  if (e.kind === 'number') return e.value
  if (e.kind === 'sensor')
    return sense(e.name, e.arg ? evaluate(e.arg, sense) : undefined)
  if (e.kind === 'unary') {
    const n = evaluate(e.child, sense)
    return e.op === 'not' ? Number(!n) : -n
  }
  const a = evaluate(e.left, sense)
  if (e.op === 'and' && !a) return 0
  if (e.op === 'or' && a) return 1
  const b = evaluate(e.right, sense)
  switch (e.op) {
    case 'and':
      return Number(Boolean(a && b))
    case 'or':
      return Number(Boolean(a || b))
    case '=':
      return Number(a === b)
    case '!=':
      return Number(a !== b)
    case '<':
      return Number(a < b)
    case '>':
      return Number(a > b)
    case '<=':
      return Number(a <= b)
    case '>=':
      return Number(a >= b)
    case '+':
      return Math.max(-1e6, Math.min(1e6, a + b))
    case '-':
      return Math.max(-1e6, Math.min(1e6, a - b))
    case '*':
      return Math.max(-1e6, Math.min(1e6, a * b))
    case '/':
      return b ? Math.trunc(a / b) : 0
    case 'mod':
      return b ? a % b : 0
    default:
      return 0
  }
}
export const presets = {
  Forager: `// First matching action wins.\nenergy > 780 --> bud;\nahead = food --> eat;\nahead = empty --> forward;\nrandom[2] = 0 --> left;\ntrue --> right;`,
  Defender: `energy > 850 --> bud;\nahead = enemy --> attack;\nahead = food --> eat;\nenergy > 700 and size < 3 --> grow;\nahead = empty --> forward;\ntrue --> left;`,
  Wanderer: `energy > 700 --> bud;\nahead = food --> eat;\nrandom[4] = 0 --> right;\nahead = empty --> forward;\ntrue --> left;`,
} as const
