import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
// import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Humanities Last Chance',

  projectId: 'nzyg33ca',
  dataset: 'production',

  plugins: [structureTool() /* , visionTool() */],

  schema: {
    types: schemaTypes,
  },
})

