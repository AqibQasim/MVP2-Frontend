import AdminCandidatesClientsHiringTable from '@/components/AdminCandidatesClientsHiringTable';
import AdminCandidatesTable from '@/components/AdminCandidatesTable';
import { fetchCandidatesJobStatus, fetchRecommendedCandidates } from '@/lib/data-service';
import React from 'react'

async function Page() {
    const { data: candidateJobStatus, error } = await fetchCandidatesJobStatus('hired-and-trial');
    if (error) {
        return (
            <div>
                {error}
            </div>
        )
    };
  
    return <AdminCandidatesClientsHiringTable candidateJobStatus={candidateJobStatus} />;
}

export default Page