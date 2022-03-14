import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class ProfilesService {

  async getProfileById(id) {
    const res = await api.get('api/profiles/' + id)
    logger.log('[profiles]', res)
    AppState.activeProfile = res.data
  }
  async editAccount(accountData) {
    const res = await api.put('/account', accountData)
    AppState.account = res.data

  }
}


export const profilesService = new ProfilesService()