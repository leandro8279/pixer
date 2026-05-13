import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { SUPPORTED_LANGUAGES } from './i18n'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const { t, i18n } = useTranslation('common')

  return (
    <>
      {/* Language switcher */}
      <div style={{
        position: 'fixed', top: 12, right: 16,
        display: 'flex', gap: 6, zIndex: 100, flexWrap: 'wrap', maxWidth: 320,
      }}>
        {SUPPORTED_LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              border: '1px solid #ccc',
              background: i18n.language === lang.code ? '#646cff' : 'transparent',
              color: i18n.language === lang.code ? '#fff' : 'inherit',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 12,
            }}
          >
            {lang.label}
          </button>
        ))}
      </div>

      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>{t('admin-login-title')}</h1>
          <p>{t('text-read-more')}</p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          {t('join-button')} ({count})
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>{t('nav-menu-faq')}</h2>
          <p>{t('nav-menu-track-order')}</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                {t('text-read-more')}
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                {t('nav-menu-offer')}
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>{t('nav-menu-contact')}</h2>
          <p>{t('auth-menu-profile')}</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
