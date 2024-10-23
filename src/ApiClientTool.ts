import axios, { AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios'

import ApiClientUnavailableError from './exceptions/ApiClientUnavailableError'

export default class ApiClientTool {
  static async execRequest(options: AxiosRequestConfig) {
    let result: AxiosResponse

    try {
      result = await axios(options)
    } catch (error: unknown) {
      const errorResult = new Error(`Error on request, response.data: ${error}`)

      if (
        isAxiosError(error) &&
        error.response &&
        error.response?.status < 502
      ) {
        throw errorResult
      }

      throw new ApiClientUnavailableError()
    }

    return result.data
  }
}
