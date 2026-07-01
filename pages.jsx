// SI Accesorios — page components

const { useState: useState_p, useEffect: useEffect_p, useMemo: useMemo_p } = React;

// Product card with real image
function ProductCard({ product, lang, onClick }) {
  const T = DATA.t[lang];
  return (
    <article className="pcard" onClick={onClick}>
      <div className="pcard-imgwrap">
        <ProductImage product={product} />
        {product[`badge_${lang}`] && <div className="pcard-badge">{product[`badge_${lang}`]}</div>}
      </div>
      <div className="pcard-body">
        <div className="pcard-sku">{product.brand} · {product.sku}</div>
        <h3 className="pcard-title">{product.title.replace('Kit de refacción · ', '')}</h3>
        <div className="pcard-meta mono">{product.size} · RIN {product.rim.replace('"','')} · {product.birlos} {lang === 'es' ? 'BIRLOS' : 'LUGS'}</div>
        <div className="pcard-kitline">{Icons.check(11)} {T.includes_label}</div>
        <div className="pcard-foot">
          <div className="pcard-price">
            {product.price == null
              ? <span className="price-quote">{T.product_quote_price}</span>
              : <React.Fragment>${product.price.toLocaleString('es-MX')}<small>MXN</small></React.Fragment>}
          </div>
          <span className="pcard-cta">{lang === 'es' ? 'Ver kit →' : 'View kit →'}</span>
        </div>
      </div>
    </article>
  );
}

