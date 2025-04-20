import http from 'src/utils/http'
import { FriendListResponse, FriendRequest } from 'src/types/user.type'
import { FriendTListConfig } from 'src/types/product.type'

const friendApi = {
    getFriendList(queryConfig: FriendTListConfig,phone: string) {
        return http.get<FriendListResponse>(`/api/user/friend/${phone}`, {params: queryConfig})
      },
      sendFriendRequest(body: FriendRequest) {
        return http.post<string>('/api/friend/friend', body)
      },
      unfriend(body: FriendRequest) {
        return http.post<string>('/api/friend/unfriend', body)
      }
}
  
  export default friendApi