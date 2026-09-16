(() => {
    'use strict';

    const stages = [
        { word: 'build', description: 'Beautiful interfaces. Robust engineering. Apps people love to use.' },
        { word: 'launch', description: 'From the finishing touches to your first day on the App Store.' },
        { word: 'scale', description: 'Better performance. Thoughtful iteration. Room for what’s next.' },
        { word: 'run', description: 'Reliable infrastructure, ongoing care, and a partner for the long run.' },
    ];
    const windowElement = document.querySelector('.word-window');
    const buttons = [...document.querySelectorAll('.service')];
    const description = document.querySelector('.service-description');
    const control = document.querySelector('.motion-control');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let index = 0;
    let paused = false;
    let timer;
    let activeAnimations = [];

    document.querySelector('#year').textContent = new Date().getFullYear();

    function clearAnimations() {
        activeAnimations.forEach(animation => animation.cancel());
        activeAnimations = [];
        windowElement.querySelectorAll('.word:not(.current)').forEach(word => word.remove());
    }

    function showStage(nextIndex, animate = true) {
        clearAnimations();
        index = nextIndex;
        const outgoing = windowElement.querySelector('.current');
        const incoming = document.createElement('span');
        incoming.className = 'word current';
        incoming.textContent = stages[index].word;
        outgoing.classList.remove('current');
        windowElement.append(incoming);

        if (animate && !reducedMotion.matches && typeof incoming.animate === 'function') {
            // Both faces share one rotation and timeline, like opposite sides of a wheel.
            const options = { duration: 1050, easing: 'cubic-bezier(.65, 0, .35, 1)', fill: 'both' };
            const exit = outgoing.animate([
                { transform: 'rotateX(0deg)' },
                { transform: 'rotateX(180deg)' },
            ], options);
            const enter = incoming.animate([
                { transform: 'rotateX(-180deg)' },
                { transform: 'rotateX(0deg)' },
            ], options);
            exit.startTime = enter.startTime = document.timeline.currentTime;
            activeAnimations = [exit, enter];
            exit.finished.then(() => outgoing.remove()).catch(() => {});
        } else {
            outgoing.remove();
        }

        buttons.forEach((button, buttonIndex) => {
            button.classList.toggle('active', buttonIndex === index);
            button.setAttribute('aria-pressed', String(buttonIndex === index));
        });
        description.textContent = stages[index].description;
    }

    function schedule() {
        window.clearTimeout(timer);
        if (paused || reducedMotion.matches || document.hidden) return;
        timer = window.setTimeout(() => {
            showStage((index + 1) % stages.length);
            schedule();
        }, 3800);
    }

    function updateControl() {
        control.hidden = reducedMotion.matches;
        control.textContent = paused ? 'Play animation' : 'Pause animation';
        control.setAttribute('aria-label', paused ? 'Play word animation' : 'Pause word animation');
        control.setAttribute('aria-pressed', String(paused));
    }

    control.addEventListener('click', () => {
        paused = !paused;
        if (paused) clearAnimations();
        updateControl();
        schedule();
    });

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            paused = true;
            showStage(Number(button.dataset.index));
            updateControl();
            schedule();
        });
    });
    reducedMotion.addEventListener('change', () => {
        clearAnimations();
        updateControl();
        schedule();
    });
    document.addEventListener('visibilitychange', schedule);
    updateControl();
    schedule();
})();
