import { supabaseClient } from './config.js';

// 1. Save all text edits made on the page
export async function saveAllChanges() {
    const elements = document.querySelectorAll('[data-key]');
    const updates = Array.from(elements).map(el => ({
        key: el.getAttribute('data-key'),
        value: el.innerHTML.trim()
    }));

    const { error } = await supabaseClient.from('site_settings').upsert(updates);
    
    if (error) {
        alert("Database Error: " + error.message);
    } else {
        alert("Royal Seduction Updated.");
        location.reload();
    }
}

// 2. Function to add a new Day (1, 2, 3...) to the Forbidden Chapter
export async function createNewLesson() {
    const day = prompt("Enter Day Number (e.g., 1):");
    const title = prompt("Enter Lesson Title:");
    const content = prompt("Enter Lesson Content:");

    if(day && title && content) {
        const { error } = await supabaseClient.from('lessons').insert([
            { day_number: parseInt(day), title: title, content: content }
        ]);
        
        if (error) {
            alert("Error adding lesson: " + error.message);
        } else {
            alert(`Day ${day} added successfully!`);
            location.reload();
        }
    }
}

// 3. The Secret Admin Shortcut (Ctrl + Shift + L)
window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'L') {
        const pass = prompt("Admin Key:");
        if (pass === "royal2025") {
            document.querySelectorAll('[data-key]').forEach(el => el.contentEditable = "true");
            document.getElementById('admin-controls').classList.remove('hidden');
        } else {
            alert("Access Denied");
        }
    }
});
