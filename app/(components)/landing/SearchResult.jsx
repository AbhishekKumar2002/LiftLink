import React from 'react'

const SearchResult = ({ result }) => {
  return (
    <div className='p-1 hover:bg-[#efefef] dark:hover:bg-slate-200 dark:hover:text-slate-800' onClick={(e)=>alert(`You clicked on ${result.name}`)}>
        {result.name}
    </div>
  )
}

export default SearchResult