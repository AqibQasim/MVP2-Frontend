import React from 'react'
import AdminCandidatesTable from '@/components/AdminCandidatesTable'
import { fetchCandidates } from '@/lib/data-service'

const page = async() => {

  const candidates = await fetchCandidates();

  return (
    <>
    <AdminCandidatesTable candidates={candidates}/>
    </>
  )
}

export default page