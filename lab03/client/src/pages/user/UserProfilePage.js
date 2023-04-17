import React from 'react'
import UserProfileLayout from '../../components/user/userPofileSection/UserProfileLayout'

import {withAuth} from '../../withAuth'

const UserProfilePage = () => {
  return (
    <UserProfileLayout />
  )
}
 const UserProfilePageWithAuth = withAuth(UserProfilePage)

export { UserProfilePage,UserProfilePageWithAuth }


