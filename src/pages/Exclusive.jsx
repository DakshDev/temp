import React from 'react'
import Grower from './Exclusive/Grower'
import Guide from './Guide/Guide'
import Footer from '../components/Footer'


const Exclusive = ({ role }) => {
  const translate = role === 'grower' ? '0%' : '-50%'

  return (
    <main className="overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out overflow-hidden "
        style={{ transform: `translateX(${translate})`, width: '200%' }}
      >
        <section className="w-1/2 shrink-0 h-auto overflow-hidden">
          <Grower />
        </section>
      </div>
    </main>
  )
}

export default Exclusive