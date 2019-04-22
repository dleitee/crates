import React from 'react'

const App = () => (
  <>
    <nav>
      <ul>
        <li>
          <a href="/">{__('English')}</a>
        </li>
        <li>
          <a href="/pt">{__('Portuguese')}</a>
        </li>
        <li>
          <a href="/es">{__('Spanish')}</a>
        </li>
        <li>
          <a href="/cn">{__('Chinese')}</a>
        </li>
        <li>
          <a href="/cz">{__('Czech')}</a>
        </li>
      </ul>
    </nav>
  </>
)

export default App
