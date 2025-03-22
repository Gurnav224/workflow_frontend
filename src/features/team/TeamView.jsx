import React from 'react'
import TeamForm from './TeamForm'
import TeamList from './TeamList'
import Sidebar from '../../components/Sidebar'

const TeamView = () => {
  return (
    <div className='flex'>
    <Sidebar/>
    <TeamForm/>
    <TeamList/>
    </div>
  )
}

export default TeamView
