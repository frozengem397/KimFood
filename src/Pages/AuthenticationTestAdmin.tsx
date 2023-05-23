import React from 'react'
import { withAdminAuth } from '../HOC';

function AuthenticationTestAdmin() {
  return (
    <div>Pages for Admin</div>
  )
}

export default withAdminAuth(AuthenticationTestAdmin);