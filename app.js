const translated = [...document.querySelectorAll('[data-zh]')];
translated.forEach(element => element.dataset.en = element.innerHTML);
let language = 'en';
try { language = localStorage.getItem('zirui-language') === 'zh' ? 'zh' : 'en'; } catch {}
const languageButton = document.getElementById('language');
function applyLanguage() {
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  translated.forEach(element => { element.innerHTML = element.dataset[language]; });
  languageButton.textContent = language === 'en' ? '中文' : 'English';
  languageButton.setAttribute('aria-label', language === 'en' ? 'Switch to Chinese' : 'Switch to English');
  try { localStorage.setItem('zirui-language', language); } catch {}
}
languageButton.addEventListener('click', () => { language = language === 'en' ? 'zh' : 'en'; applyLanguage(); });
document.addEventListener('click', event => {
  const link = event.target.closest('a[data-open]');
  if (!link) return;
  const details = document.getElementById(link.dataset.open);
  if (details instanceof HTMLDetailsElement) details.open = true;
});
function openLinkedDetails() {
  const target = document.getElementById(location.hash.slice(1));
  if (target instanceof HTMLDetailsElement) target.open = true;
}
window.addEventListener('hashchange', openLinkedDetails);
document.getElementById('copy-email').addEventListener('click', async () => {
  const status = document.getElementById('copy-status');
  try {
    await navigator.clipboard.writeText('3073028s@student.gla.ac.uk');
    status.textContent = language === 'zh' ? '已复制' : 'Copied';
  } catch { status.textContent = '3073028s@student.gla.ac.uk'; }
  setTimeout(() => { status.textContent = ''; }, 5000);
});
applyLanguage();
openLinkedDetails();
