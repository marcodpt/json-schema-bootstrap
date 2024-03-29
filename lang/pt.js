export default {
  errors: {
    type: s => `Deve ser do tipo específicado.`, 
    const: s => `Deve ser exatamente: ${s}`, 
    enum: s => `Deve ser uma das opções possíveis.`,
    multipleOf: s => `Deve ser múltiplo de: ${s}`,
    maximum: s => `Deve ser no máximo: ${s}`,
    exclusiveMaximum: s => `Deve ser menor que: ${s}`,
    minimum: s => `Deve ser no mínimo: ${s}`,
    exclusiveMinimum: s => `Deve ser maior que: ${s}`,
    maxLength: s => `Deve ter no máximo ${s} caractere${s != 1 ? 's' : ''}`,
    minLength: s => `Deve ter no mínimo ${s} caractere${s != 1 ? 's' : ''}`,
    pattern: s => `Deve possuir o padrão específicado.`,
    maxItems: s => `Deve ter no máximo ${s} ite${s != 1 ? 'ns' : 'm'}`,
    minItems: s => `Deve ter no mínimo ${s} ite${s != 1 ? 'ns' : 'm'}`,
    uniqueItems: s => `Os items devem ser únicos.`,
    maxProperties: s => `Deve ter no máximo ${s} propriedade${s != 1 ? 's' : ''}`,
    minProperties: s => `Deve ter no mínimo ${s} propriedade${s != 1 ? 's' : ''}`,
    required: s => `Propriedades obrigatórias estão ausentes.`,
    dependentRequired: s => `Propriedades obrigatórias para este contexto estão ausentes.`
  },
  translations: {
    label: 'Enviar',
    close: 'Fechar'
  }
}
