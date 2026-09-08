// Atlas CMS — loads site content from Supabase and applies to page
// Falls back to hardcoded defaults if Supabase is unreachable

const SUPABASE_URL = 'https://vowecpavuxgqbuvthzlm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_w6Bk-wgdZW6XhUFV-J0i3w_7lLNVHvU';

async function fetchContent() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/site_content?select=key,value`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    if (!res.ok) return {};
    const rows = await res.json();
    const map = {};
    rows.forEach(r => { map[r.key] = r.value; });
    return map;
  } catch (e) {
    return {};
  }
}

function applyContent(content) {
  document.querySelectorAll('[data-cms]').forEach(el => {
    const key = el.dataset.cms;
    if (content[key] !== undefined && content[key] !== '') {
      el.textContent = content[key];
    }
  });
  // href attributes
  document.querySelectorAll('[data-cms-href]').forEach(el => {
    const key = el.dataset.cmsHref;
    if (content[key] !== undefined && content[key] !== '') {
      el.href = content[key];
    }
  });
}

(async () => {
  const content = await fetchContent();
  applyContent(content);
})();
