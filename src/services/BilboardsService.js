import { AppState } from "../AppState"
import { Bilboard } from "../models/bilboard"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class BilboardService {
  async getBilboards() {
    const res = await api.get('api/ads')
    logger.log('ADS', res.data)
    AppState.bilboard = res.data.map(b => new Bilboard(b))
  }
}



export const bilboardService = new BilboardService()