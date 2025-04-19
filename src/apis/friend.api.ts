import http from 'src/utils/http'
import { FriendListResponse } from 'src/types/user.type'
import { FriendTListConfig } from 'src/types/product.type'

const friendApi = {
    getFriendList(queryConfig: FriendTListConfig,phone: string) {
        return http.get<FriendListResponse>(`/api/user/friend/${phone}`, {params: queryConfig})
      }
}
  
  export default friendApi