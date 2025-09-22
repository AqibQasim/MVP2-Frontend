import React from 'react'
import Capsule from './Capsule'
import Skill from './Skill'


function Certifications({ ...props }) {
    console.log(props)
    return (
        <Capsule className='w-full h-auto flex !justify-start !py-10 !px-10'>
            <div className='w-full flex flex-col'>
                <div className='w-full flex justify-between'>
                    <div className='gap-x-5 flex'>
                    <div className='text-black'>{props?.title}</div>
                    </div>
                    <div className='flex gap-x-5'>
                        Issued On: <div>{props.start_date}</div>
                    </div>
                </div>

                <div className='flex !items-start flex-col flex-wrap gap-y-2 pt-5'>
                    Skills:
                    <div className='flex flex-wrap gap-x-5'>

                        {
                            props?.skills?.map((skill,index) => (
                                <Skill key={index?.toString()} className='!text-xs font-normal border flex flex-wrap' skill={skill} />
                            ))
                        }
                    </div>
                </div>

            </div>
        </Capsule>
    )
}

export default Certifications
