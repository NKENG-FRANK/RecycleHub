import React from 'react'
import './Tutorials.css';

const Tutorial = () => {
  const suggestion=[
  {id: 1, name: 'Organic'},
  {id: 2, name: 'Recycle'},
  {id: 3, name: 'Wastedisposal'},
  {id: 4, name: 'others'},
];


  return (
    <>
    <div className="Tutorial">
      <aside className='left-panel'>
        <section className=''>
          <h1>Search Tutorial</h1>
          <input type="text" placeholder='input category'/>
          <div className="suggestion">
            {suggestion.map((suggest)=>(
              <div className="choice" key={suggest.id}>
                {suggest.name}
              </div>
            ))}
        </div>
        </section>
        <hr  className='divider'/>
        <section className='Add-tutorial'>
          
          <form action="">
            <h2>Add Tutorial</h2>
            <input type="text" placeholder='Title' className='Title'/>
            <input type="text" className="decryption" />
            <input type="url" />
            <button className='file'>upload file</button>
            <button className='submit' type='submit'>Submit</button>
          </form>
          
        </section>
      </aside>

      <main></main>
    </div>
    </>
  )
}

export default Tutorial