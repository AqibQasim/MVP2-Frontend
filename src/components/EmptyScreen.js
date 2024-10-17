import Image from 'next/image'
import React from 'react'

function EmptyScreen({className}) {
    return (
        <div className={`${className} flex flex-col justify-center items-center flex-grow gap-8 rounded-4xl bg-neutral-white px-8 py-10`}>
            <div className='justify-center flex flex-col items-center'>
                <Image src="/empty_screen.svg" height={200} width={200} alt="Card icon" />
                <div className='text-black font-bold'>No Data Available</div>
                <div className='text-black'>Get started by adding your first item.</div>
            </div>
        </div>
    )
}

export default EmptyScreen