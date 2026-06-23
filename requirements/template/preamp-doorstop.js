(function () {
  var storageKey = "preampDoorstopSidebar";
  var body = document.body;
  var sidebar = document.getElementById("tocSidebar");
  var toggles = Array.prototype.slice.call(document.querySelectorAll("[data-toggle-sidebar]"));
  var metadataInputs = Array.prototype.slice.call(document.querySelectorAll(".metadata-field input"));
  var flatToc = document.querySelector("[data-toc-flat]");
  var collapseAll = document.querySelector("[data-collapse-all]");

  function setSidebarVisible(visible) {
    body.classList.toggle("sidebar-hidden", !visible);
    toggles.forEach(function (button) {
      button.setAttribute("aria-expanded", visible ? "true" : "false");
    });
    try {
      window.localStorage.setItem(storageKey, visible ? "visible" : "hidden");
    } catch (error) {
      return;
    }
  }

  if (sidebar && toggles.length) {
    var saved = null;
    try {
      saved = window.localStorage.getItem(storageKey);
    } catch (error) {
      saved = null;
    }

    if (saved === "hidden") {
      setSidebarVisible(false);
    }

    toggles.forEach(function (button) {
      button.addEventListener("click", function () {
        setSidebarVisible(body.classList.contains("sidebar-hidden"));
      });
    });
  }

  metadataInputs.forEach(function (input) {
    input.addEventListener("focus", function () {
      input.select();
    });
    input.addEventListener("click", function () {
      input.select();
    });
  });

  function cloneLink(link) {
    var cloned = link.cloneNode(true);
    cloned.removeAttribute("data-depth");
    cloned.classList.remove("toc-link");
    cloned.addEventListener("click", function (event) {
      event.stopPropagation();
    });
    return cloned;
  }

  function buildExpandableToc(container) {
    var sourceLinks = Array.prototype.slice.call(container.querySelectorAll("a[data-depth]"));
    if (!sourceLinks.length) {
      return;
    }

    var entries = sourceLinks.map(function (link) {
      return {
        depth: parseInt(link.getAttribute("data-depth"), 10) || 0,
        link: link
      };
    });

    var tree = document.createElement("div");
    var stack = [{ depth: -1, node: tree }];
    tree.className = "toc-tree";

    entries.forEach(function (entry, index) {
      var next = entries[index + 1];
      var hasChildren = next && next.depth > entry.depth;

      while (stack.length > 1 && stack[stack.length - 1].depth >= entry.depth) {
        stack.pop();
      }

      var parent = stack[stack.length - 1].node;

      if (hasChildren) {
        var details = document.createElement("details");
        var summary = document.createElement("summary");
        var children = document.createElement("div");

        details.className = "toc-node";
        details.open = entry.depth < 2;
        children.className = "toc-children";

        summary.appendChild(cloneLink(entry.link));
        details.appendChild(summary);
        details.appendChild(children);
        parent.appendChild(details);
        stack.push({ depth: entry.depth, node: children });
      } else {
        var leaf = cloneLink(entry.link);
        leaf.classList.add("toc-leaf");
        parent.appendChild(leaf);
      }
    });

    container.replaceChildren(tree);
  }

  function highlightCurrentSection() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".toc-tree a[href^='#']"));
    var headings = links
      .map(function (link) {
        var id = decodeURIComponent(link.getAttribute("href").slice(1));
        return document.getElementById(id);
      })
      .filter(Boolean);

    if (!headings.length || !("IntersectionObserver" in window)) {
      return;
    }

    var visible = {};
    var observer = new IntersectionObserver(
      function (entries) {
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
          link.classList.toggle("is-active", link.getAttribute("href") === "#" + activeId);
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0, 0.1, 0.25, 0.5, 1] }
    );

    headings.forEach(function (heading) {
      observer.observe(heading);
    });
  }

  if (flatToc) {
    buildExpandableToc(flatToc);
    highlightCurrentSection();
  }

  if (collapseAll) {
    collapseAll.addEventListener("click", function () {
      var details = Array.prototype.slice.call(document.querySelectorAll(".toc-tree details"));
      var shouldOpen = collapseAll.getAttribute("data-state") === "collapsed";

      details.forEach(function (node) {
        node.open = shouldOpen;
      });

      collapseAll.setAttribute("data-state", shouldOpen ? "expanded" : "collapsed");
      collapseAll.textContent = shouldOpen ? "Collapse all" : "Expand all";
    });
  }
})();
