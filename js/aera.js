/**
 * Aera the Pup SVG and Animation Controller
 */
const AeraPup = {
    container: null,
    statusText: null,

    init() {
        this.container = document.getElementById('aera-container');
        this.statusText = document.getElementById('aera-status-text');

        // Inject SVG
        this.container.innerHTML = `
            <svg viewBox="0 0 200 200" class="aera-svg" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <!-- Sparkle for Good -->
                    <g id="sparkle">
                        <path d="M 0,-5 Q 0,0 5,0 Q 0,0 0,5 Q 0,0 -5,0 Q 0,0 0,-5" fill="#facc15" />
                    </g>
                    <!-- Smoke for Poor -->
                    <g id="smoke">
                        <circle cx="0" cy="0" r="10" fill="rgba(100,116,139,0.5)" />
                    </g>
                </defs>

                <!-- Tail Group -->
                <g class="aera-tail-group" transform="translate(140, 150)">
                    <path class="aera-tail" d="M 0,0 Q 20,-20 30,-50 Q 15,-40 5,-20" fill="#eab308" />
                </g>

                <!-- Body -->
                <rect x="50" y="100" width="100" height="90" rx="30" fill="#facc15" />

                <!-- Head Group -->
                <g class="aera-head-group">
                    <circle cx="100" cy="90" r="50" fill="#facc15" />
                    
                    <!-- Ears -->
                    <path class="aera-ear aera-ear-l" d="M 60,60 Q 30,80 40,110 Q 50,130 65,100" fill="#ca8a04" />
                    <path class="aera-ear aera-ear-r" d="M 140,60 Q 170,80 160,110 Q 150,130 135,100" fill="#ca8a04" />

                    <!-- Eyes -->
                    <g class="aera-eyes">
                        <circle cx="80" cy="80" r="6" fill="#1e293b" />
                        <circle cx="120" cy="80" r="6" fill="#1e293b" />
                        <!-- Happy eyes overlay -->
                        <path class="aera-eye-happy hidden" d="M 72,80 Q 80,72 88,80" fill="none" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
                        <path class="aera-eye-happy hidden" d="M 112,80 Q 120,72 128,80" fill="none" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
                    </g>

                    <!-- Nose -->
                    <ellipse cx="100" cy="100" rx="8" ry="5" fill="#1e293b" />

                    <!-- Mouth -->
                    <g class="aera-mouth-group">
                        <path class="aera-mouth-neutral" d="M 90,112 Q 100,115 110,112" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round"/>
                        <path class="aera-mouth-happy hidden" d="M 85,110 Q 100,125 115,110" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round"/>
                        <path class="aera-tongue hidden" d="M 92,118 Q 100,135 108,118 Z" fill="#ef4444" />
                    </g>

                    <!-- Sweat Drop (Hazardous) -->
                    <path class="aera-sweat hidden" d="M 130,50 Q 135,60 130,70 Q 125,60 130,50" fill="#38bdf8" />
                </g>

                <!-- Sparkles (Good) -->
                <g class="aera-effects-sparkles hidden">
                    <use href="#sparkle" x="30" y="40" class="sparkle-anim" style="animation-delay: 0s" />
                    <use href="#sparkle" x="170" y="60" class="sparkle-anim" style="animation-delay: 0.3s" />
                    <use href="#sparkle" x="40" y="160" class="sparkle-anim" style="animation-delay: 0.6s" />
                </g>

                <!-- Smoke (Poor) -->
                <g class="aera-effects-smoke hidden">
                    <use href="#smoke" x="30" y="120" class="smoke-anim" style="animation-delay: 0s" />
                    <use href="#smoke" x="160" y="140" class="smoke-anim" style="animation-delay: 0.5s" />
                </g>

                <!-- Whimper Lines (Hazardous) -->
                <g class="aera-effects-whimper hidden" stroke="#94a3b8" stroke-width="4" stroke-linecap="round">
                    <path d="M 40,30 L 50,45" class="whimper-anim" />
                    <path d="M 160,30 L 150,45" class="whimper-anim" />
                </g>
            </svg>
        `;
    },

    update(status) {
        if (!this.container) return;
        
        // Remove old states
        this.container.className = '';
        this.container.classList.add(`state-${status.toLowerCase()}`);

        const svg = this.container.querySelector('.aera-svg');
        const setVisible = (selector, visible) => {
            const els = svg.querySelectorAll(selector);
            els.forEach(el => visible ? el.classList.remove('hidden') : el.classList.add('hidden'));
        };

        // Reset visibility
        setVisible('.aera-eyes circle', true);
        setVisible('.aera-eye-happy', false);
        setVisible('.aera-mouth-neutral', true);
        setVisible('.aera-mouth-happy', false);
        setVisible('.aera-tongue', false);
        setVisible('.aera-sweat', false);
        setVisible('.aera-effects-sparkles', false);
        setVisible('.aera-effects-smoke', false);
        setVisible('.aera-effects-whimper', false);

        switch (status) {
            case 'GOOD':
                this.statusText.textContent = "Happy and healthy!";
                this.statusText.style.color = "var(--accent-good)";
                setVisible('.aera-eyes circle', false);
                setVisible('.aera-eye-happy', true);
                setVisible('.aera-mouth-neutral', false);
                setVisible('.aera-mouth-happy', true);
                setVisible('.aera-effects-sparkles', true);
                break;
            case 'MODERATE':
                this.statusText.textContent = "Smells okay...";
                this.statusText.style.color = "var(--accent-warning)";
                // Uses defaults (neutral)
                break;
            case 'POOR':
                this.statusText.textContent = "*pant pant*";
                this.statusText.style.color = "var(--accent-poor)";
                setVisible('.aera-tongue', true);
                setVisible('.aera-effects-smoke', true);
                break;
            case 'HAZARDOUS':
                this.statusText.textContent = "*cough cough*";
                this.statusText.style.color = "#991b1b"; // darker red
                setVisible('.aera-sweat', true);
                setVisible('.aera-effects-whimper', true);
                break;
            default:
                this.statusText.textContent = "Zzz...";
                this.statusText.style.color = "var(--text-muted)";
                break;
        }
    }
};
