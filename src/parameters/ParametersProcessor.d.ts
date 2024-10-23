export interface ParameterInputData<T> {
  errors: Array<string>
  data: T
}

export default interface ParametersProcessor {
  validate(inputData: Partial<ParameterInputData>): ParameterInputData
}
