// supabase/config.js
const SUPABASE_URL = 'https://dulbysxbquxhgguylwxa.supabase.co';
const SUPABASE_KEY = 'sb_publishable_NecuxVMASv3GIOdY6S3pyw_KOBNLfI5';

const { createClient } = supabase;
export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Loads saved content from site_settings table
 */
export async function loadSiteContent() {
    const { data, error } = await supabaseClient
        .from('site_settings')
        .select('*');

    if (error) {
        console.error("Supabase Load Error:", error.message);
        return;
    }

    if (data) {
        data.forEach(item => {
            const el = document.querySelector(`[data-key="${item.key}"]`);
            if (el) el.innerHTML = item.value;
        });
    }
}
