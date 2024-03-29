export default {
  errors: {
    type: s => `Must be of the specified type.`, 
    const: s => `Must be exactly: ${s}`, 
    enum: s => `Must be one of the possible options.`,
    multipleOf: s => `Must be multiple of: ${s}`,
    maximum: s => `Must be at most: ${s}`,
    exclusiveMaximum: s => `Must be less than: ${s}`,
    minimum: s => `Must be at least: ${s}`,
    exclusiveMinimum: s => `Must be greater than: ${s}`,
    maxLength: s => `Must be a maximum of ${s} character${s != 1 ? 's' : ''}`,
    minLength: s => `Must be a minimum of ${s} character${s != 1 ? 's' : ''}`,
    pattern: s => `Must have the specified pattern.`,
    maxItems: s => `Must have at most ${s} item${s != 1 ? 's' : ''}`,
    minItems: s => `Must have at least ${s} item${s != 1 ? 's' : ''}`,
    uniqueItems: s => `Items must be unique.`,
    maxProperties: s => `Must have at most ${s} propert${s != 1 ? 'ies' : 'y'}`,
    minProperties: s => `Must have at least ${s} propert${s != 1 ? 'ies' : 'y'}`,
    required: s => `Mandatory properties are missing.`,
    dependentRequired: s => `Mandatory properties for this context are missing.`
  },
  translations: {
    label: 'Submit',
    close: 'Close'
  }
}
