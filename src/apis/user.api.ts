import { User } from 'src/types/user.type'
import { SuccessResponse, changePassword } from 'src/types/utils.type'
import http from 'src/utils/http'

interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  newPassword?: string
}

const userApi = {
  getProfile(phone: string) {
    return http.get<SuccessResponse<User>>(`/api/user/profile/${phone}`)
  },
  updateProfile(phone: string, body: BodyUpdateProfile) {
    return http.put<SuccessResponse<User>>(`/api/user/profile/${phone}`, body)
  },
  changepassword(body: changePassword, phone: string) {
    return http.patch<String>(`/api/user/profile/${phone}/password`, body);
  }
}

export default userApi
