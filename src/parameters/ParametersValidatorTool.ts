/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
import Joi from 'joi'
import ErrorParameter from './ErrorParameter'

export default class ParametersValidatorTool {
  private static value: string | undefined

  private static errorMessage: ErrorParameter

  private static errors: Array<string>

  private static optional: boolean

  private static valid: boolean

  static validate(
    value: string | number | undefined,
    errorMessage: ErrorParameter,
    errors: Array<string>
  ) {
    this.value = value ? value.toString() : undefined
    this.errorMessage = errorMessage
    this.errors = errors
    this.optional = false
    this.valid = true

    return this
  }

  static isOptional() {
    this.optional = true

    return this
  }

  static isString(
    minLength: number | undefined = undefined,
    maxLength: number | undefined = undefined,
    notAllowedValues: Array<string> | undefined = undefined
  ) {
    let schema = {}

    if (typeof minLength === 'undefined' && typeof maxLength === 'undefined') {
      schema = Joi.string().allow('')
    } else if (minLength === 0) {
      schema = Joi.string()
        .allow('')
        .min(minLength)
        .max(maxLength as number)
    } else {
      schema = Joi.string()
        .min(minLength as number)
        .max(maxLength as number)
    }

    this.valid = validation(
      schema,
      this.optional,
      this.value,
      this.errors,
      this.errorMessage
    )

    if (notAllowedValues && !Array.isArray(notAllowedValues)) {
      throw new Error('notAllowedValues must be an array')
    }

    if (
      this.value &&
      Array.isArray(notAllowedValues) &&
      notAllowedValues.indexOf(this.value) > -1
    ) {
      this.errorMessage.invalid && this.errors.push(this.errorMessage.invalid)
    }

    return this
  }
}

const checkIfINullOrUndefined = (value: string | undefined) =>
  value === null || typeof value === 'undefined'

const verifyNullOrUndefined = (
  optional: boolean,
  value: string | undefined,
  errors: Array<string>,
  errorMessage: ErrorParameter
) => {
  const isNullOrUndefined = checkIfINullOrUndefined(value)

  if (optional && isNullOrUndefined)
    return { isNullOrUndefined: true, valid: false }

  if (!isNullOrUndefined) return { isNullOrUndefined: false, valid: true }

  errorMessage.required && errors.push(errorMessage.required)

  return { isNullOrUndefined: true, valid: false }
}

const validation = (
  schema: any,
  optional: boolean,
  value: string | undefined,
  errors: Array<string>,
  errorMessage: ErrorParameter
) => {
  const { isNullOrUndefined, valid } = verifyNullOrUndefined(
    optional,
    value,
    errors,
    errorMessage
  )

  if (isNullOrUndefined) return valid

  if (!schema.validate(value).error) return valid

  errorMessage.invalid && errors.push(errorMessage.invalid)

  return false
}
