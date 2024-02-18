import fs from 'node:fs'
import yaml from 'js-yaml'

interface CoverConfig {
  fixedCover: string
  covers: string[]
}

const config = yaml.load(fs.readFileSync('src/covers.yml', 'utf8')) as Partial<CoverConfig>

export const cover = config
