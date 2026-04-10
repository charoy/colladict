(function () {
  function slugify(value) {
    return value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/-{2,}/g, "-");
  }

  function splitLines(value) {
    return value
      .split(/\r?\n/)
      .map(function (item) {
        return item.trim();
      })
      .filter(Boolean);
  }

  function yamlQuote(value) {
    return '"' + String(value || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
  }

  function pushList(lines, key, items, indent) {
    var prefix = " ".repeat(indent);
    if (!items.length) {
      lines.push(prefix + key + ": []");
      return;
    }

    lines.push(prefix + key + ":");
    items.forEach(function (item) {
      lines.push(prefix + "  - " + yamlQuote(item));
    });
  }

  function pushReferences(lines, refs, indent) {
    var prefix = " ".repeat(indent);
    if (!refs.length) {
      lines.push(prefix + "references: []");
      return;
    }

    lines.push(prefix + "references:");
    refs.forEach(function (ref) {
      lines.push(prefix + "  - title: " + yamlQuote(ref.title));
      lines.push(prefix + "    url: " + yamlQuote(ref.url));
    });
  }

  function formatDate() {
    var date = new Date();
    var pad = function (value) {
      return String(value).padStart(2, "0");
    };
    var offsetMinutes = -date.getTimezoneOffset();
    var sign = offsetMinutes >= 0 ? "+" : "-";
    var absoluteOffset = Math.abs(offsetMinutes);

    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      "T" +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes()) +
      ":" +
      pad(date.getSeconds()) +
      sign +
      pad(Math.floor(absoluteOffset / 60)) +
      ":" +
      pad(absoluteOffset % 60)
    );
  }

  document.querySelectorAll("[data-entry-draft-form]").forEach(function (root) {
    var fields = {
      title: root.querySelector('[data-field="title"]'),
      slug: root.querySelector('[data-field="slug"]'),
      english: root.querySelector('[data-field="english"]'),
      status: root.querySelector('[data-field="status"]'),
      summary: root.querySelector('[data-field="summary"]'),
      shortDefinition: root.querySelector('[data-field="short_definition"]'),
      themes: root.querySelector('[data-field="themes"]'),
      authors: root.querySelector('[data-field="authors"]'),
      contributors: root.querySelector('[data-field="contributors"]'),
      variants: root.querySelector('[data-field="variants"]'),
      tensions: root.querySelector('[data-field="key_tensions"]'),
      related: root.querySelector('[data-field="related"]'),
      references: root.querySelector('[data-field="references"]'),
      introduction: root.querySelector('[data-field="introduction"]'),
      why: root.querySelector('[data-field="why"]'),
      output: root.querySelector("[data-output]"),
      copy: root.querySelector("[data-copy]"),
      openIssue: root.querySelector("[data-open-issue]")
    };

    var slugTouched = false;
    var issueUrl = root.getAttribute("data-issue-url");
    var issuePrefix = root.getAttribute("data-issue-prefix") || "[Entry] ";
    var copyLabel = root.getAttribute("data-copy-label") || "Copy draft";
    var copiedLabel = root.getAttribute("data-copied-label") || "Copied";

    function buildDraft() {
      var title = fields.title.value.trim();
      var slug = fields.slug.value.trim() || slugify(title);
      var english = fields.english.value.trim();
      var summary = fields.summary.value.trim();
      var shortDefinition = fields.shortDefinition.value.trim();
      var status = fields.status.value.trim() || "draft";
      var themes = splitLines(fields.themes.value);
      var authors = splitLines(fields.authors.value);
      var contributors = splitLines(fields.contributors.value);
      var variants = splitLines(fields.variants.value);
      var tensions = splitLines(fields.tensions.value);
      var related = splitLines(fields.related.value);
      var introduction = fields.introduction.value.trim();
      var why = fields.why.value.trim();
      var references = splitLines(fields.references.value)
        .map(function (line) {
          var parts = line.split("|");
          return {
            title: (parts[0] || "").trim(),
            url: (parts.slice(1).join("|") || "").trim()
          };
        })
        .filter(function (ref) {
          return ref.title || ref.url;
        });

      var lines = [
        "---",
        "title: " + yamlQuote(title || "Untitled entry"),
        "slug: " + yamlQuote(slug || "untitled-entry"),
        "date: " + yamlQuote(formatDate()),
        "draft: true",
        "summary: " + yamlQuote(summary)
      ];

      pushList(lines, "themes", themes, 0);
      pushList(lines, "authors", authors, 0);
      pushList(lines, "contributors", contributors, 0);
      lines.push("params:");
      lines.push("  english: " + yamlQuote(english));
      pushList(lines, "variants", variants, 2);
      lines.push("  status: " + yamlQuote(status));
      lines.push("  short_definition: " + yamlQuote(shortDefinition));
      pushList(lines, "key_tensions", tensions, 2);
      pushReferences(lines, references, 2);
      pushList(lines, "related", related, 2);
      lines.push("---");
      lines.push("");
      lines.push("## Introduction");
      lines.push("");
      lines.push(introduction || "Write a short introductory text that explains the concept, where it comes from and why it matters in CSCW.");
      lines.push("");
      lines.push("## Why it matters");
      lines.push("");
      lines.push(why || "Expand on debates, tensions, uses and contested interpretations.");

      fields.output.value = lines.join("\n");
      fields.openIssue.href = issueUrl + "&title=" + encodeURIComponent(issuePrefix + (title || ""));
    }

    fields.title.addEventListener("input", function () {
      if (!slugTouched) {
        fields.slug.value = slugify(fields.title.value);
      }
    });

    fields.slug.addEventListener("input", function () {
      slugTouched = fields.slug.value.trim() !== "";
    });

    root.querySelector("[data-generate]").addEventListener("click", buildDraft);

    fields.copy.addEventListener("click", function () {
      buildDraft();
      navigator.clipboard.writeText(fields.output.value).then(function () {
        fields.copy.textContent = copiedLabel;
        window.setTimeout(function () {
          fields.copy.textContent = copyLabel;
        }, 1600);
      });
    });

    buildDraft();
  });
})();
