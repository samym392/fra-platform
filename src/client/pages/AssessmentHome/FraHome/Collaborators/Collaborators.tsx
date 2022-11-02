import React from 'react'

import { Users } from '@meta/user'

import { useUsers } from '@client/store/ui/userManagement/hooks'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
import InviteUserForm from '@client/components/InviteUserForm'
import UserList from '@client/components/UserList'

const Collaborators: React.FC = () => {
  const user = useUser()
  const users = useUsers()
  const countryIso = useCountryIso()

  return (
    <>
      {Users.getRolesAllowedToEdit({ user, countryIso }).length > 0 && <InviteUserForm />}
      <UserList users={users} />
    </>
  )
}

export default Collaborators
