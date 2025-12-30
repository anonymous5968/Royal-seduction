// supabase/admin.js
import { supabaseClient } from './config.js';

export async function saveAllChanges() {
    const elements = document.querySelectorAll('[data-key]');
    const updates = Array.from(elements).map(el => ({
        key: el.getAttribute('data-key'),
        value: el.innerHTML.trim()
    }));

    // This requires the "Admin Edit" policy to be active in your SQL Editor
    const { error } = await supabaseClient
        .from('site_settings')
        .upsert(updates);
    
    if (error) {
        alert("Database Error: " + error.message);
    } else {
        alert("Royal Seduction Live Update Successful!");
        location.reload();
    }
}

// Shortcut: Ctrl + Shift + L
window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'L') {
        if (prompt("Admin Key:") === "royal2025") {
            document.querySelectorAll('[data-key]').forEach(el => el.contentEditable = "true");
            document.getElementById('admin-controls').classList.remove('hidden');
            alert("Admin Edit Mode: On");
        }
    }
});
