(function () {
    var activeClass = 'active';
    var links = Array.prototype.slice.call(document.querySelectorAll('.bs-sidebar a.nav-link[href^="#"]'));
    var headings = links
        .map(function (link) {
            var id = decodeURIComponent(link.getAttribute('href').slice(1));
            return document.getElementById(id);
        })
        .filter(Boolean);

    if (!headings.length || !('IntersectionObserver' in window)) {
        return;
    }

    var visible = {};
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                visible[entry.target.id] = entry.intersectionRatio;
            } else {
                delete visible[entry.target.id];
            }
        });

        var activeId = Object.keys(visible).sort(function (a, b) {
            return visible[b] - visible[a];
        })[0];

        links.forEach(function (link) {
            var target = link.getAttribute('href').slice(1);
            if (target === activeId) {
                link.classList.add(activeClass);
            } else {
                link.classList.remove(activeClass);
            }
        });
    }, { rootMargin: '-20% 0px -70% 0px', threshold: [0, 0.1, 0.25, 0.5, 1] });

    headings.forEach(function (heading) {
        observer.observe(heading);
    });
})();