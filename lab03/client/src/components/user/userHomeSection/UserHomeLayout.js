import React from 'react'
import DataFetchLayout from './dataFetchSection/DataFetchLayout'
import FooterLayout from './footerSection/FooterLayout'
import FeatureLayout from './keyFeatureSection/FeatureLayout'
import NavBarLayout from './navbarSection/NavBarLayout'
import StarterLayout from './starterSection/StarterLayout'
import TitleSectionLayout from './titleSection/TitleSectionLayout'

export default function UserHomeLayout() {
  return (
    <>
    <header className="fixed w-full">
      <NavBarLayout />
    </header>
     <section className="bg-white dark:bg-gray-900">
      <StarterLayout />
     </section>
     <section className="bg-white dark:bg-gray-900">
      <TitleSectionLayout/>
     </section>
     <section className="bg-gray-50 dark:bg-gray-800">
      <FeatureLayout />
     </section>
     <section className="bg-white dark:bg-gray-900">
      <DataFetchLayout />
     </section>
     <footer className="bg-white  dark:bg-gray-800">
      <FooterLayout />
     </footer>
     </>
  )
}
