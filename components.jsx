// SI Accesorios — shared components & icons

const { useState, useEffect, useMemo, useRef } = React;

const fmt = (n) => '$' + n.toLocaleString('es-MX') + ' MXN';
const priceLabel = (p, lang) => p == null ? DATA.t[lang].product_quote_price : fmt(p);

const Icons = {
  wheel: (s = 28) => (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="16" cy="16" r="13" /><circle cx="16" cy="16" r="4.5" />
      <circle cx="16" cy="7" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="25" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="7" cy="16" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="25" cy="16" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  jack: (s = 28) => (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M5 22 L16 10 L27 22" /><line x1="5" y1="22" x2="27" y2="22" />
      <line x1="16" y1="10" x2="16" y2="22" /><line x1="10" y1="16" x2="22" y2="16" />
    </svg>
  ),
  handle: (s = 28) => (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M5 11 h14 a3 3 0 0 1 3 3 v3" /><circle cx="5" cy="11" r="2.4" />
      <rect x="20" y="17" width="6" height="9" rx="1" />
    </svg>
  ),
  socket: (s = 28) => (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
      <polygon points="16,5 25,10 25,20 16,25 7,20 7,10" /><circle cx="16" cy="15" r="4" />
    </svg>
  ),
  wrench: (s = 28) => (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M8 24 L20 12" /><path d="M18 6 a5 5 0 0 0 6.5 6.5 L20 17 L15 12 Z" />
      <circle cx="8" cy="24" r="2.6" />
    </svg>
  ),
  case: (s = 28) => (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="16" cy="16" r="12" /><circle cx="16" cy="16" r="4.5" />
      <path d="M16 4 v3 M16 25 v3 M4 16 h3 M25 16 h3" />
    </svg>
  ),
  wa: (s = 26) => (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="currentColor">
      <path d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.4L3 29l6.8-1.8c1.8 1 3.9 1.5 6.2 1.5h.1c7.2 0 13-5.8 13-13S23.2 3 16 3zm0 23.7h-.1c-2 0-3.9-.5-5.5-1.5l-.4-.2-4.1 1.1 1.1-4-.3-.4c-1.1-1.7-1.6-3.6-1.6-5.7C5.1 9.9 10 5.1 16 5.1c2.9 0 5.7 1.1 7.7 3.2 2.1 2 3.2 4.8 3.2 7.7 0 6-4.9 10.7-10.9 10.7zm6-8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7 0-1.6-.8-2.7-1.4-3.7-3.2-.3-.5.3-.4.8-1.4.1-.2 0-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.7.7.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.3z" />
    </svg>
  ),
  cart: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M2 3 h2 l1.5 9 h7 L14 5 H4.5" />
      <circle cx="6" cy="14" r="0.8" fill="currentColor" /><circle cx="12" cy="14" r="0.8" fill="currentColor" />
    </svg>
  ),
  arrow: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
      <line x1="2" y1="8" x2="13" y2="8" /><polyline points="9,4 13,8 9,12" />
    </svg>
  ),
  check: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3,8 7,12 13,4" />
    </svg>
  ),
};

const kitIcon = (k, s) => (Icons[k] ? Icons[k](s) : Icons.wheel(s));

// Real product image with elegant dark frame
function ProductImage({ product, className = '' }) {
  return (
    <div className={`pimg ${className}`}>
      <img src={product.img} alt={product.title} loading="lazy" />
    </div>
  );
}

function HeroVisual({ lang }) {
  return (
    <div className="hero-visual">
      <img src="assets/kit-songpro.png" alt="Kit de refacción SI Accesorios" />
      <div className="hero-visual-tag">
        <span className="mono">KIT COMPLETO · 6 PIEZAS</span>
        <span className="mono">155/90 · RIN 17</span>
      </div>
    </div>
  );
}

