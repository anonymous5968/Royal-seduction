import { supabaseClient } from './config.js';

export async function loadLessons() {
    const { data, error } = await supabaseClient
        .from('lessons')
        .order('day_number', { ascending: true });

    if (error) {
        console.error("Error loading lessons:", error.message);
        return;
    }

    const container = document.getElementById('lessons-container');
    if (container && data) {
        // This replaces the "Membership Required" placeholder with your actual lessons
        container.innerHTML = data.map(lesson => `
            <div class="border-b border-gray-900 pb-8 mb-8 last:border-0">
                <h5 class="serif-font text-2xl italic text-white uppercase tracking-tighter">
                    Day ${lesson.day_number}: ${lesson.title}
                </h5>
                <p class="text-gray-400 text-sm mt-3 leading-relaxed">
                    ${lesson.content}
                </p>
            </div>
        `).join('');
    }
}
