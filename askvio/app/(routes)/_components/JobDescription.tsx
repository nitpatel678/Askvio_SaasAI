import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

function JobDescription({ onHandleInputChange } : any) {

  return (
    <div className='border rounded-2xl p-10'>
      <div>
        <label>Job Title</label>
        <Input placeholder='Ex. Mern Stack Developer' onChange={(e) => onHandleInputChange('jobTitle', e.target.value)} />
      </div>
      <div className='mt-4'>
        <label>Job Description</label>
        <Textarea className='h-[200px]' placeholder='Enter your job description' onChange={(e) => onHandleInputChange('jobDescription', e.target.value)} />
      </div>
    </div>
  )
}

export default JobDescription