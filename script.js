document.addEventListener('DOMContentLoaded', () => {
    // --- SÉLECTEURS D'ÉLÉMENTS ---
    const factionScreen = document.querySelector('#faction-screen');
    const choicesContainer = factionScreen.querySelector('.choices');
    const doors = factionScreen.querySelectorAll('.choice-door');
    const headerText = factionScreen.querySelector('.header-text');

    // --- LOGIQUE DE L'ÉCRAN DE FACTION ---
    doors.forEach(door => {
        // Gère le survol pour l'effet visuel
        door.addEventListener('mouseenter', () => {
            if (choicesContainer.classList.contains('selection-made')) return;
            factionScreen.classList.add(`${door.id}-active`);
        });

        // Annule l'effet de survol
        door.addEventListener('mouseleave', () => {
            if (choicesContainer.classList.contains('selection-made')) return;
            factionScreen.classList.remove(`${door.id}-active`);
        });

        // Gère le clic pour la sélection et la redirection
        door.addEventListener('click', () => {
            if (choicesContainer.classList.contains('selection-made')) return;

            // Bloque les interactions multiples
            choicesContainer.classList.add('selection-made');

            const selectedDoor = door;
            const otherDoor = [...doors].find(d => d !== selectedDoor);
            
            // Récupère la faction choisie à partir de l'attribut data-faction
            const selectedFaction = selectedDoor.dataset.faction;

            // Démarre les animations de sortie
            factionScreen.className = 'screen'; // Réinitialise les classes pour ne garder que la bonne
            factionScreen.classList.add(`${selectedDoor.id}-active`);
            headerText.classList.add('dissolving-out');
            otherDoor.classList.add('dissolving-out');
            selectedDoor.classList.add('is-centering');

            // Petite pause pour la confirmation sonore et visuelle
            setTimeout(() => {
                selectedDoor.classList.add('is-confirming');
            }, 800);

            // *** MODIFICATION PRINCIPALE ***
            // Après l'animation, redirige vers halving0.html avec la faction en paramètre d'URL
            setTimeout(() => {
                window.location.href = `halving0.html?faction=${selectedFaction}`;
            }, 2000); // Délai pour laisser l'animation se terminer
        });
    });
});
