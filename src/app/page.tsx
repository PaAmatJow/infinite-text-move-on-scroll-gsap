'use client'

import Image from 'next/image'
import gsap from 'gsap'
import {useEffect, useRef} from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Home() {
  const firstText = useRef(null)
  const secondText = useRef(null)
  const slider = useRef(null)
  let xPercent = 0;
  let direction = -1;

useEffect(() => {
  gsap.registerPlugin(ScrollTrigger)
  requestAnimationFrame(animation)

  gsap.to(slider.current, {
    scrollTrigger: {
      trigger: document.documentElement,
      start: 0,
      end: window.innerHeight,
      scrub: true,
      onUpdate: e => direction = e.direction * -1
    },
    x: '-=300px',
  })
},[])

const animation = () => {
  if(xPercent <= -100) {
    xPercent = 0
  }
  if(xPercent > 0) {
    xPercent = -100
  }
  gsap.set(firstText.current, {xPercent: xPercent})
  gsap.set(secondText.current, {xPercent: xPercent})
  xPercent += 0.1 * direction
  requestAnimationFrame(animation)
}

  return (
		<main className='relative flex h-screen mb-[100vh] overflow-hidden'>
			<Image
				src='/images/shadow.jpg'
				alt='sung jin-woo'
				priority={true}
				fill={true}
				className='object-cover brightness-75'
			/>

			{/* slider */}
			<div className='absolute top-[calc(100vh-300px)]'>
				<div ref={slider} className='relative whitespace-nowrap'>
					<p ref={firstText} className='m-0 text-white text-[200px] font-medium pr-[50px]'>
						Shadow Monarch -
					</p>
					<p
						ref={secondText}
						className='absolute top-0 left-[100%] m-0 text-white text-[200px] font-medium pr-[50px]'
					>
						Shadow Monarch -
					</p>
				</div>
			</div>
		</main>
	);
}
