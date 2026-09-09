/* Contacto y navegación compartidos en las tres páginas. */
const FOOTER_HTML = `
<footer class="footer" id="contacto">
  <div class="container">
    <div class="footer__headline"><h2>Tu próxima historia<br>empieza en el agua.</h2><a href="https://wa.me/573207412254" target="_blank" rel="noopener" class="btn btn--accent"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.35 0-2.6-.32-3.7-.9L3 21l1.9-5.7A8.46 8.46 0 0 1 3.5 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z"/><path fill="currentColor" stroke="none" d="M16.4 14.4c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8 1-.1.1-.3.2-.5.1-.7-.3-1.4-.8-2-1.4-.5-.5-1-1.1-1.4-1.8-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.2-.4.1-.1 0-.3 0-.4-.1-.1-.5-1.3-.7-1.8-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.1 1.6 2.5 4 3.5.6.2 1 .4 1.3.5.6.2 1.1.1 1.5-.1.5-.2 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.1-.4-.2Z"/></svg>Hablemos por WhatsApp</a></div>
  </div>
  <div class="container footer__inner">
    <div class="footer__brand">
      <div class="footer__brandline"><span class="footer__logo-badge"><img src="assets/images/logo.png" alt="Escudo del Club Tiburones" width="320" height="302" loading="lazy"></span><div>Club Deportivo de Natación<strong>TIBURONES</strong></div></div>
      <p class="footer__tagline">Formando nadadores en Popayán y el Cauca, un largo a la vez.</p>
    </div>
    <div class="footer__col"><h4>El club</h4><ul><li><a href="#nosotros">Nuestra historia</a></li><li><a href="#categorias">Categorías y etapas</a></li><li><a href="#logros">Logros</a></li><li><a href="galeria/">Galería</a></li><li><a href="calendario/">Calendario</a></li><li><a href="#plan-padrino">Plan Padrino</a></li></ul></div>
    <div class="footer__col"><h4>Hablemos</h4><ul><li><a href="https://wa.me/573207412254" target="_blank" rel="noopener">WhatsApp: 320 741 2254</a></li><li>Vereda de Torres</li><li>Popayán, Cauca · Colombia</li></ul><ul class="footer__social">
        <li>
          <a href="https://www.instagram.com/clubdeportiburones" target="_blank" rel="noopener" aria-label="Instagram">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/></svg>
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/ClubDeporTiburones" target="_blank" rel="noopener" aria-label="Facebook">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M14 8.5h-1.5c-.8 0-1.5.7-1.5 1.5v2h3l-.4 2.5H11V19"/></svg>
          </a>
        </li>
        <li>
          <a href="https://wa.me/573207412254" target="_blank" rel="noopener" aria-label="WhatsApp">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.35 0-2.6-.32-3.7-.9L3 21l1.9-5.7A8.46 8.46 0 0 1 3.5 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z"/><path fill="currentColor" stroke="none" d="M16.4 14.4c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8 1-.1.1-.3.2-.5.1-.7-.3-1.4-.8-2-1.4-.5-.5-1-1.1-1.4-1.8-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.2-.4.1-.1 0-.3 0-.4-.1-.1-.5-1.3-.7-1.8-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.1 1.6 2.5 4 3.5.6.2 1 .4 1.3.5.6.2 1.1.1 1.5-.1.5-.2 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.1-.4-.2Z"/></svg>
          </a>
        </li>
      </ul></div>
  </div>
  <div class="container"><div class="footer__wordmark" aria-hidden="true">TIBURONES</div></div>
  <div class="footer__bottom"><div class="container"><p>&copy; <span id="footer-year"></span> Club Deportivo de Natación Tiburones.</p><a href="#inicio">Volver al inicio <span aria-hidden="true">↑</span></a></div></div>
</footer>
<a href="https://wa.me/573207412254" target="_blank" rel="noopener" class="whatsapp-fab" aria-label="Escríbenos por WhatsApp"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.35 0-2.6-.32-3.7-.9L3 21l1.9-5.7A8.46 8.46 0 0 1 3.5 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z"/><path fill="currentColor" stroke="none" d="M16.4 14.4c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8 1-.1.1-.3.2-.5.1-.7-.3-1.4-.8-2-1.4-.5-.5-1-1.1-1.4-1.8-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.2-.4.1-.1 0-.3 0-.4-.1-.1-.5-1.3-.7-1.8-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.1 1.6 2.5 4 3.5.6.2 1 .4 1.3.5.6.2 1.1.1 1.5-.1.5-.2 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.1-.4-.2Z"/></svg></a>
`;