function Header({ page, setPage, lang, setLang, cartCount, openCart }) {
  const T = DATA.t[lang];
  const tabs = [['home', T.nav.home], ['catalog', T.nav.catalog], ['config', T.nav.config], ['blog', T.nav.blog], ['contact', T.nav.contact]];
  return (
    <header className="hdr">
      <div className="hdr-inner">
        <button className="hdr-logo" onClick={() => setPage('home')} style={{background: 'none', border: 'none', padding: 0, color: 'inherit'}}>
          <img className="mark" src="assets/si_logo_gold.png" alt="SI Accesorios" />
        </button>
        <nav className="hdr-nav">
          {tabs.map(([k, label]) => (
            <button key={k} className={page === k ? 'active' : ''} onClick={() => setPage(k)}>{label}</button>
          ))}
        </nav>
        <div className="hdr-right">
          <div className="lang-tog">
            <button className={lang === 'es' ? 'on' : ''} onClick={() => setLang('es')}>ES</button>
            <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
          </div>
          <button className="cart-pill" onClick={openCart}>
            {Icons.cart(14)}
            <span>{lang === 'es' ? 'COTIZACIÓN' : 'QUOTE'}</span>
            <span className="badge">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer({ lang, setPage }) {
  const T = DATA.t[lang];
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-grid">
          <div className="ftr-col ftr-brand">
            <img src="assets/si_logo_gold.png" alt="SI Accesorios" style={{height: 70, width: 'auto', marginLeft: -6}} />
            <p>{T.footer_tag}</p>
          </div>
          <div className="ftr-col">
            <h5>{lang === 'es' ? 'Contacto' : 'Contact'}</h5>
            <a href="tel:+525523177717">+52 55 2317 7717</a>
            <a href="https://wa.me/525523177717" target="_blank">WhatsApp</a>
            <a href="mailto:hola@siaccesorios.mx">hola@siaccesorios.mx</a>
          </div>
          <div className="ftr-col">
            <h5>{lang === 'es' ? 'Enlaces' : 'Links'}</h5>
            <a onClick={() => setPage('catalog')}>{T.nav.catalog}</a>
            <a onClick={() => setPage('config')}>{T.nav.config}</a>
            <a onClick={() => setPage('blog')}>{T.nav.blog}</a>
            <a onClick={() => setPage('contact')}>{T.nav.contact}</a>
          </div>
          <div className="ftr-col">
            <h5>{T.nav.legal}</h5>
            <a onClick={() => setPage('privacy')}>{T.nav.privacy}</a>
            <a onClick={() => setPage('terms')}>{T.nav.terms}</a>
          </div>
        </div>
        <div className="ftr-bot">
          <span>{T.footer_legal}</span>
          <span>Hecho en México</span>
        </div>
      </div>
    </footer>
  );
}

function WAFab({ onClick }) {
  return <button className="wa-fab" onClick={onClick} aria-label="WhatsApp">{Icons.wa(28)}</button>;
}

function CartDrawer({ cart, setCart, lang, onClose }) {
  const T = DATA.t[lang];
  const items = cart.map(c => ({ ...DATA.products.find(p => p.id === c.id), qty: c.qty })).filter(p => p.id);
  const total = items.reduce((s, p) => s + (p.price || 0) * p.qty, 0);
  const hasToQuote = items.some(p => p.price == null);

  const sendWA = () => {
    const lines = items.map(p => `• ${p.title} (${p.sku}) ×${p.qty} — ${p.price == null ? T.cart_toquote : fmt(p.price * p.qty)}`).join('\n');
    const msg = `${lang === 'es' ? 'Hola, me interesa cotizar:' : 'Hi, I\'d like to quote:'}\n\n${lines}\n\n${T.cart_total}: ${fmt(total)}${hasToQuote ? ' (+ ' + T.cart_toquote.toLowerCase() + ')' : ''}`;
    window.open('https://wa.me/525523177717?text=' + encodeURIComponent(msg), '_blank');
  };
  const setQty = (id, q) => { if (q <= 0) setCart(cart.filter(c => c.id !== id)); else setCart(cart.map(c => c.id === id ? { ...c, qty: q } : c)); };

  return (
    <React.Fragment>
      <div className="drawer-mask" onClick={onClose} />
      <aside className="drawer">
        <div className="drawer-hdr"><h3>{T.cart_title}</h3><button className="drawer-close" onClick={onClose}>✕</button></div>
        <div className="drawer-body">
          {items.length === 0 && <div className="drawer-empty">{T.cart_empty}</div>}
          {items.map(p => (
            <div className="drawer-row" key={p.id}>
              <ProductImage product={p} />
              <div className="drawer-row-info">
                <b>{p.title}</b>
                <small>{p.sku}</small>
                <div className="drawer-qty">
                  <button onClick={() => setQty(p.id, p.qty - 1)}>−</button>
                  <span>{p.qty}</span>
                  <button onClick={() => setQty(p.id, p.qty + 1)}>+</button>
                </div>
              </div>
              <div className="drawer-row-price">{p.price == null ? <span className="mono" style={{color: 'var(--gold)'}}>{T.cart_toquote}</span> : fmt(p.price * p.qty)}</div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="drawer-foot">
            <div className="drawer-total"><small>{T.cart_total}</small><b>{fmt(total)}</b></div>
            <button className="btn btn-wa" onClick={sendWA} style={{width: '100%', justifyContent: 'center'}}>{Icons.wa(20)} {T.cart_send}</button>
          </div>
        )}
      </aside>
    </React.Fragment>
  );
}

// Configurator — Brand -> Model -> Recommended kit (3 steps)
function ConfigModal({ lang, onClose, addToCart, viewProduct }) {
  const T = DATA.t[lang];
  const [step, setStep] = useState(0);
  const [brand, setBrand] = useState(null);
  const [model, setModel] = useState(null);

  const product = useMemo(() => model ? DATA.products.find(p => p.id === model.product) : null, [model]);
  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => Math.max(0, s - 1));

  const sendWA = () => {
    if (!product) return;
    const msg = `${lang === 'es' ? 'Cotización por modelo:' : 'Quote by model:'}\n${brand} ${model.name}\n${product.title} (${product.sku})\n${product.price == null ? T.product_quote_price : fmt(product.price)}`;
    window.open('https://wa.me/525523177717?text=' + encodeURIComponent(msg), '_blank');
  };

  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{position: 'relative'}}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-step-bar">{[0,1,2].map(i => <div key={i} className={i <= step ? 'on' : ''} />)}</div>
        <div className="modal-eyebrow">{T.config_step} {step + 1} {T.config_of} 3 · {T.config_title}</div>

        {step === 0 && (
          <React.Fragment>
            <h3>{T.config_q1}</h3>
            <div className="modal-opts">
              {['BYD', 'Nissan'].map(b => (
                <button key={b} className={`modal-opt ${brand === b ? 'on' : ''}`} onClick={() => { setBrand(b); setModel(null); }}>
                  <span>{b}</span><small>{DATA.models[b].length} {T.config_models}</small>
                </button>
              ))}
            </div>
          </React.Fragment>
        )}

        {step === 1 && brand && (
          <React.Fragment>
            <h3>{T.config_q2}</h3>
            <div className="modal-opts">
              {DATA.models[brand].map(m => (
                <button key={m.id} className={`modal-opt ${model?.id === m.id ? 'on' : ''}`} onClick={() => setModel(m)}>
                  <span>{brand} {m.name}</span><small>{m.size} · {m.rim}</small>
                </button>
              ))}
            </div>
          </React.Fragment>
        )}

        {step === 2 && product && (
          <React.Fragment>
            <h3>{T.config_q3}</h3>
            <div className="config-result">
              <ProductImage product={product} />
              <div className="config-result-info">
                <div className="mono" style={{color: 'var(--text-mute)'}}>{product.sku}</div>
                <div className="config-result-title serif">{product.title}</div>
                <div className="config-result-price serif">{priceLabel(product.price, lang)}</div>
                <div className="config-result-meta mono">{product.size} · RIN {product.rim.replace('"','')} · {product.birlos} {lang === 'es' ? 'BIRLOS' : 'LUGS'}</div>
              </div>
            </div>
            <div className="config-includes">
              {DATA.kit.map(k => (
                <span key={k.icon} className="config-inc"><span className="config-inc-i">{Icons.check(11)}</span>{k[lang]}</span>
              ))}
            </div>
          </React.Fragment>
        )}

        <div className="modal-foot">
          <button className="btn btn-ghost btn-sm" onClick={back} disabled={step === 0} style={{opacity: step === 0 ? 0.4 : 1}}>{T.config_back}</button>
          {step < 2 && (
            <button className="btn btn-sm" onClick={next} disabled={(step === 0 && !brand) || (step === 1 && !model)}
              style={{opacity: ((step === 0 && !brand) || (step === 1 && !model)) ? 0.4 : 1}}>{T.config_next} {Icons.arrow()}</button>
          )}
          {step === 2 && product && (
            <div style={{display: 'flex', gap: 10}}>
              <button className="btn btn-ghost btn-sm" onClick={() => { viewProduct(product.id); onClose(); }}>{T.config_view}</button>
              <button className="btn btn-wa btn-sm" onClick={sendWA}>{Icons.wa(16)} {T.config_send}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Icons, kitIcon, ProductImage, HeroVisual, Header, Footer, WAFab, CartDrawer, ConfigModal, fmt, priceLabel });
