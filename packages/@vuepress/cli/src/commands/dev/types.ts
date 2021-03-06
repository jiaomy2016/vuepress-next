/**
 * CLI options of `dev` command
 */
export interface DevCommandOptions {
  // app config
  port?: number
  host?: string
  temp?: string
  cache?: string
  debug?: boolean
  open?: boolean

  // cli only
  config?: string
  cleanCache?: boolean
  watch?: boolean
}