// ============ HOME ============
function PageHome({ lang, setPage, openConfig, viewProduct, density }) {
  const T = DATA.t[lang];

  return (
    <React.Fragment>
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div className="eyebrow">{T.hero_eyebrow}</div>
              <h1 className="hero-title">
                {T.hero_title_a}<em>{T.hero_title_em}</em>{T.hero_title_b}<br/>{T.hero_title_c}
              </h1>
              <p className="hero-sub">{T.hero_sub}</p>
              <div className="hero-ctas">
                <button className="btn" onClick={() => setPage('catalog')}>{T.cta_catalog} {Icons.arrow()}</button>
                <button className="btn btn-ghost" onClick={openConfig}>{T.cta_config}</button>
              </div>
            </div>
            <HeroVisual lang={lang} />
          </div>
        </div>
        <div className="hero-marquee">
          <div className="wrap" style={{display: 'flex', gap: 56, alignItems: 'center'}}>
            <span><span className="dot">●</span> BYD MINI DOLPHIN</span>
            <span><span className="dot">●</span> BYD KING</span>
            <span><span className="dot">●</span> BYD SONG PRO</span>
            <span><span className="dot">●</span> NISSAN KICKS E-POWER</span>
            <span><span className="dot">●</span> NISSAN X-TRAIL E-POWER</span>
            <span><span className="dot">●</span> ENTREGA 48 H</span>
          </div>
        </div>
      </section>

      {/* What every kit includes */}
      <section className="sect">
        <div className="wrap">
          <div className="sect-head">
            <div>
              <div className="eyebrow">01 / {T.kit_title}</div>
              <h2 className="sect-title">{lang === 'es' ? 'Seis piezas en una sola funda.' : 'Six pieces in one case.'}</h2>
            </div>
            <p className="sect-sub">{T.kit_sub}</p>
          </div>
          <div className="kit-grid">
            {DATA.kit.map((k, i) => (
              <div key={k.icon} className="kit-item">
                <div className="kit-icon">{kitIcon(k.icon, 30)}</div>
                <div className="kit-num mono">{String(i + 1).padStart(2, '0')}</div>
                <div className="kit-name">{k[lang]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available models */}
      <section className="sect">
        <div className="wrap">
          <div className="sect-head">
            <div>
              <div className="eyebrow">02 / {T.models_title}</div>
              <h2 className="sect-title">{lang === 'es' ? 'Tu modelo, tu kit exacto.' : 'Your model, your exact kit.'}</h2>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => setPage('catalog')}>{T.cta_catalog} {Icons.arrow()}</button>
          </div>
          <div className={`cat-grid d${density}`}>
            {DATA.products.map(p => <ProductCard key={p.id} product={p} lang={lang} onClick={() => viewProduct(p.id)} />)}
            <div className="pcard pcard-cta-card" onClick={openConfig}>
              <div className="pcard-cta-inner">
                <div className="eyebrow">{lang === 'es' ? '¿No ves tu modelo?' : 'Don\u2019t see your model?'}</div>
                <h3 className="serif" style={{fontSize: 28, margin: '12px 0 18px', lineHeight: 1.1}}>{lang === 'es' ? 'Cotiza por modelo en 3 pasos.' : 'Quote by model in 3 steps.'}</h3>
                <span className="btn btn-sm">{T.cta_config} {Icons.arrow()}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sect">
        <div className="wrap">
          <div className="sect-head">
            <div><div className="eyebrow">03 / {lang === 'es' ? 'Por qué' : 'Why'}</div><h2 className="sect-title">{T.why}</h2></div>
          </div>
          <div className="why-grid">
            {T.why_items.map((w, i) => (
              <div key={i} className="why-item">
                <div className="why-num">{String(i + 1).padStart(2, '0')}</div>
                <h4>{w.t}</h4><p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sect" style={{padding: '72px 0', background: 'var(--bg-2)'}}>
        <div className="wrap">
          <div className="cta-strip">
            <div>
              <div className="eyebrow">{lang === 'es' ? 'Cotización' : 'Quote'}</div>
              <h2 className="sect-title" style={{margin: '12px 0 0'}}>{T.contact_title}</h2>
              <p className="sect-sub" style={{marginTop: 12}}>{T.contact_sub}</p>
            </div>
            <div style={{display: 'flex', gap: 12, flexWrap: 'wrap'}}>
              <button className="btn btn-wa" onClick={openConfig}>{Icons.wa(18)} {T.cta_quote}</button>
              <button className="btn btn-ghost" onClick={() => setPage('contact')}>{T.nav.contact}</button>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

// ============ CATALOG ============
function PageCatalog({ lang, viewProduct, density: initialDensity, setDensity: setDensityRoot, openConfig }) {
  const T = DATA.t[lang];
  const [brand, setBrand] = useState_p('all');
  const [rim, setRim] = useState_p('all');
  const [density, setDensity] = useState_p(initialDensity || 3);

  useEffect_p(() => { setDensity(initialDensity || 3); }, [initialDensity]);

  const rims = useMemo_p(() => Array.from(new Set(DATA.products.map(p => p.rim))).sort(), []);
  const filtered = useMemo_p(() => DATA.products.filter(p =>
    (brand === 'all' || p.brand === brand) && (rim === 'all' || p.rim === rim)
  ), [brand, rim]);
  const countBy = (key, val) => DATA.products.filter(p => p[key] === val).length;
  const clear = () => { setBrand('all'); setRim('all'); };

  return (
    <section className="sect">
      <div className="wrap">
        <div className="sect-head" style={{marginBottom: 32}}>
          <div>
            <div className="eyebrow">{T.catalog_title}</div>
            <h2 className="sect-title">{T.catalog_h}</h2>
            <p className="sect-sub" style={{marginTop: 12}}>{T.catalog_sub}</p>
          </div>
        </div>

        <div className="cat-layout">
          <aside className="filters">
            <div className="filter-group">
              <div className="filter-label">{T.filter_brand}</div>
              <div className="filter-opts">
                <button className={`filter-opt ${brand === 'all' ? 'on' : ''}`} onClick={() => setBrand('all')}><span>{T.filter_all}</span><span className="ct">{DATA.products.length}</span></button>
                {['BYD', 'Nissan'].map(b => (
                  <button key={b} className={`filter-opt ${brand === b ? 'on' : ''}`} onClick={() => setBrand(b)}><span>{b}</span><span className="ct">{countBy('brand', b)}</span></button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <div className="filter-label">{T.filter_rim}</div>
              <div className="filter-opts">
                <button className={`filter-opt ${rim === 'all' ? 'on' : ''}`} onClick={() => setRim('all')}><span>{T.filter_all}</span><span className="ct">{DATA.products.length}</span></button>
                {rims.map(r => (
                  <button key={r} className={`filter-opt ${rim === r ? 'on' : ''}`} onClick={() => setRim(r)}><span>RIN {r.replace('"','')}</span><span className="ct">{countBy('rim', r)}</span></button>
                ))}
              </div>
            </div>
            <button className="filter-clear" onClick={clear}>{T.filter_clear}</button>
          </aside>

          <div>
            <div className="cat-count-bar">
              <span>{filtered.length} {lang === 'es' ? 'kits' : 'kits'}</span>
              <div className="density-tog">{[2,3,4].map(d => (<button key={d} className={density === d ? 'on' : ''} onClick={() => { setDensity(d); setDensityRoot && setDensityRoot(d); }}>{d}</button>))}</div>
            </div>
            <div className={`cat-grid d${density}`}>
              {filtered.length === 0 && <div className="no-results">{T.no_results}</div>}
              {filtered.map(p => <ProductCard key={p.id} product={p} lang={lang} onClick={() => viewProduct(p.id)} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ PRODUCT ============
function PageProduct({ productId, lang, setPage, addToCart }) {
  const T = DATA.t[lang];
  const product = DATA.products.find(p => p.id === productId);
  if (!product) return <section className="sect"><div className="wrap">Not found</div></section>;

  const sendWA = () => {
    const msg = `${lang === 'es' ? 'Quiero cotizar:' : 'Quote request:'} ${product.title} (${product.sku}) — ${priceLabel(product.price, lang)}`;
    window.open('https://wa.me/525554659675?text=' + encodeURIComponent(msg), '_blank');
  };

  return (
    <section className="sect">
      <div className="wrap-narrow">
        <button className="pdp-back" onClick={() => setPage('catalog')}>{T.product_back}</button>
        <div className="pdp-grid">
          <div className="pdp-main">
            <ProductImage product={product} className="pdp-img" />
          </div>
          <div>
            <div className="pdp-eyebrow">{product.brand} · {product.sku}</div>
            <h1 className="pdp-title">{product.title.replace('Kit de refacción · ', '')}</h1>
            <p className="pdp-sub">{lang === 'es' ? 'Kit de refacción completo con ajuste exacto para este modelo.' : 'Complete spare kit with exact fit for this model.'}</p>
            <div className="pdp-price-block">
              <div className="pdp-price">
                {product.price == null
                  ? <span className="price-quote">{T.product_quote_price}</span>
                  : <React.Fragment>${product.price.toLocaleString('es-MX')}<small>MXN</small></React.Fragment>}
              </div>
              {product.badge_es && <div className="pdp-stock"><span className="dot" style={{background: product.price == null ? 'var(--gold)' : '#4ec97c'}}></span>{product[`badge_${lang}`]}</div>}
            </div>

            <div className="pdp-specs">
              <h4>{T.product_specs}</h4>
              <div className="pdp-specs-grid">
                <dl className="pdp-spec"><dt>{T.product_size}</dt><dd>{product.size}</dd></dl>
                <dl className="pdp-spec"><dt>Rin</dt><dd>{product.rim}</dd></dl>
                <dl className="pdp-spec"><dt>{T.product_birlos}</dt><dd>{product.birlos}</dd></dl>
                <dl className="pdp-spec"><dt>{T.product_speed}</dt><dd>{product.speed} km/h</dd></dl>
              </div>
            </div>

            <div className="pdp-includes">
              <h4>{T.product_includes}</h4>
              <div className="pdp-inc-grid">
                {DATA.kit.map(k => (
                  <div key={k.icon} className="pdp-inc">
                    <span className="pdp-inc-i">{kitIcon(k.icon, 22)}</span>
                    <span>{k[lang]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pdp-ctas">
              <button className="btn btn-wa" onClick={sendWA}>{Icons.wa(18)} {T.product_quote}</button>
              <button className="btn btn-ghost" onClick={() => addToCart(product.id)}>{Icons.cart()} {T.product_add}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ CONTACT ============
function PageContact({ lang }) {
  const T = DATA.t[lang];
  const [form, setForm] = useState_p({ name: '', phone: '', model: '', message: '' });
  const [errs, setErrs] = useState_p({});
  const [sent, setSent] = useState_p(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = T.contact_form.err_name;
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) e.phone = T.contact_form.err_phone;
    if (form.message.trim().length < 8) e.message = T.contact_form.err_message;
    setErrs(e); return Object.keys(e).length === 0;
  };
  const submit = (ev) => { ev.preventDefault(); if (!validate()) return; setSent(true); setTimeout(() => { setSent(false); setForm({ name: '', phone: '', model: '', message: '' }); }, 4000); };
  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <section className="sect">
      <div className="wrap">
        <div className="sect-head" style={{marginBottom: 56}}>
          <div><div className="eyebrow">{T.nav.contact}</div><h2 className="sect-title">{T.contact_title}</h2><p className="sect-sub" style={{marginTop: 12}}>{T.contact_sub}</p></div>
        </div>
        <div className="contact-grid">
          <form className="contact-form" onSubmit={submit} noValidate>
            <div className="field"><label>{T.contact_form.name}</label><input value={form.name} onChange={upd('name')} placeholder={lang === 'es' ? 'Tu nombre' : 'Your name'} />{errs.name && <div className="field-err">{errs.name}</div>}</div>
            <div className="field"><label>{T.contact_form.phone}</label><input value={form.phone} onChange={upd('phone')} placeholder="55 0000 0000" />{errs.phone && <div className="field-err">{errs.phone}</div>}</div>
            <div className="field"><label>{T.contact_form.model}</label>
              <select value={form.model} onChange={upd('model')}>
                <option value="">— {lang === 'es' ? 'selecciona' : 'select'} —</option>
                <optgroup label="BYD">{DATA.models.BYD.map(m => <option key={m.id} value={`BYD ${m.name}`}>BYD {m.name}</option>)}</optgroup>
                <optgroup label="Nissan">{DATA.models.Nissan.map(m => <option key={m.id} value={`Nissan ${m.name}`}>Nissan {m.name}</option>)}</optgroup>
                <option value="otro">{lang === 'es' ? 'Otro' : 'Other'}</option>
              </select>
            </div>
            <div className="field"><label>{T.contact_form.message}</label><textarea value={form.message} onChange={upd('message')} placeholder={lang === 'es' ? '¿Qué buscas? Modelo, año, lo que tengas.' : 'What are you after? Model, year, anything.'}></textarea>{errs.message && <div className="field-err">{errs.message}</div>}</div>
            <button type="submit" className="btn" style={{alignSelf: 'flex-start'}}>{T.contact_form.submit} {Icons.arrow()}</button>
            {sent && <div style={{color: 'var(--gold)', fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.06em'}}>{T.contact_form.sent}</div>}
          </form>
          <div>
            <div className="contact-info">
              <h4>WhatsApp</h4><p>+52 55 5465 9675</p>
              <h4>{lang === 'es' ? 'Correo' : 'Email'}</h4><p>hola@siaccesorios.mx</p>
              <h4>{lang === 'es' ? 'Horario' : 'Hours'}</h4><p>{T.footer_hours}</p>
              <h4>{lang === 'es' ? 'Dirección' : 'Address'}</h4><p style={{fontSize: 17}}>General Juan Cano #87, Int. 100<br/>Col. San Miguel Chapultepec<br/>Miguel Hidalgo, CDMX</p>
            </div>
            <div className="map-mock"><div className="map-pin"></div><div className="map-label">San Miguel Chapultepec · CDMX</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ BLOG ============
function PageBlog({ lang }) {
  const T = DATA.t[lang];
  return (
    <section className="sect">
      <div className="wrap">
        <div className="sect-head" style={{marginBottom: 56}}>
          <div><div className="eyebrow">{T.blog_title}</div><h2 className="sect-title">{T.blog_h}</h2><p className="sect-sub" style={{marginTop: 12}}>{T.blog_sub}</p></div>
        </div>
        <div className="blog-grid">
          {DATA.blog.map(b => (
            <article key={b.id} className="bcard">
              <div className="bcard-tag">{b[`tag_${lang}`]}</div>
              <h3 className="bcard-title">{b[`title_${lang}`]}</h3>
              <p className="bcard-ex">{b[`excerpt_${lang}`]}</p>
              <div className="bcard-foot"><span>{b.read}</span><span className="read">{T.blog_read} →</span></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ LEGAL (privacy / terms) ============
function PageLegal({ doc, lang, setPage }) {
  const L = DATA.legal[doc];
  const sections = L[`sections_${lang}`];
  return (
    <section className="sect">
      <div className="wrap-narrow">
        <button className="pdp-back" onClick={() => setPage('home')}>{lang === 'es' ? '← Volver al inicio' : '← Back to home'}</button>
        <div className="legal-head">
          <div className="eyebrow">{L[`eyebrow_${lang}`]}</div>
          <h1 className="legal-title">{L[`title_${lang}`]}</h1>
          <div className="legal-updated mono">{L[`updated_${lang}`]}</div>
        </div>
        <p className="legal-intro">{L[`intro_${lang}`]}</p>
        <div className="legal-body">
          {sections.map((s, i) => (
            <div key={i} className="legal-section">
              <h2>{s.h}</h2>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
        <div className="legal-foot">
          <span className="mono">{lang === 'es' ? '¿Dudas sobre este documento?' : 'Questions about this document?'}</span>
          <a href="mailto:hola@siaccesorios.mx" className="btn btn-ghost btn-sm">hola@siaccesorios.mx</a>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { PageHome, PageCatalog, PageProduct, PageContact, PageBlog, PageLegal, ProductCard });
