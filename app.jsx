// SI Accesorios — root app

const { useState: useState_a, useEffect: useEffect_a } = React;

// Tweakable defaults
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#c8a55b",
  "theme": "dark",
  "density": "3"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const [page, setPage] = useState_a('home');
  const [productId, setProductId] = useState_a(null);
  const [lang, setLang] = useState_a('es');
  const [cart, setCart] = useState_a([]);
  const [cartOpen, setCartOpen] = useState_a(false);
  const [configOpen, setConfigOpen] = useState_a(false);

  // apply tweaks to :root
  useEffect_a(() => {
    const accent = tweaks.accent || '#c8a55b';
    // derive light/dark from accent (oklch-ish via simple lightness shift)
    document.documentElement.style.setProperty('--gold', accent);
    document.documentElement.style.setProperty('--gold-2', lighten(accent, 0.12));
    document.documentElement.style.setProperty('--gold-3', darken(accent, 0.18));
    document.documentElement.style.setProperty('--gold-soft', hexToRgba(accent, 0.12));
    document.documentElement.setAttribute('data-theme', tweaks.theme || 'dark');
  }, [tweaks]);

  const addToCart = (id) => {
    const ex = cart.find(c => c.id === id);
    if (ex) setCart(cart.map(c => c.id === id ? { ...c, qty: c.qty + 1 } : c));
    else setCart([...cart, { id, qty: 1 }]);
    setCartOpen(true);
  };

  const viewProduct = (id) => { setProductId(id); setPage('product'); window.scrollTo(0, 0); };
  const goPage = (p) => { setPage(p); window.scrollTo(0, 0); };
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const density = Number(tweaks.density) || 3;

  return (
    <React.Fragment>
      <Header
        page={page} setPage={goPage} lang={lang} setLang={setLang}
        cartCount={cartCount} openCart={() => setCartOpen(true)}
      />

      <main>
        {page === 'home' && <PageHome lang={lang} setPage={goPage} openConfig={() => setConfigOpen(true)} viewProduct={viewProduct} density={density} />}
        {page === 'catalog' && <PageCatalog lang={lang} viewProduct={viewProduct} density={density} setDensity={(d) => setTweak('density', String(d))} openConfig={() => setConfigOpen(true)} />}
        {page === 'product' && <PageProduct productId={productId} lang={lang} setPage={goPage} addToCart={addToCart} />}
        {page === 'contact' && <PageContact lang={lang} />}
        {page === 'blog' && <PageBlog lang={lang} />}
        {page === 'privacy' && <PageLegal doc="privacy" lang={lang} setPage={goPage} />}
        {page === 'terms' && <PageLegal doc="terms" lang={lang} setPage={goPage} />}
        {page === 'config' && (
          <section className="sect" style={{minHeight: '60vh', display: 'flex', alignItems: 'center'}}>
            <div className="wrap" style={{textAlign: 'center'}}>
              <div className="eyebrow">{DATA.t[lang].config_title}</div>
              <h2 className="sect-title" style={{margin: '20px auto 24px', maxWidth: 720}}>{lang === 'es' ? 'Tres pasos. Tu kit exacto.' : 'Three steps. Your exact kit.'}</h2>
              <button className="btn" onClick={() => setConfigOpen(true)}>{lang === 'es' ? 'Comenzar' : 'Start'} {Icons.arrow()}</button>
            </div>
          </section>
        )}
      </main>

      <Footer lang={lang} setPage={goPage} />
      <WAFab onClick={() => {
        const msg = lang === 'es' ? 'Hola, vengo del sitio web de SI Accesorios.' : 'Hi, coming from the SI Accesorios site.';
        window.open('https://wa.me/525523177717?text=' + encodeURIComponent(msg), '_blank');
      }} />

      {cartOpen && <CartDrawer cart={cart} setCart={setCart} lang={lang} onClose={() => setCartOpen(false)} />}
      {configOpen && <ConfigModal lang={lang} onClose={() => setConfigOpen(false)} addToCart={addToCart} viewProduct={viewProduct} />}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Color de acento" />
        <TweakColor
          label="Accent"
          value={tweaks.accent}
          onChange={(v) => setTweak('accent', v)}
          options={['#c8a55b', '#c4c4c4', '#d96552', '#0e63b3']}
        />
        <TweakSection label="Tema" />
        <TweakRadio
          label="Modo"
          value={tweaks.theme}
          options={['dark', 'light']}
          onChange={(v) => setTweak('theme', v)}
        />
        <TweakSection label="Catálogo" />
        <TweakRadio
          label="Densidad"
          value={tweaks.density}
          options={['2', '3', '4']}
          onChange={(v) => setTweak('density', v)}
        />
      </TweaksPanel>
    </React.Fragment>
  );
}

// ---- color helpers ----
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const f = h.length === 3 ? h.split('').map(c => c+c).join('') : h;
  return [parseInt(f.slice(0,2),16), parseInt(f.slice(2,4),16), parseInt(f.slice(4,6),16)];
}
function rgbToHex([r,g,b]) {
  return '#' + [r,g,b].map(v => Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('');
}
function lighten(hex, amt) {
  const [r,g,b] = hexToRgb(hex);
  return rgbToHex([r + (255-r)*amt, g + (255-g)*amt, b + (255-b)*amt]);
}
function darken(hex, amt) {
  const [r,g,b] = hexToRgb(hex);
  return rgbToHex([r*(1-amt), g*(1-amt), b*(1-amt)]);
}
function hexToRgba(hex, a) {
  const [r,g,b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
